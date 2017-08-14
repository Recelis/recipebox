import React, { Component } from 'react'

class RecipeRow extends Component {
    render() {
        return (
            <div>
                <RecipeTitle
                    editing={this.props.editing}
                    ii={this.props.ii}
                    clickedRecipe={() => this.props.clickedRecipe()}
                    recipesStorage={this.props.recipesStorage}
                    changeRecipe={this.props.changeRecipe}
                />
                <Description
                    key={'RecipeDescription' + this.props.ii}
                    showIngredients={this.props.recipesStorage[this.props.ii][1]}
                />
                <RecipesContent
                    key={this.props.ii} // change 
                    recipesStorage={this.props.recipesStorage}
                    inventoryStorage={this.props.inventoryStorage}
                    changeRecipe={this.props.changeRecipe}
                    ii={this.props.ii}
                    showIngredients={this.props.recipesStorage[this.props.ii][1]}
                    editing={this.props.editing}
                    deleteRow={this.props.deleteRow}
                />
                <div classsName="rows">
                    <div className="col-xs-6">
                        <Edit
                            showIngredients={this.props.recipesStorage[this.props.ii][1]}
                            clickedEdit={() => this.props.clickedEdit()}
                            ii={this.props.ii}
                        />
                    </div>
                    <div classsName="col-xs-6">
                        <Add
                            editing={this.props.editing}
                            clickedAddIngred={() => this.props.clickedAddIngred()}
                            recipesStorage={this.props.recipesStorage}
                            ii={this.props.ii}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

function RecipeTitle(props) {
    if (props.editing[props.ii] && props.recipesStorage[props.ii][1] === true) {
        return (
            <form onSubmit={handleEditSubmit}>
                <input type="text" value={props.recipesStorage[props.ii][0]} onChange={props.changeRecipe.bind(this, props.ii, 0, "recipeName")} />
            </form>
        )
    }
    else return (
        <button onClick={() => props.clickedRecipe(props.ii)}>
            {props.recipesStorage[props.ii][0]}
        </button>
    )
}

function handleEditSubmit(event) {
    event.preventDefault();
    return;
}

function Description(props) {
    if (props.showIngredients === false) return null;
    return (
        <div className="row">
            <div className="col-xs-3"></div>
            <div className="col-xs-3"><h2>Ingredient</h2></div>
            <div className="col-xs-3"><h2>Quantity (g)</h2></div>
            <div className="col-xs-3"><h2>Availability</h2></div>
        </div>
    )
}

function RecipesContent(props) {
    if (props.showIngredients === false) return null;
    var rows = [];
    for (var jj = 0; jj < props.recipesStorage[props.ii][2].length; jj++) {
        // calculate inStock
        var inStock = calculateInStock(props.recipesStorage[props.ii][2][jj], props.inventoryStorage);
        rows.push(
            <div className="row" key={("ingredients" + jj).toString()}>
                <div className="col-xs-3">
                    <Delete
                        editing={props.editing}
                        jj={jj}
                        row={props.ii}
                        deleteRow={props.deleteRow}
                    />
                </div>
                <div className="col-xs-3">
                    <form onSubmit={handleEditSubmit}>
                        <input type="text" value={props.recipesStorage[props.ii][2][jj].stockName} onChange={props.changeRecipe.bind(this, props.ii, jj, "stockName")} />
                    </form>
                </div>
                <div className="col-xs-3">
                    <form onSubmit={handleEditSubmit}>
                        <input type="text" value={props.recipesStorage[props.ii][2][jj].quantity} onChange={props.changeRecipe.bind(this, props.ii, jj, "quantity")} />
                    </form>
                </div>
                <div className="col-xs-3"><p className={inStock}></p></div>
            </div>
        );
    }
    return (
        <div>{rows}</div>
    )
}

function Delete(props) {
    if (props.editing[props.row] === false) return null;
    return (
        <button onClick={props.deleteRow.bind(this, props.row, props.jj)}>Delete</button>
    )
}

function Edit(props) {
    if (props.showIngredients === false) return null;
    return (
        <div>
            <button onClick={() => props.clickedEdit(props.ii)}>Edit</button>
        </div>
    )
}

function Add(props) {
    if (!props.editing || props.recipesStorage[props.ii][1] === false) return null;
    return (
        <button onClick={() => props.clickedAddIngred(props.ii)}>Add Ingredient</button>
    )
}

function calculateInStock(recipesLine, inventoryStorage) {
    for (var ii = 0; ii < inventoryStorage.length; ii++) {
        if (recipesLine.stockName === inventoryStorage[ii].stockName) {
            if (inventoryStorage[ii].quantity === '0' || inventoryStorage[ii].quantity.length === 0) return "none";
            else if (recipesLine.quantity > inventoryStorage[ii].quantity) return "notEnough";
            else if (recipesLine.quantity === inventoryStorage[ii].quantity) return "enough";
            else return "moreThanEnough";
        }
    }
    return "none";
}
export default RecipeRow;