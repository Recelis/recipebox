import React, { Component } from 'react'
import RecipeRow from './RecipeRow'

class RecipesList extends Component {
    constructor() {
        super();
        var readLocalRecipes = [];
        var currentRecipe = '';
        var recipeNum = 0;
        var recipeLocalLine = [];
        console.log(localStorage.length);
        for (var ii = 0; ii < localStorage.length; ii++) {
            console.log("ii" + ii);
            console.log("localRecipe"+localStorage['recipeStorage' + ii]);
            if (localStorage['recipeStorage' + ii] === null) break;
            else if (localStorage['recipeStorage' + ii] === undefined) localStorage.removeItem('recipeStorage' + ii);
            else {
                recipeLocalLine = JSON.parse(localStorage['recipeStorage' + ii]);
                if (currentRecipe.length === 0 || currentRecipe !== recipeLocalLine.recipeName) { // new recipe read in
                    readLocalRecipes.push([recipeLocalLine.recipeName, recipeLocalLine.showIngredients, []]);
                    currentRecipe = recipeLocalLine.recipeName;
                    recipeNum++;
                }

                // algorithm for passing localKeys
                var recipeObject = { stockName: recipeLocalLine.stockName, quantity: recipeLocalLine.quantity, inStock: recipeLocalLine.inStock, localKey: recipeLocalLine.localKey};
                var pushed = false;
                for (var jj=0; jj < recipeNum-1; jj++){
                    if (recipeLocalLine.recipeName === readLocalRecipes[jj].recipeName){
                        readLocalRecipes[jj][2].push(recipeObject);
                        pushed = true;
                        break;
                    }
                }
                // skip if already pushed
                if (!pushed){
                    readLocalRecipes[recipeNum-1][2].push(recipeObject);
                }
                
                console.log(recipeLocalLine); 
            }
        }
        if (readLocalRecipes.length === 0) readLocalRecipes.push(['', false, [{ stockName: '', quantity: '', inStock: 'none', localKey:''}]]);
        this.state = {
            recipesStorage: readLocalRecipes,
            editing: false
        }
        this.changeRecipe = this.changeRecipe.bind(this);
    }
    rowsOfRecipes() {
        var rows = [];
        // console.log(this.state.recipesStorage);
        for (var ii = 0; ii < this.state.recipesStorage.length; ii++) {
            rows.push(
                <div key={'recipe' + ii}>
                    <RecipeRow
                        ii={ii}
                        key={ii}
                        recipesStorage={this.state.recipesStorage}
                        changeRecipe={this.changeRecipe}
                        clickedRecipe={this.clickedRecipe.bind(this, ii)}
                        clickedEdit={() => this.clickedEdit()}
                        clickedAddIngred={this.clickedAddIngred.bind(this, ii)}
                        makeTonight={() => this.makeTonight}
                        editing={this.state.editing}
                    />
                </div>
            );
        }
        return rows;
    }
    makeTonight() {
        console.log("please fill this in!");
    }

    clickedEdit() {
        this.setState({
            editing: (this.state.editing) ? false : true
        })
    }

    clickedRecipe(ii) {
        var contentObject = JSON.parse(JSON.stringify(this.state.recipesStorage));
        contentObject[ii][1] = (contentObject[ii][1]) ? false : true; // show ingredients
        this.setState({
            recipesStorage: contentObject
        })
    }

    changeRecipe(row, ingredient, location, event) {
        if (this.state.editing) {
            var contentObject = JSON.parse(JSON.stringify(this.state.recipesStorage));
            if (location === 'recipeName') contentObject[row][0] = event.target.value;
            else contentObject[row][2][ingredient][location] = event.target.value;
            this.setState({
                recipesStorage: contentObject
            })
            if (typeof (Storage) !== "undefined") {
                //get existing localKey or create localKey
                if (contentObject[row][2][ingredient]['localKey'] === '') {
                    for (var ii = 0; ii < localStorage.length; ii++) {
                        if (localStorage['recipeStorage' + ii] === null) {
                            contentObject[row][2][ingredient]['localKey'] = ii;
                            break;
                        }
                    }
                } else{
                    localStorage.removeItem("recipeStorage" + contentObject[row][2][ingredient]['localKey']);
                }
                var localKey = contentObject[row][2][ingredient]['localKey'];
                console.log("localKey" + localKey);
                // build localStorageRowObject
                var localStorageObject = { recipeName: contentObject[row][0], showIngredients: contentObject[row][1]};
                Object.assign(localStorageObject, contentObject[row][2][ingredient]);
                // console.log(localStorageObject);
                // Code for localStorage/sessionStorage.
                
                localStorage.setItem("recipeStorage" + localKey, JSON.stringify(localStorageObject));
                console.log(localStorage["recipeStorage" + localKey]);
            } else {
                // Sorry! No Web Storage support..
                alert("Please use a modern major browser");
            }
        }
    }

    clickedAddIngred(ii) {
        var contentObject = JSON.parse(JSON.stringify(this.state.recipesStorage));
        var quantity = contentObject[ii][2][contentObject[ii][2].length - 1].quantity;
        console.log(quantity.match(/\d+/g));
        if (contentObject[ii][2][contentObject[ii][2].length - 1].stockName === "") {
            alert("please type an ingredient in!");
            return;
        } else if (contentObject[ii][2][contentObject[ii][2].length - 1].quantity === "") {
            alert("You need to enter a quantity for your item!");
            return;
        } else if (!quantity.match(/\d+/g)) {
            alert("please enter a value that contains only numbers.");
            return;
        } else if (quantity.match(/\d+/g)[0] !== quantity) {
            alert("You may have accidentally typed an incorrect value in.");
            return;
        } else {
            contentObject[ii][2].push({ stockName: '', quantity: '', inStock: 'none', localKey: '' });
            console.log(contentObject);
            this.setState({
                recipesStorage: contentObject
            })
        }
    }

    clickedAddRecipe() {
        var contentObject = JSON.parse(JSON.stringify(this.state.recipesStorage));
        // check that there is a name for prev recipe
        if (contentObject[contentObject.length - 1][0].length === 0) {
            alert("Your recipe is not named!");
            return;
        }
        contentObject.push(['', false, [{ stockName: '', quantity: '', inStock: 'none', localKey: ''}]]);
        console.log(contentObject);
        this.setState({
            recipesStorage: contentObject
        })
    }

    render() {
        if (this.props.opened === false) return null;
        return (
            <div>
                {this.rowsOfRecipes()}
                <AddRecipe
                    editing={this.state.editing}
                    clickedAddRecipe={() => this.clickedAddRecipe()}
                />
            </div>
        )
    }
}

function AddRecipe(props) {
    if (props.editing) return null;
    return (
        <div>
            <button onClick={() => props.clickedAddRecipe()}>Add Recipe</button>
        </div>
    )
}

export default RecipesList;