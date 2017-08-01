import React, {Component} from 'react'


class InventoryTable extends Component {
    constructor(){
        super();
        this.state={
            opened:false,
            openedValue: '+'
        }
    }

    clickedOpen(){
        if (this.state.opened) this.setState({
            opened: false,
            openedValue:'+'
        });
        else this.setState({
            opened:true,
            openedValue:'-'
        });
    }
    
    render(){
        return (
            <div>
                <Title
                    openedValue={this.state.openedValue}
                    onClick={()=>this.clickedOpen()}
                />
                <Description
                
                />
                <InventoryContent/>
                <Edit/>
            </div>
        )
    }
}


function Title(props){
    return (
        <button onClick={()=>props.onClick()}>{props.openedValue} Inventory</button>
    )
}

function Description(props){
    return (
        <div>Some Description</div>
    )
}

function InventoryContent(props){
    return (
        <div>some content</div>
    )
}

function Edit(props){
    return (
        <button>Edit</button>
    )
}




export default InventoryTable;