import React, {Component} from 'react'
import RecipesList from './RecipesList'

class IngredientTable extends Component{
    constructor(props){
        super();
        this.state = {
            opened:false,
            openRecipes:'+'
        }
    }
    clickedOpen(){
        if (this.state.opened)
            this.setState({
            opened: false,
            openRecipes: '+'
        })
        else this.setState({
            opened: true,
            openRecipes: '-'
        })
    }

    render(){
        return(
            <div>
                <Title 
                    onClick = {()=>this.clickedOpen()}
                    openRecipes = {this.state.openRecipes}
                />
                 <RecipesList
                     opened = {this.state.opened}   
                     inventoryStorage = {this.props.inventoryStorage}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                /> 
            </div>
        )   
    }
}


function Title(props){
    return(
        <button onClick={()=> props.onClick()}> {props.openRecipes}Recipes</button>
    )
}
export default IngredientTable;