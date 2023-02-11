import React, { Component } from 'react';
import { func, shape } from 'prop-types';
import Header from '../Components/Header';
import Questions from '../Components/Questions';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <div>Game</div>
        <Header />
        <Questions history={ history } />
      </>
    );
  }
}

Game.propTypes = {
  history: shape({
    push: func,
  }),
}.isRequired;

export default Game;
