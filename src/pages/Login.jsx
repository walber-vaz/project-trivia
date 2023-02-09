import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';

import logo from '../trivia.png';
import '../App.css';
import { player } from '../redux/actions/player';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

  // componentDidMount() {}

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, () => {
      this.validateFields();
    });
  };

  validateFields = () => {
    const { email, name } = this.state;
    const emailRegex = /\S+@\S+\.\S+/;
    const emailIsValid = emailRegex.test(email);
    const nameRegex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
    const nameIsValid = nameRegex.test(name);
    if (emailIsValid && nameIsValid) return this.setState({ isDisabled: false });
    return this.setState({ isDisabled: true });
  };

  handleClick = () => {
    const { dispatch } = this.props;
    const { name } = this.state;
    dispatch(player(name));
  };

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
          <form>
            <label htmlFor="name">
              Nome:
              <input
                type="text"
                data-testid="input-player-name"
                name="name"
                onChange={ this.handleChange }
                value={ name }
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                data-testid="input-gravatar-email"
                type="email"
                name="email"
                onChange={ this.handleChange }
                value={ email }
              />
            </label>
            <button
              type="button"
              data-testid="btn-play"
              name="isDisabled"
              onClick={ this.handleClick }
              disabled={ isDisabled }
            >
              play
            </button>
          </form>
        </header>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: func.isRequired,
  // history: shape({
  //   push: func.isRequired,
  // }).isRequired,
};

export default connect()(Login);
