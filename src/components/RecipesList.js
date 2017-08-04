import React, {Component} from 'react'
import RecipeRow from './RecipeRow'

class RecipesList extends Component{
    constructor(){
        super();
        // var readLocalRecipes = 
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
            <RecipeRow
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

export default RecipesList;