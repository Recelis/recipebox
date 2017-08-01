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
                    opened = {this.state.opened}
                />
                <InventoryContent
                    opened = {this.state.opened}
                />
                <Edit
                    opened = {this.state.opened}
                />
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
    if (props.opened === false) return null;
    return (
        <div>Some Description</div>
    )
}

function InventoryContent(props){
    if (props.opened === false) return null;
    return (
        <div>some content</div>
    )
}

function Edit(props){
    if (props.opened === false) return null;
    return (
        <button>Edit</button>
    )
}




export default InventoryTable;