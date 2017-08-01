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
        var inventoryStorage = [{
            name:'empty',
            quantity:'10',
        },
        {name:'happy',
            quantity:'10',
        }];
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
                    inventoryStorage = {inventoryStorage}
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
        <div className="row">
            <div className="col-xs-6"><h2>Stock</h2></div>
            <div className="col-xs-6"><h2>Quantity (g)</h2></div>
        </div>
    )
}

function InventoryContent(props){
    if (props.opened === false) return null;
    var listItems = [];
    for (var ii =0; ii < props.inventoryStorage.length; ii++){
        listItems.push(
            <div className="row" key={props.inventoryStorage[ii].name.toString()}>
                <div className = "col-xs-6" key={"name:" + props.inventoryStory}>{props.inventoryStorage[ii].name}</div>
                <div className = "col-xs-6" key={"quantity:" + props.inventoryStory}>{props.inventoryStorage[ii].quantity}</div>
            </div>
        )
    }
    return (
        <div>
            {listItems}
        </div>
    )
}

function Edit(props){
    if (props.opened === false) return null;
    return (
        <button>Edit</button>
    )
}




export default InventoryTable;