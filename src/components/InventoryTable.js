import React, { Component } from 'react'

class InventoryTable extends Component {
    constructor(props) {
        // get all inventoryStorage in local Storage
        var readLocalInventory = [];
        for (var ii =0; ii < localStorage.length; ii++){
            if (localStorage['inventoryStorage'+ii] === null) break; 
            else if (localStorage['inventoryStorage'+ii] === undefined) localStorage.removeItem('recipeStorage'+ii);
            else readLocalInventory.push(JSON.parse(localStorage['inventoryStorage'+ii]));
        } 
        if (readLocalInventory.length === 0) readLocalInventory.push({ stockName: '', quantity: '' });
        super();
        this.state = {
            opened: false,
            openedValue: '+',
            editing: false,
            inventoryStorage: readLocalInventory
        }
        this.changedContent = this.changedContent.bind(this);
        console.log(this.state.inventoryStorage);
    }

    clickedOpen() {
        if (this.state.opened) this.setState({
            opened: false,
            openedValue: '+'
        });
        else this.setState({
            opened: true,
            openedValue: '-'
        });
    }
    changedContent(row, location, event) {
        if (this.state.editing) {
            var contentObject = JSON.parse(JSON.stringify(this.state.inventoryStorage));
            contentObject[row][location] = event.target.value;
            this.setState({
                inventoryStorage: contentObject
            })

            if (typeof (Storage) !== "undefined") {
                // Code for localStorage/sessionStorage.
                localStorage.removeItem("inventoryStorage" + row);
                localStorage.setItem("inventoryStorage" + row, JSON.stringify(contentObject[row]));
                console.log(localStorage["inventoryStorage" + row]);
            } else {
                // Sorry! No Web Storage support..
                alert("Please use a modern major browser");
            }
            
        }
    }
    clickedEdit() {
        this.setState({
            editing: this.state.editing ? false : true
        })
    }

    addRow(props) {
        var contentObject = JSON.parse(JSON.stringify(this.state.inventoryStorage));
        if (contentObject[contentObject.length - 1].stockName === '') {
            alert("You need to enter item first!");
            return;
        } else if (contentObject[contentObject.length - 1].quantity === '') {
            alert("You need to enter a quantity for your item!");
            return;
        } else if (!contentObject[contentObject.length - 1].quantity.match(/\d+/g)) {
            alert("please enter a value that contains only numbers.");
            return;
        } else if (contentObject[contentObject.length - 1].quantity.match(/\d+/g)[0] !== contentObject[contentObject.length - 1].quantity) {
            alert("You may have accidentally typed an incorrect value in.");
            return;
        } else {
            contentObject.push({ stockName: '', quantity: '' });
            this.setState({
                inventoryStorage: contentObject
            })
        }
    }

    render() {
        return (
            <div>
                <Title
                    openedValue={this.state.openedValue}
                    onClick={() => this.clickedOpen()}
                />
                <Description
                    opened={this.state.opened}
                />
                <InventoryContent
                    opened={this.state.opened}
                    inventoryStorage={this.state.inventoryStorage}
                    editing={this.state.editing}
                    changedContent={this.changedContent}
                />
                <Edit
                    opened={this.state.opened}
                    clickedEdit={() => this.clickedEdit()}
                />
                <Add
                    opened={this.state.opened}
                    editing={this.state.editing}
                    addRow={(props) => this.addRow(props)}
                />

            </div>
        )
    }
}


function Title(props) {
    return (
        <button onClick={() => props.onClick()}>{props.openedValue} Inventory</button>
    )
}

function Description(props) {
    if (props.opened === false) return null;
    return (
        <div className="row">
            <div className="col-xs-6"><h2>Stock</h2></div>
            <div className="col-xs-6"><h2>Quantity (g)</h2></div>
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
                        <input type="text" value={props.inventoryStorage[ii].stockName} onChange={props.changedContent.bind(this, ii, "stockName")} />
                    </form>
                </div>
                <div className="col-xs-6" key={"quantity:" + props.inventoryStorage}>
                    <form onSubmit={handleEditSubmit}>
                        <input type="text" value={props.inventoryStorage[ii].quantity} onChange={props.changedContent.bind(this, ii, "quantity")} />
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
        <button onClick={() => props.clickedEdit()}>Edit</button>
    )
}

function Add(props) {
    if (props.opened === false || props.editing === false) return null;
    return (
        <button onClick={() => { props.addRow() }}>Add Inventory</button>
    )
}




export default InventoryTable;