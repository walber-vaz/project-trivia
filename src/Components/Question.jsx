import { arrayOf, bool, shape, string } from 'prop-types';
import React, { Component } from 'react';

class Questions extends Component {
  questionsShuffle = (arr) => {
    const magic = 0.5;
    return arr.sort(() => Math.random() - magic);
  };

  correctAndIncorrectQuestions = () => {
    const { question } = this.props;
    if (question) {
      console.log(question);
      const correct = (
        <button
          type="button"
          data-testid="correct-answer"
          key={ question.correct_answer }
        >
          { question.correct_answer }
        </button>
      );

      const incorrect = question.incorrect_answers.map((answer, index) => (
        <button
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ answer }
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
    if (active === false) return null;
    return (
      <fieldset name={ pergunta }>
        <legend data-testid="question-category">{ categoria }</legend>
        <h2 data-testid="question-text">{ pergunta }</h2>
        <div data-testid="answer-options">
          {respostas.map((resposta) => resposta)}
        </div>
        <button onClick={ onClick }>Next</button>
      </fieldset>
    );
  }
}

Questions.propTypes = {
  question: shape({
    correct_answer: string.isRequired,
    incorrect_answers: arrayOf(string).isRequired,
  }).isRequired,
  active: bool.isRequired,
  categoria: string.isRequired,
  pergunta: string.isRequired,
  onClick: func.isRequired,
};

export default Questions;
