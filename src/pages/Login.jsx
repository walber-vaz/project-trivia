import React, { Component } from 'react';
import { func, shape } from 'prop-types';
import { connect } from 'react-redux';

import { fetchLogin } from '../redux/actions/player';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

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
    const { name, email } = this.state;
    const { dispatch, history: { push } } = this.props;
    dispatch(fetchLogin(name, email, push));
  };

  render() {
    const { name, email, isDisabled } = this.state;
    const { history } = this.props;
    return (
      <>
        <input
          type="text"
          data-testid="input-player-name"
          name="name"
          onChange={ this.handleChange }
          value={ name }
        />
        <input
          data-testid="input-gravatar-email"
          type="email"
          name="email"
          onChange={ this.handleChange }
          value={ email }
        />
        <button
          type="button"
          data-testid="btn-play"
          name="isDisabled"
          onClick={ this.handleClick }
          disabled={ isDisabled }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Configurações
        </button>
      </>
    );
  }
}

Login.propTypes = {
  dispatch: func,
  history: shape({
    push: func,
  }),
}.isRequired;

export default connect()(Login);
