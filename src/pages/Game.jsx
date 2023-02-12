import React, { Component } from 'react';
import { func, shape } from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';
import fetchApi from '../utils/fetchApi';

class Game extends Component {
  state = {
    questions: [],
  };

  componentDidMount() {
    this.fetchQuest();
  }

  fetchQuest = async () => {
    const { history } = this.props;
    const tkn = localStorage.getItem('token');
    const response = await fetchApi(
      `https://opentdb.com/api.php?amount=5&token=${tkn}`,
    );
    const three = 3;
    if (response.response_code === three) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({ questions: response.results });
  };

  render() {
    const { questions } = this.state;
    return (
      <div>
        <Header />
        {questions.length > 0
          ? <Questions questions={ questions[0] } />
          : <p>Loading...</p>}
      </div>
    );
  }
}

Game.propTypes = {
  history: shape({
    push: func,
  }),
}.isRequired;

export default Game;
