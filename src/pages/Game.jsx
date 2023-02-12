import React, { Component } from 'react';
import { func, shape } from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';
import fetchApi from '../utils/fetchApi';

class Game extends Component {
  state = {
    questions: [],
    assertionsCurrent: 0,
    questionsShuffled: [],
  };

  componentDidMount() {
    const timeOutFetch = 2000;
    setTimeout(() => {
      this.fetchQuest();
    }, timeOutFetch);
  }

  shuffled = (array) => {
    const five = 0.5;
    return array.sort(() => Math.random() - five);
  };

  shuffeAllQuestion = (questions) => {
    const correct = {
      name: questions.correct_answer,
      isCorrect: true,
      class: 'green-border',
    };
    const incorrect = questions.incorrect_answers.map((answer, index) => ({
      name: answer,
      isCorrect: false,
      class: 'red-border',
      index,
    }));
    const allAnswers = [correct, ...incorrect];
    this.setState({ questionsShuffled: this.shuffled(allAnswers) });
  };

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
    this.setState({ questions: response.results }, () => {
      const { questions, assertionsCurrent } = this.state;
      this.shuffeAllQuestion(questions[assertionsCurrent]);
    });
  };

  handleClickNext = () => {
    const { assertionsCurrent, questions } = this.state;
    const maxAssertions = 4;
    if (assertionsCurrent < maxAssertions) {
      this.setState((prev) => ({
        assertionsCurrent: prev.assertionsCurrent < maxAssertions
          ? (prev.assertionsCurrent + 1) : maxAssertions,
      }), () => {
        const { assertionsCurrent: current } = this.state;
        this.shuffeAllQuestion(questions[current]);
      });
    } else {
      const { history } = this.props;
      history.push('/feedback');
    }
  };

  render() {
    const { questions, assertionsCurrent, questionsShuffled } = this.state;
    return (
      <div>
        <Header />
        {questions.length > 0 ? <Questions
          questions={ questions[assertionsCurrent] }
          key={ assertionsCurrent }
          questionsShuffled={ questionsShuffled }
          handleClickNext={ this.handleClickNext }
        />
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
