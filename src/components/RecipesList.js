import React, { Component } from 'react'
import RecipeRow from './RecipeRow'

class RecipesList extends Component {
    constructor() {
        super();
        var readLocalRecipes = [];
        var currentRecipe = '';
        var recipeNum = 0;
        var recipeLocalLine = [];
        console.log("test");
        for (var ii = 0; ii < localStorage.length; ii++) {
            console.log(ii);
            if (localStorage['recipeStorage' + ii] === null) break;
            else if (localStorage['recipeStorage'+ii] === undefined) localStorage.removeItem('recipeStorage'+ii);
            else {
                recipeLocalLine = JSON.parse(localStorage['recipeStorage'+ii]);
                if (currentRecipe.length === 0 || currentRecipe !== recipeLocalLine.recipeName) {
                    readLocalRecipes.push([]);
                    currentRecipe = recipeLocalLine.recipeName;
                    recipeNum++;
                }
                readLocalRecipes[recipeNum-1].push(recipeLocalLine[0])
                console.log(recipeLocalLine); 
            }
        }
        if (readLocalRecipes.length === 0) readLocalRecipes.push([{recipeName: '', showIngredients: false, stockName: '', quantity: '', inStock: 'none' }]);
        this.state = {
            recipesStorage: readLocalRecipes,
            editing: false
        }
        this.changeRecipe = this.changeRecipe.bind(this);
    }
    rowsOfRecipes() {
        var rows = [];
        console.log(this.state.recipesStorage);
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
                        makeTonight={() => this.makeTonight}
                        editing = {this.state.editing}
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
        contentObject[ii].showIngredients = (contentObject[ii].showIngredients) ? false : true;
        this.setState({
            recipesStorage: contentObject
        })
    }

    changeRecipe(row, ingredient, location, event) {
        if (this.state.editing) {
            var contentObject = JSON.parse(JSON.stringify(this.state.recipesStorage));
            contentObject[row][ingredient][location] = event.target.value;
            this.setState({
                recipesStorage: contentObject
            })
            if (typeof (Storage) !== "undefined") {
                // Code for localStorage/sessionStorage.
                localStorage.removeItem("recipeStorage" + row);
                localStorage.setItem("recipeStorage" + row, JSON.stringify(contentObject[row]));
                console.log(localStorage["recipeStorage" + row]);
                console.log(row);
            } else {
                // Sorry! No Web Storage support..
                alert("Please use a modern major browser");
            }
        }
    }

    clickedAddRecipe(props) {
        var contentObject = JSON.parse(JSON.stringify(this.state.recipesStorage)); // error here!
        contentObject.push({ recipeName: '', showIngredients: false, stockName: '', quantity: '', inStock: 'none' });
        // console.log(contentObject);
        // check that there is a name for prev recipe
        // check that there are ingredients in prev recipe
        // check that quantities are numerical
        
        // } else if (contentObject[contentObject.length - 1].quantity === '') {
        //     alert("You need to enter a quantity for your item!");
        //     return;
        // } else if (!contentObject[contentObject.length - 1].quantity.match(/\d+/g)) {
        //     alert("please enter a value that contains only numbers.");
        //     return;
        // } else if (contentObject[contentObject.length - 1].quantity.match(/\d+/g)[0] !== contentObject[contentObject.length - 1].quantity) {
        //     alert("You may have accidentally typed an incorrect value in.");
        //     return;
        // } else {
        //     contentObject.push({ stockName: '', quantity: '' });
            this.setState({
                inventoryStorage: contentObject
            })
        // }
    }

    render() {
        if (this.props.opened === false) return null;
        return (
            <div>
                {this.rowsOfRecipes()}
                <AddRecipe
                    editing = {this.state.editing}
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