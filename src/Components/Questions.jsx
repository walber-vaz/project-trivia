import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../utils/fetchApi';
import Question from './Question';

class Questions extends Component {
  state = {
    questions: [],
    active: 0,
  };

  componentDidMount() {
    const twoSeconds = 2000;
    setTimeout(() => {
      this.fetchQuest();
    }, twoSeconds);
  }

  questionsShuffle = (arr) => {
    const magic = 0.5;
    return arr.sort(() => Math.random() - magic);
  };

  handleClick = () => {
    const { active, questions } = this.state;
    if (active < questions.length) {
      this.setState({ active: active + 1 });
    } else {
      const correct = questions.filter((question) => console.log(question));
      return correct;
    }
  };

  fetchQuest = async () => {
    const { history } = this.props;
    const tkn = localStorage.getItem('token');
    const response = await fetchApi(
      `https://opentdb.com/api.php?amount=5&token=${tkn}`,
    );
    this.setState({ questions: response.results });
    const { response_code: numberValidator } = response;
    const three = 3;
    if (numberValidator === three) {
      localStorage.removeItem('token');
      history.push('/');
    }
  };

  render() {
    const { questions, active } = this.state;
    const quests = () => questions.map(
      ({ category, question, correct_answer: correta, incorrect_answers: incorreta }) => {
        const combineAnswers = [correta, ...incorreta];
        const answers = this.questionsShuffle(combineAnswers);
        return {
          category,
          question,
          correta,
          incorreta,
          answers,
        };
      },
    );

    return (
      <div>
        {quests().map((quest, index) => (
          <div key={ quest.question }>
            {questions.length && (
              <Question
                categoria={ quest.category }
                pergunta={ quest.question }
                respostas={ quest.answers }
                correta={ quest.correct_answer }
                incorreta={ quest.incorrect_answers }
                active={ active === index }
                onClick={ this.handleClick }
                answerCorrect="correct_answer"
                question={ quest }
              />
            )}
          </div>
        ))}
      </div>
    );
  }
}

Questions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Questions;
