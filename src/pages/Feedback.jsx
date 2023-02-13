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
    if (player.assertions < tree) {
      return this.setState({ msg: 'Could be better...' });
    }
    return this.setState({ msg: 'Well Done!' });
  }

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
        <p data-testid="header-player-name">{ player.name }</p>
        <p data-testid="header-score">{ player.score }</p>
        <p data-testid="feedback-text">{msg}</p>
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
