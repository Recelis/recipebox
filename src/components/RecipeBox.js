import React, {Component} from 'react'
import InventoryTable from './InventoryTable'
import IngredientTable from './IngredientTable'


class RecipeBox extends Component {
    constructor (){
        super();
        this.state={
            somestate:''
        };
    }

    render(){
        return(
            <div>
                <h1>The RecipeBox 9000+</h1>
                <InventoryTable
                
                />
                <IngredientTable
                
                />
            </div>
        )
    }
}

export default RecipeBox;