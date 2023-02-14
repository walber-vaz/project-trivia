import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { mock } from "./helpers/mock";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

const initialState = {
  player: {
    name: 'grupo 8',
    gravatarEmail: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    assertions: 0,
    score: 0,
  }
};


describe('3 - Teste Pagina <Game />', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mock),
    }));
    jest.setTimeout(30000);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('3.1 - Teste de renderização do componente', async () => {
    await act(async () => {
      renderWithRouterAndRedux(<App />, initialState, '/game');
    });

    const logoTriviaAlt = await screen.findByAltText(/logo/i);
    const text = await screen.findByText(/SUA VEZ/i);
    const profile = await screen.findByTestId('header-profile-picture');
    const name = await screen.findByTestId('header-player-name');
    const score = await screen.findByTestId('header-score');
    const question = await screen.findByTestId('question-category');
    const questionText = await screen.findByTestId('question-text');
    const answer = await screen.findByTestId('answer-options');

    expect(logoTriviaAlt).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(profile).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(score).toBeInTheDocument();
    await waitFor(() => {
      expect(question).toBeInTheDocument();
      expect(questionText).toBeInTheDocument();
      expect(answer).toBeInTheDocument();
    });
  });

  it('3.2 - Teste se botão de Next não aparece na primeira pergunta', async () => {
    await act(async () => {
      renderWithRouterAndRedux(<App />, initialState, '/game');
    });

    const nextButton = await screen.queryByTestId('btn-next');

    expect(nextButton).not.toBeInTheDocument();
  });

  it('3.3 - Teste se botão de Next aparece após a primeira pergunta', async () => {
    await act(async () => {
      renderWithRouterAndRedux(<App />, initialState, '/game');
    });

    const answer = await screen.findByTestId('correct-answer');
    userEvent.click(answer);

    const nextButton = await screen.findByTestId('btn-next');

    expect(nextButton).toBeInTheDocument();
  });

  it('3.4 - Teste se ao clicar no botão Next, a próxima pergunta é renderizada', async () => {
    await act(async () => {
      renderWithRouterAndRedux(<App />, initialState, '/game');
    });

    const answer = await screen.findByTestId('correct-answer');
    userEvent.click(answer);

    const nextButton = await screen.findByTestId('btn-next');
    userEvent.click(nextButton);

    const question = await screen.findByTestId('question-category');
    const questionText = await screen.findByTestId('question-text');
    const answerOptions = await screen.findByTestId('answer-options');

    expect(question).toBeInTheDocument();
    expect(questionText).toBeInTheDocument();
    expect(answerOptions).toBeInTheDocument();
  });

  it('3.5 - Teste se ao clicar no botão Next, o botão some', async () => {
    await act(async () => {
      renderWithRouterAndRedux(<App />, initialState, '/game');
    });

    const answer = await screen.findByTestId('correct-answer');
    userEvent.click(answer);

    const nextButton = await screen.findByTestId('btn-next');
    userEvent.click(nextButton);

    expect(nextButton).not.toBeInTheDocument();
  });

  it('3.6 - Teste se renderiza a pergunta e ao clicar no botão Next, a próxima pergunta é renderizada', async () => {
    await act(async () => {
      renderWithRouterAndRedux(<App />, initialState, '/game');
    });

    expect(screen.getByTestId('question-text')).toHaveTextContent(mock.results[0].question);
    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));

    expect(screen.getByTestId('question-text')).toHaveTextContent(mock.results[1].question);
  });

  it('3.7 - Teste se a resposta incorreta não é contabilizada', async () => {
    await act(async () => {
      renderWithRouterAndRedux(<App />, initialState, '/game');
    });

    userEvent.click(screen.getByTestId('wrong-answer-0'));
    userEvent.click(screen.getByTestId('btn-next'));

    expect(screen.getByTestId('header-score')).toHaveTextContent('0');
  });

  it('3.8 - Teste se a resposta correta é contabilizada', async () => {
    await act(async () => {
      renderWithRouterAndRedux(<App />, initialState, '/game');
    });

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));

    expect(screen.getByTestId('header-score')).not.toHaveTextContent(/^0$/);
  });

  it('3.9 - Teste se a pontuação do jogador e computada ao final do jogo', async () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/game');


    await waitFor(() => {
      for (let i = 0; i < 5; i += 1) {
        userEvent.click(screen.getByTestId('correct-answer'));
        userEvent.click(screen.getByTestId('btn-next'));
      }
    });
    await waitFor(() => {
      expect(screen.queryByTestId(/header-score/i)).not.toHaveTextContent(
        /^0$/i
      );
    });
    await waitFor(() => {
      expect(history.location.pathname).toBe('/feedback');
    });
  });

  it('3.10 - Teste se token invalido redireciona para tela de login', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ response_code: 3, results: [] }),
    }));

    const { history } = renderWithRouterAndRedux(<App />, initialState, '/game');
     expect(global.fetch).toHaveBeenCalled();

    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });
  });

  it('3.11 - Teste se crono é zerado ao clicar no botão de próximo', async () => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval');

    renderWithRouterAndRedux(<App />, initialState, '/game');

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(screen.queryByTestId(/correct-answer/i)).toBeInTheDocument();
      expect(screen.queryByTestId(/time-play/i)).toHaveTextContent(/30/i);
    });

    await waitFor(async() => {
      expect(await screen.findByTestId(/time-play/i)).toHaveTextContent(/29/i);
    });

    expect(setInterval).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(28000);

    await waitFor(async () => {
      expect(await screen.findByText(/1/i)).toBeInTheDocument();
    });
    jest.advanceTimersByTime(1000);

    await waitFor(async () => {
      expect(await screen.findByText(/0/i)).toBeInTheDocument();
      expect(await screen.findByTestId(/correct-answer/i)).toBeDisabled();
    });
  });
});
