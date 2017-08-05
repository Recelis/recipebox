import React, { Component } from 'react'

class RecipeRow extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

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
                <button onClick={() => this.props.makeTonight()}>Make Tonight</button>
                <Description
                    key={'RecipeDescription' + this.props.ii}
                    showIngredients={this.props.recipesStorage[this.props.ii][1]}
                />
                <RecipesContent
                    key={this.props.ii} // change 
                    recipesStorage={this.props.recipesStorage}
                    changeRecipe={this.props.changeRecipe}
                    ii={this.props.ii}
                    showIngredients={this.props.recipesStorage[this.props.ii][1]}
                />
                <Edit
                    showIngredients={this.props.recipesStorage[this.props.ii][1]}
                    clickedEdit={() => this.props.clickedEdit()}
                />
                <Add
                    editing = {this.props.editing}
                    clickedAddIngred = {()=>this.props.clickedAddIngred()}
                />
            </div>
        )
    }
}

function RecipeTitle(props) {
    if (props.editing) {
        return (
            <form onSubmit={handleEditSubmit}>
                <input type="text" value={props.recipesStorage[props.ii][0].recipeName} onChange={props.changeRecipe.bind(this, props.ii, 0,"recipeName")} />
            </form>
        )
    }
    else return (
        <button onClick={() => props.clickedRecipe(props.ii)}>
            {props.recipesStorage[props.ii][0].recipeName}
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
            <div className="col-xs-4"><h2>Ingredient</h2></div>
            <div className="col-xs-4"><h2>Quantity (g)</h2></div>
            <div className="col-xs-4"><h2>In Stock</h2></div>
        </div>
    )
}

function RecipesContent(props) {
    if (props.showIngredients === false) return null;
    console.log(props.recipesStorage[props.ii][2][0]);
    var rows = [];
    for (var jj = 0; jj < props.recipesStorage[props.ii][2].length;jj++){
        rows.push(
            <div className="row" key={("ingredients" + jj).toString()}>
                <div className="col-xs-4">
                    <form onSubmit={handleEditSubmit}>
                        {console.log(jj)}
                        <input type="text" value={props.recipesStorage[props.ii][2][jj].stockName} onChange={props.changeRecipe.bind(this, props.ii,jj, "stockName")} />
                    </form>
                </div>
                <div className="col-xs-4">
                    <form onSubmit={handleEditSubmit}>
                        <input type="text" value={props.recipesStorage[props.ii][2][jj].quantity} onChange={props.changeRecipe.bind(this, props.ii,jj, "quantity")} />
                    </form>
                </div>
                <div className="col-xs-4"><p className={props.recipesStorage[props.ii][jj].inStock}></p></div>
            </div>
        );
    }
    return (
        <div>{rows}</div>
    )
}

function Edit(props) {
    if (props.showIngredients === false) return null;
    return (
        <div>
            <button onClick={() => props.clickedEdit()}>Edit</button>
        </div>
    )
}

function Add(props){
    if (!props.editing) return null; 
    return(
        <button onClick={()=> props.clickedAddIngred()}>Add Ingredient</button>
    )
}

export default RecipeRow;