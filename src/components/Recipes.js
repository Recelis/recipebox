import React, {Component} from 'react'

class Recipes extends Component{
    constructor(){
        super();
        this.state = {
            recipesStorage: [{recipeName: '', showIngredients: false, stockName: '', quantity: '', inStock: 0}],
        }
    } 
    rowsOfRecipes(){
        var rows = [];
        for (var ii = 0; ii < this.state.recipesStorage.length; ii++){
            rows.push(
            <RecipeList
                ii={ii}
                key = {ii}
                recipesStorage = {this.state.recipesStorage}
                changeRecipe = {()=>this.changeRecipe()}
                clickedRecipe = {this.clickedRecipe.bind(this,ii)}
            />
            );
        }
        return rows;
    }
    clickedRecipe(ii){
        var contentObject = JSON.parse(JSON.stringify(this.state.recipesStorage));
        contentObject[ii].showIngredients = (contentObject[ii].showIngredients) ? false:true;
        this.setState({
            recipesStorage:contentObject
        })
    }

    changeRecipe(row, location, event) {
        if (this.state.editing) {
            var contentObject = JSON.parse(JSON.stringify(this.state.inventoryStorage));
            contentObject[row][location] = event.target.value;
            this.setState({
                inventoryStorage: contentObject
            })
        }
    }
    render(){
        if (this.props.opened === false) return null;
        return(
            <div>
                {this.rowsOfRecipes()}
            </div>
        )
    }
}

function RecipeList(props){
    return (
        <div>
        <button onClick = {()=>props.clickedRecipe(props.ii)}>{props.recipesStorage[props.ii].recipeName}</button>
        <RecipesContent
                key={props.ii} // change 
                status = {"status"} // change
                recipesStorage = {props.recipesStorage}
                changeRecipe = {()=>props.changeRecipe()}
                ii = {props.ii}
                showIngredients = {props.recipesStorage[props.ii].showIngredients}
        />
        <Edit/>
        </div>
    )
}

function handleEditSubmit(event){
    event.preventDefault();
    return;
}

function RecipesContent(props){ 
    if (props.showIngredients === false) return null; 
    return(
        <div className="row">
            <div className="col-xs-4">
                <form onSubmit={handleEditSubmit}>
                    <input type="text" value={props.recipesStorage.quantity} onChange={props.changeRecipe.bind(this,props.ii, "stockName")}/>
                </form>
            </div>
            <div className="col-xs-4">
                <form onSubmit={handleEditSubmit}>
                    <input type="text" value={props.recipesStorage.quantity} onChange={props.changeRecipe.bind(this,props.ii, "quantity")}/>
                </form>
            </div>
            <div className="col-xs-4"><p className = {props.status}></p></div>
        </div>
    )
}

function Edit(props){
    return(
        <div>
            <button>Edit</button>
        </div>
    )
}

export default Recipes;