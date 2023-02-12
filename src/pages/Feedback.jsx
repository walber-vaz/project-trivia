import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shape } from 'prop-types';

class Feedback extends Component {
  render() {
    const { player } = this.props;
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <img
          src={ player.gravatarEmail }
          alt={ player.name }
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ player.name }</p>
        <p data-testid="header-score">{ player.score }</p>
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
