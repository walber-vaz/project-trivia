import { arrayOf, bool, shape, string, func } from 'prop-types';
import React, { Component } from 'react';

class Question extends Component {
  state = {
    colorCorrect: '',
    colorIncorrect: '',
    timer: 30,
    disabled: false,
  };

  componentDidMount() {
    this.startTimer();
  }

  startTimer = () => {
    const thousand = 1000;
    this.timerInterval = setInterval(() => {
      this.setState((anterior) => {
        const newTimer = anterior.timer - 1;
        if (newTimer === 0) {
          clearInterval(this.timerInterval);
          return { timer: newTimer, disabled: true };
        }
        return { timer: newTimer };
      });
    }, thousand);
  };

  questionsShuffle = (arr) => {
    const magic = 0.5;
    return arr.sort(() => Math.random() - magic);
  };

  handleClick = ({ target }) => {
    if (target.id === 'correct-answer') {
      this.setState({ colorCorrect: 'green-border', colorIncorrect: 'red-border' });
    } else {
      this.setState({ colorIncorrect: 'red-border', colorCorrect: 'green-border' });
    }
  };

  correctAndIncorrectQuestions = () => {
    const { question } = this.props;
    const { colorCorrect, colorIncorrect, disabled } = this.state;
    if (question) {
      const correct = (
        <button
          type="button"
          data-testid="correct-answer"
          id="correct-answer"
          key={ question.correta }
          onClick={ this.handleClick }
          className={ colorCorrect }
          disabled={ disabled }
        >
          { question.correta }
        </button>
      );

      const incorrect = question.incorretas.map((answer, index) => (
        <button
          type="button"
          data-testid={ `wrong-answer-${index}` }
          id="wrong-answer"
          key={ answer }
          onClick={ this.handleClick }
          className={ colorIncorrect }
          disabled={ disabled }
        >
          {answer}
        </button>
      ));

      const allAnswers = [correct, ...incorrect];
      return this.questionsShuffle(allAnswers);
    }
  };

  render() {
    const respostas = this.correctAndIncorrectQuestions();
    const { active, categoria, pergunta, onClick } = this.props;
    const { timer } = this.state;
    if (active === false) return null;
    return (
      <div>
        <p>
          Time remaining:
          {timer}
          {' '}
          seconds
        </p>
        <fieldset name={ pergunta }>
          <legend data-testid="question-category">{ categoria }</legend>
          <h2 data-testid="question-text">{ pergunta }</h2>
          <div data-testid="answer-options">
            {respostas.map((resposta) => resposta)}
          </div>
          <button onClick={ onClick }>Next</button>
        </fieldset>
      </div>
    );
  }
}

Question.propTypes = {
  question: shape({
    correta: string.isRequired,
    incorretas: arrayOf(string).isRequired,
  }).isRequired,
  active: bool.isRequired,
  categoria: string.isRequired,
  pergunta: string.isRequired,
  onClick: func.isRequired,
};

export default Question;
