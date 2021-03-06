import React, { Component } from 'react';
import RecipeBox from './components/RecipeBox'
import './App.css';

import github from "./img/github.png";

class App extends Component {
  openWindow(){
      window.open("https://github.com/Recelis/recipebox",'_blank');
  }
    
  render() {
    return (
      <div className="App">
        <RecipeBox />
        <div className="inStockDescription">
          <div className = "container">
            <div className="rows">
              <div className="col-xs-3"><p className="none"></p><p>None</p></div>
              <div className="col-xs-3"><p className="notEnough"></p><p>Not Enough</p></div>
              <div className="col-xs-3"><p className="enough"></p><p>Enough</p></div>
              <div className="col-xs-3"><p className="moreThanEnough"></p><p>More than Enough</p></div>
            </div>
          </div>
        </div>
        <p className="copyRight">Created By Jacky Lui &#169; 2017 
        <span><button onClick = {()=>this.openWindow()}className = "github"><img className = "github" src = {github}></img></button></span>
        </p>
      </div>
    );
  }
}

export default App;
