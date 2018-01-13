import React, { Component } from 'react';
import RecipeBox from './components/RecipeBox'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RecipeBox />
        <div className="inStockDescription">
          <div className="rows">
            <div className="col-xs-3"><p className="none"></p><p>None</p></div>
            <div className="col-xs-3"><p className="notEnough"></p><p>Not Enough</p></div>
            <div className="col-xs-3"><p className="enough"></p><p>Enough</p></div>
            <div className="col-xs-3"><p className="moreThanEnough"></p><p>More than Enough</p></div>
          </div>
        </div>
        <p className="copyRight">Created By Jacky Lui &#169; 2017 
        <a className="github-share-button" href = "https://recelis.github.io/recipebox/"><i className="fa fa-github col-xs-6" id = "github"></i> </a>
        </p>
      </div>
    );
  }
}

export default App;
