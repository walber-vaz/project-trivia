import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Settings from './pages/Settings';

import Login from './pages/Login';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    );
  }
}

export default App;
