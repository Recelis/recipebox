import React, { Component } from 'react'
import RecipeRow from './RecipeRow'

class RecipesList extends Component {
    constructor() {
        super();
        var readLocalRecipes = [];
        var nameDirectory = {};
        var recipeLocalLine = [];
        for (var ii = 0; ii < localStorage.length; ii++) {
            if (localStorage['recipeStorage' + ii] === undefined) localStorage.removeItem('recipeStorage' + ii);
            else {
                recipeLocalLine = JSON.parse(localStorage['recipeStorage' + ii]);
                var recipeObject = { stockName: recipeLocalLine.stockName, quantity: recipeLocalLine.quantity, inStock: recipeLocalLine.inStock, localKey: recipeLocalLine.localKey };
                if (nameDirectory[recipeLocalLine.recipeName] === undefined) { // new recipe read in
                    nameDirectory[recipeLocalLine.recipeName] = readLocalRecipes.length;
                    readLocalRecipes.push([recipeLocalLine.recipeName, recipeLocalLine.showIngredients, [recipeObject]]);
                } else {
                    readLocalRecipes[nameDirectory[recipeLocalLine.recipeName]][2].push(recipeObject);
                }
            }
        }

        if (readLocalRecipes.length === 0) readLocalRecipes.push(['', false, [{ stockName: '', quantity: '', inStock: 'none', localKey: '' }]]);
        this.state = {
            recipesStorage: readLocalRecipes,
            editing: Array(readLocalRecipes.length).fill(false)
        }
        this.changeRecipe = this.changeRecipe.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
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
                        clickedEdit={this.clickedEdit.bind(this, ii)}
                        clickedAddIngred={this.clickedAddIngred.bind(this, ii)}
                        makingToday={() => this.makingToday()}
                        editing={this.state.editing}
                        deleteRow={this.deleteRow}
                    />
                </div>
            );
        }
        return rows;
    }

    deleteRow(ii, jj) { // done badly
        var contentObject = JSON.parse(JSON.stringify(this.state.recipesStorage));
        var localKey = contentObject[ii][2][jj].localKey;
        contentObject[ii][2].splice(jj, 1);
        localStorage.removeItem("recipeStorage" + localKey);
        this.setState({
            recipesStorage: contentObject
        })
    }
    makingToday() {
        console.log("please fill this in!");
    }

    clickedEdit(ii) {
        var toggleEditing = JSON.parse(JSON.stringify(this.state.editing));
        console.log(ii);
        toggleEditing[ii] = toggleEditing[ii] ? false : true;
        console.log(toggleEditing);
        this.setState({
            editing: toggleEditing
        })
    }

    clickedRecipe(ii) {
        var contentObject = JSON.parse(JSON.stringify(this.state.recipesStorage));
        contentObject[ii][1] = (contentObject[ii][1]) ? false : true; // show ingredients
        // check that last ingredient had a title otherwise remove
        if (contentObject[ii][1] === false) {
            for (var jj = 0; jj < contentObject[ii][2].length; jj++) {
                if (contentObject[ii][2][jj]['stockName'].length === 0) contentObject[ii][2].splice(jj, 1);
            }
            if (contentObject[ii][0].length === 0) contentObject.splice(ii, 1);
        }
        this.setState({
            recipesStorage: contentObject
        })
    }

    changeRecipe(row, ingredient, location, event) {
        console.log(this.state.editing[row]);
        if (this.state.editing[row]) {
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
                        if (localStorage['recipeStorage' + ii] === undefined) {
                            contentObject[row][2][ingredient]['localKey'] = ii;
                            break;
                        }
                    }
                } else {
                    localStorage.removeItem("recipeStorage" + contentObject[row][2][ingredient]['localKey']);
                }
                var localKey = contentObject[row][2][ingredient]['localKey'];
                console.log("localKey" + localKey);
                // build localStorageRowObject
                var localStorageObject = { recipeName: contentObject[row][0], showIngredients: contentObject[row][1] };
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
        var pushNewEditing = JSON.parse(JSON.stringify(this.state.editing));
        pushNewEditing.push(false);
        // check that there is a name for prev recipe
        if (contentObject[contentObject.length - 1][0].length === 0) {
            alert("Your recipe is not named!");
            return;
        }
        contentObject.push(['', false, [{ stockName: '', quantity: '', inStock: 'none', localKey: '' }]]);
        console.log(contentObject);

        this.setState({
            recipesStorage: contentObject,
            editing: pushNewEditing
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
    // if (props.editing) return null;
    return (
        <div>
            <button onClick={() => props.clickedAddRecipe()}>Add Recipe</button>
        </div>
    )
}

export default RecipesList;