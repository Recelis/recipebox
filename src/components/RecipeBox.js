import React, {Component} from 'react'

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
                <p>Created By Jacky Lui &#169; 2017</p>
            </div>
        )
    }
}

export default RecipeBox;