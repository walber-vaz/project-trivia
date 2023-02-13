import React, { Component } from 'react';
import { func, shape } from 'prop-types';

class Ranking extends Component {
  state = {
    finalRanking: [],
  };

  componentDidMount() {
    this.getRanking();
  }

  getRanking = () => {
    const finalRanking = JSON.parse(localStorage.getItem('ranking'));
    finalRanking.sort((a, b) => b.score - a.score);
    this.setState({
      finalRanking,
    });
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { finalRanking } = this.state;
    return (
      <div>
        { (finalRanking.map((player, index) => (
          <div key={ index }>
            <img
              src={ player.gravatarEmail }
              alt={ player.name }
            />
            <p data-testid={ `player-name-${index}` }>
              {player.name}
            </p>
            <p data-testid={ `player-score-${index}` }>{player.score}</p>
          </div>
        ))) }
        <h2 data-testid="ranking-title">Ranking</h2>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: shape({
    push: func,
  }),
}.isRequired;

export default Ranking;
