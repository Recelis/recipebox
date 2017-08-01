import React, {Component} from 'react'

class InventoryTable extends Component {
    constructor(){
        super();
        this.state={
            opened:false,
            openedValue: '+',
            editing:false,
            inventoryStorage:[{stockName:'', quantity:''}]
        }
        this.changedContent = this.changedContent.bind(this);
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
    changedContent(row,location,event){
        if (this.state.editing){
            var contentObject = JSON.parse(JSON.stringify(this.state.inventoryStorage));
            contentObject[row][location] = event.target.value;
            this.setState({
                inventoryStorage:contentObject
            })
        }
    }
    clickedEdit(){
        this.setState({
            editing:this.state.editing? false:true
        })
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
                    inventoryStorage = {this.state.inventoryStorage}
                    editing = {this.state.editing}
                    changedContent = {this.changedContent}
                />
                <Edit
                    opened = {this.state.opened}
                    clickedEdit = {()=>this.clickedEdit()}
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
            <div className="row" key={ii.toString()}>
                <div className = "col-xs-6" key={"stockName:" + props.inventoryStorage}>
                    <form onSubmit={handleEditSubmit}>
                        <input type="text" value={props.inventoryStorage[ii].stockName} onChange={props.changedContent.bind(this,ii,"stockName")}/>
                    </form>   
                </div>
                <div className = "col-xs-6" key={"quantity:" + props.inventoryStorage}>
                    <form onSubmit={handleEditSubmit}>
                        <input type="text" value={props.inventoryStorage[ii].quantity} onChange={props.changedContent.bind(this,ii,"quantity")}/>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <div>
            {listItems}
        </div>
    )
}

function handleEditSubmit(event){
    event.preventDefault();
    return;
}

function Edit(props){
    if (props.opened === false) return null;
    return (
        <button onClick={()=>props.clickedEdit()}>Edit</button>
    )
}




export default InventoryTable;