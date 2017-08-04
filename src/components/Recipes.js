import React, {Component} from 'react'

class Recipes extends Component{
    constructor(){
        super();
        this.state = {
            recipesStorage: [{recipeName: '', showIngredients: false, stockName: '', quantity: '', inStock:'none'}],
            editing:false
        }
        this.changeRecipe = this.changeRecipe.bind(this);
    } 
    rowsOfRecipes(){
        var rows = [];
        for (var ii = 0; ii < this.state.recipesStorage.length; ii++){
            rows.push(
            <RecipeList
                ii={ii}
                key = {ii}
                recipesStorage = {this.state.recipesStorage}
                changeRecipe = {this.changeRecipe}
                clickedRecipe = {this.clickedRecipe.bind(this,ii)}
                clickedEdit = {()=>this.clickedEdit()}
                makeTonight = {()=>this.makeTonight}
            />
            );
        }
        return rows;
    }
    makeTonight(){
        console.log("please fill this in!");
    }

    clickedEdit(){
        this.setState({
            editing:(this.state.editing)?false:true
        })
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
            var contentObject = JSON.parse(JSON.stringify(this.state.recipesStorage));
            contentObject[row][location] = event.target.value;
            this.setState({
                recipesStorage: contentObject
            })
        }
    }

    clickedAddRecipe(){

    }

    render(){
        if (this.props.opened === false) return null;
        return(
            <div>
                {this.rowsOfRecipes()}
                <AddRecipe
                    clickedAddRecipe = {()=>this.clickedAddRecipe()}
                />
            </div>
        )
    }
}

function AddRecipe(props){
    return (
        <div>
            <button onClick = {()=>props.clickedAddRecipe()}>Add Recipe</button>
        </div>
    )
}

function RecipeList(props){
    return (
        <div>
        <button onClick = {()=>props.clickedRecipe(props.ii)}>{props.recipesStorage[props.ii].recipeName}</button>
        <button onClick = {()=>props.makeTonight()}>Make Tonight</button>
        <RecipesContent
                key={props.ii} // change 
                recipesStorage = {props.recipesStorage}
                changeRecipe = {props.changeRecipe}
                ii = {props.ii}
                status = {props.recipesStorage[props.ii].inStock}
                showIngredients = {props.recipesStorage[props.ii].showIngredients}
        />
        <Edit
            showIngredients = {props.recipesStorage[props.ii].showIngredients}
            clickedEdit =  {()=>props.clickedEdit()}
        />
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
            <div className="col-xs-3">
                <form onSubmit={handleEditSubmit}>
                    <input type="text" value={props.recipesStorage[props.ii].stockName} onChange={props.changeRecipe.bind(this,props.ii, "stockName")}/>
                </form>
            </div>
            <div className="col-xs-3">
                <form onSubmit={handleEditSubmit}>
                    <input type="text" value={props.recipesStorage[props.ii].quantity} onChange={props.changeRecipe.bind(this,props.ii, "quantity")}/>
                </form>
            </div>
            <div className="col-xs-3"><p className = {props.status}></p></div>
        </div>
    )
}

function Edit(props){
    if (props.showIngredients === false) return null;
    return(
        <div>
            <button onClick = {()=>props.clickedEdit()}>Edit</button>
        </div>
    )
}

export default Recipes;