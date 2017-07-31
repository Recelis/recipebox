import React, { Component } from 'react';
import RecipeBox from './components/RecipeBox'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RecipeBox/>
        <p>Created By Jacky Lui &#169; 2017</p>
      </div>
    );
  }
}

export default App;
