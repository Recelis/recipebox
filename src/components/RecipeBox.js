import React, { Component } from 'react'
import InventoryTable from './InventoryTable'
import IngredientTable from './IngredientTable'


class RecipeBox extends Component {
    constructor() {
        super();
        // get all inventoryStorage in local Storage
        var readLocalInventory = [];
        for (var ii = 0; ii < localStorage.length; ii++) {
            if (localStorage['inventoryStorage' + ii] === null) break;
            else if (localStorage['inventoryStorage' + ii] === undefined) localStorage.removeItem('inventoryStorage' + ii);
            else {
                var inventoryLine = JSON.parse(localStorage['inventoryStorage' + ii]);
                if (inventoryLine.stockName.quantity !== 0 && inventoryLine.quantity.length !== 0){
                    readLocalInventory.push(inventoryLine);
                }
            }
        }
        if (readLocalInventory.length === 0) readLocalInventory.push({stockName:"",quantity:""});

        this.state = {
            editing: false,
            inventoryStorage: readLocalInventory,
            editText:'Edit'
        };
        this.changedContent = this.changedContent.bind(this);
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
            } else {
                // Sorry! No Web Storage support..
                alert("Please use a modern major browser");
            }

        }
    }
    clickedEdit() {
        this.setState({
            editing: this.state.editing ? false : true,
            editText: this.state.editing ? 'Edit':'Close' 
        })
    }

    addRow() {
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
            <div className="mainSpace">
                <h1 className="mainTitle"><b>The RecipeBox 9000+</b></h1>
                <InventoryTable
                    openValue = {this.state.openedValue}
                    clickedOpen = {()=>this.clickedOpen()}
                    opened={this.state.opened}
                    inventoryStorage={this.state.inventoryStorage}
                    editing={this.state.editing}
                    changedContent={this.changedContent}
                    clickedEdit={() => this.clickedEdit()}
                    editText={this.state.editText}
                    addRow={() => this.addRow()}
                />
                <IngredientTable
                    inventoryStorage = {this.state.inventoryStorage}
                />
            </div>
        )
    }
}

export default RecipeBox;