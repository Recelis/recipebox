import React, { Component } from 'react'

class InventoryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
            openedValue: '+',
        }
    }
    clickedOpen() {
        if (this.state.opened)
            this.setState({
                opened: false,
                openedValue: '+'
            });
        else this.setState({
            opened: true,
            openedValue: '-'
        });
    }

    render() {
        return (
            <div className="inventory">
                <Title
                    openedValue={this.state.openedValue}
                    onClick={() => this.clickedOpen()}
                />
                <Description
                    opened={this.state.opened}
                />
                <InventoryContent
                    opened={this.state.opened}
                    inventoryStorage={this.props.inventoryStorage}
                    editing={this.props.editing}
                    changedContent={this.props.changedContent}
                    deleteRow = {this.props.deleteRow}
                />
                <div className="editInventory">
                    <Edit
                        opened={this.state.opened}
                        clickedEdit={() => this.props.clickedEdit()}
                        editText={this.props.editText}
                    />
                    <Add
                        opened={this.state.opened}
                        editing={this.props.editing}
                        addRow={() => this.props.addRow()}
                    />
                </div>
            </div>
        )
    }
}



function Title(props) {
    return (
        <button onClick={() => props.onClick()} className="inventoryTitle">{props.openedValue} Inventory</button>
    )
}

function Description(props) {
    if (props.opened === false) return null;
    return (
        <div className="row">
            <div className="col-xs-6"><h2 className="stock">Stock</h2></div>
            <div className="col-xs-6"><h2 className="quantity">Quantity (g)</h2></div>
        </div>
    )
}

function InventoryContent(props) {
    if (props.opened === false) return null;
    var listItems = [];
    for (var ii = 0; ii < props.inventoryStorage.length; ii++) {
        listItems.push(
            <div className="row" key={ii.toString()}>
                <div className="col-xs-6" key={"stockName:" + props.inventoryStorage}>
                    <form onSubmit={handleEditSubmit}>
                        <input className="contentForm" type="text" value={props.inventoryStorage[ii].stockName} onChange={props.changedContent.bind(this, ii, "stockName")} />
                    </form>
                </div>
                <div className="col-xs-6" key={"quantity:" + props.inventoryStorage}>
                    <form onSubmit={handleEditSubmit}>
                        <input  className="contentForm" type="text" value={props.inventoryStorage[ii].quantity} onChange={props.changedContent.bind(this, ii, "quantity")} />
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

function handleEditSubmit(event) {
    event.preventDefault();
    return;
}

function Edit(props) {
    if (props.opened === false) return null;
    return (
        <button className = "edit" onClick={() => props.clickedEdit()}>{props.editText}</button>
    )
}

function Add(props) {
    if (props.opened === false || props.editing === false) return null;
    return (
        <button className = "edit" onClick={() => { props.addRow() }}>Add Inventory</button>
    )
}


export default InventoryTable;