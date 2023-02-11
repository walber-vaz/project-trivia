import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { login } = this.props;
    const score = JSON.parse(localStorage.getItem('player') ?? '{}').score ?? 0;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ login.img }
          alt={ login.name }
        />
        <p data-testid="header-player-name">{login.name}</p>
        <p data-testid="header-score">{score}</p>
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
  login: state.login,
});
export default connect(mapStateToProps)(Header);
