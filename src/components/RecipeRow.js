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
                <button onClick={() => this.props.clickedRecipe(this.props.ii)}>{this.props.recipesStorage[this.props.ii].recipeName}</button>
                <button onClick={() => this.props.makeTonight()}>Make Tonight</button>
                <RecipesContent
                    key={this.props.ii} // change 
                    recipesStorage={this.props.recipesStorage}
                    changeRecipe={this.props.changeRecipe}
                    ii={this.props.ii}
                    status={this.props.recipesStorage[this.props.ii].inStock}
                    showIngredients={this.props.recipesStorage[this.props.ii].showIngredients}
                />
                <Edit
                    showIngredients={this.props.recipesStorage[this.props.ii].showIngredients}
                    clickedEdit={() => this.props.clickedEdit()}
                />
            </div>
        )
    }
}

function handleEditSubmit(event){
    event.preventDefault();
    return;
}

function RecipesContent(props) {
    if (props.showIngredients === false) return null;
    return (
        <div className="row">
            <div className="col-xs-3">
                <form onSubmit={handleEditSubmit}>
                    <input type="text" value={props.recipesStorage[props.ii].stockName} onChange={props.changeRecipe.bind(this, props.ii, "stockName")} />
                </form>
            </div>
            <div className="col-xs-3">
                <form onSubmit={handleEditSubmit}>
                    <input type="text" value={props.recipesStorage[props.ii].quantity} onChange={props.changeRecipe.bind(this, props.ii, "quantity")} />
                </form>
            </div>
            <div className="col-xs-3"><p className={props.status}></p></div>
        </div>
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

export default RecipeRow;