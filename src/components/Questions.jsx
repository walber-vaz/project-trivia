import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { savedScore } from '../redux/actions/player';
import TimePlay from './TimePlay';
import '../App.css';

class Questions extends Component {
  state = {
    questionsShuffled: [],
    isSeletedQuestion: false,
    isTimeOut: false,
    score: 0,
    timeQuestion: 30,
    assertions: 0,
  };

  componentDidMount() {
    this.shuffeAllQuestion();
  }

  calculatedScore = (value, time) => {
    const points = 10;
    const multiplier = 3;
    switch (value.difficulty) {
    case 'easy':
      return points + 1 * time;
    case 'medium':
      return points + 2 * time;
    case 'hard':
      return points + multiplier * time;
    default:
      return 0;
    }
  };

  shuffled = (array) => {
    const five = 0.5;
    return array.sort(() => Math.random() - five);
  };

  handleClick = (value) => {
    const { dispatch, questions } = this.props;
    this.setState((prev) => ({
      isSeletedQuestion: true,
      isTimeOut: true,
      score: value
        ? prev.score + this.calculatedScore(questions, prev.timeQuestion) : prev.score,
      assertions: value ? prev.assertions + 1 : prev.assertions,
    }), () => {
      const { score, assertions } = this.state;
      dispatch(savedScore(score, assertions));
    });
  };

  shuffeAllQuestion = () => {
    const { questions } = this.props;
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

  handleTimer = (time) => {
    if (time === 0) return this.setState({ isTimeOut: true });
    return this.setState({ timeQuestion: time });
  };

  render() {
    const { questions } = this.props;
    const { questionsShuffled, isSeletedQuestion, isTimeOut } = this.state;
    const finalQuestions = isSeletedQuestion || isTimeOut;
    return (
      <div>
        {!isTimeOut && (
          <TimePlay
            isTimeOut={ isTimeOut }
            handleTimer={ this.handleTimer }
          />
        )}
        <fieldset>
          <legend data-testid="question-category">{ questions.category }</legend>
          <h2 data-testid="question-text">{ questions.question }</h2>
          <div data-testid="answer-options">
            {questionsShuffled.map((answer) => (
              <button
                type="button"
                key={ answer.name }
                data-testid={ answer.isCorrect
                  ? 'correct-answer' : `wrong-answer-${answer.index}` }
                disabled={ isSeletedQuestion || isTimeOut }
                className={ isTimeOut ? answer.class : '' }
                onClick={ () => this.handleClick(answer.isCorrect) }
              >
                { answer.name }
              </button>
            ))}
            {finalQuestions && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ () => {} }
              >
                Next
              </button>
            )}
          </div>
        </fieldset>
      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.shape({}),
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Questions);
