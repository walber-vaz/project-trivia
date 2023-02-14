import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shape } from 'prop-types';

class Feedback extends Component {
  state = {
    msg: '',
  };

  componentDidMount() {
    const { player } = this.props;
    const tree = 3;
    this.savePlayer();
    if (player.assertions < tree) {
      return this.setState({ msg: 'Could be better...' });
    }
    return this.setState({ msg: 'Well Done!' });
  }

  savePlayer = () => {
    const { player } = this.props;
    const rankingList = JSON.parse(localStorage.getItem('ranking')) || [];
    rankingList.push(player);
    localStorage.setItem('ranking', JSON.stringify(rankingList));
  };

  handleClickAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleClickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { player } = this.props;
    const { msg } = this.state;
    return (
      <div>
        <h1>Feedback</h1>
        <img
          src={ player.gravatarEmail }
          alt={ player.name }
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{player.name}</p>
        <p data-testid="header-score">{player.score}</p>
        <div>
          <h2>Resultado Final</h2>
          <p data-testid="feedback-text">{msg}</p>
          <p data-testid="feedback-total-score">{player.score}</p>
          <p data-testid="feedback-total-question">{player.assertions}</p>
        </div>
        {/* Cria botão para pessoa jogar novamente  */}
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClickAgain }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleClickRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  player: shape({}),
}.isRequired;

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Feedback);
