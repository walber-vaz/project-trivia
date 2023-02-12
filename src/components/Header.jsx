import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { player } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ player.gravatarEmail }
          alt={ player.name }
        />
        <p data-testid="header-player-name">{player.name}</p>
        <p data-testid="header-score">{player.score}</p>
      </header>
    );
  }
}
Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  login: PropTypes.shape(),
}.isRequired;
const mapStateToProps = (state) => ({
  player: state.player,
});
export default connect(mapStateToProps)(Header);
