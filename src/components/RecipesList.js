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
                var recipeObject = { stockName: recipeLocalLine.stockName, quantity: recipeLocalLine.quantity, localKey: recipeLocalLine.localKey };
                if (nameDirectory[recipeLocalLine.recipeName] === undefined) { // new recipe read in
                    nameDirectory[recipeLocalLine.recipeName] = readLocalRecipes.length;
                    readLocalRecipes.push([recipeLocalLine.recipeName, recipeLocalLine.showIngredients, [recipeObject]]);
                } else {
                    readLocalRecipes[nameDirectory[recipeLocalLine.recipeName]][2].push(recipeObject);
                }
            }
        }

        if (readLocalRecipes.length === 0) readLocalRecipes.push(['', false, [{ stockName: '', quantity: '', localKey: '' }]]);
        this.state = {
            recipesStorage: readLocalRecipes,
            editing: Array(readLocalRecipes.length).fill(false),
            editText:Array(readLocalRecipes.length).fill('Edit')
        }
        this.changeRecipe = this.changeRecipe.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }
    rowsOfRecipes() {
        var rows = [];
        for (var ii = 0; ii < this.state.recipesStorage.length; ii++) {
            rows.push(
                <div key={'recipe' + ii}>
                    <RecipeRow
                        ii={ii}
                        key={ii}
                        recipesStorage={this.state.recipesStorage}
                        inventoryStorage={this.props.inventoryStorage}
                        changeRecipe={this.changeRecipe}
                        clickedRecipe={this.clickedRecipe.bind(this, ii)}
                        clickedEdit={this.clickedEdit.bind(this, ii)}
                        clickedAddIngred={this.clickedAddIngred.bind(this, ii)}
                        editing={this.state.editing}
                        editText = {this.state.editText}
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

    clickedEdit(ii) {
        var toggleEditing = JSON.parse(JSON.stringify(this.state.editing));
        var toggleText = JSON.parse(JSON.stringify(this.state.editText));
        console.log(this.state.editText);
        console.log(toggleText);
        toggleEditing[ii] = toggleEditing[ii] ? false : true;
        toggleText[ii] = toggleEditing[ii]?'Close':'Edit';
        this.setState({
            editing: toggleEditing,
            editText:toggleText,
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
                // build localStorageRowObject
                var localStorageObject = { recipeName: contentObject[row][0], showIngredients: contentObject[row][1] };
                Object.assign(localStorageObject, contentObject[row][2][ingredient]);
                // Code for localStorage/sessionStorage.
                localStorage.setItem("recipeStorage" + localKey, JSON.stringify(localStorageObject));
            } else {
                // Sorry! No Web Storage support..
                alert("Please use a modern major browser");
            }
        }
    }

    clickedAddIngred(ii) {
        var contentObject = JSON.parse(JSON.stringify(this.state.recipesStorage));
        var quantity = contentObject[ii][2][contentObject[ii][2].length - 1].quantity;
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
            contentObject[ii][2].push({ stockName: '', quantity: '', localKey: '' });
            this.setState({
                recipesStorage: contentObject
            })
        }
    }

    clickedAddRecipe() {
        var contentObject = JSON.parse(JSON.stringify(this.state.recipesStorage));
        var pushNewEditing = JSON.parse(JSON.stringify(this.state.editing));
        pushNewEditing.push(true);
        // check that there is a name for prev recipe
        if (contentObject.length !== 0) {
            if (contentObject[contentObject.length - 1][0].length === 0) {
                alert("Your recipe is not named!");
                return;
            }
        }
        contentObject.push(['', true, [{ stockName: '', quantity: '', localKey: '' }]]);
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
    for (var ii =0; ii < props.editing.length; ii++) {
        if (props.editing[ii] === true) return null;
    }
    return (
        <div>
            <button onClick={() => props.clickedAddRecipe()}>Add Recipe</button>
        </div>
    )
}

export default RecipesList;