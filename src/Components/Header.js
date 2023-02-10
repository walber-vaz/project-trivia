import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, img } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ img }
          alt={ name }
        />
        <p data-testid="header-player-name">
          { name }
        </p>
        <p data-testid="header-score">
          0
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  img: state.login.img,
  name: state.login.name,
});

export default connect(mapStateToProps)(Header);
