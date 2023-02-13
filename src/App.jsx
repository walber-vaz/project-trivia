import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Game from './pages/Game';

import logo from './trivia.png';
import Feedback from './pages/Feedback';
import './App.css';
import Ranking from './pages/Ranking';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/settings" component={ Settings } />
            <Route exact path="/game" component={ Game } />
            <Route exact path="/feedback" component={ Feedback } />
            <Route exact path="/ranking" component={ Ranking } />
          </Switch>
        </header>
      </div>
    );
  }
}

export default App;
