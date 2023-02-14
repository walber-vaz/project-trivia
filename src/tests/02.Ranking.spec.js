import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

const initialState = {
  player: {
    name: 'grupo 8',
    gravatarEmail: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    assertions: 2,
    score: 70,
  }
};

const localDataStorage = {
  ranking: [
    {
      name: 'grupo 8',
      score: 70,
      picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    },
    {
      name: 'grupo 8',
      score: 60,
      picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    },
  ]
};

// mock localStorage data to test ranking page
const mockLocalStorage = () => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn().mockImplementation((key) => JSON.stringify(localDataStorage[key])),
      setItem: jest.fn().mockImplementation((key, value) => {
        localDataStorage[key] = JSON.parse(value);
      } ),
    },
    writable: true,
  });
};


describe('2 - Teste Pagina <Ranking />', () => {
  beforeEach(() => {
    mockLocalStorage();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('2.1 - Teste se a rota "/ranking" renderiza a página de ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialState }, '/ranking');

    expect(history.location.pathname).toBe('/ranking');
  });

  it('2.2 - Teste se a página de ranking renderiza os dados corretamente', async () => {
    renderWithRouterAndRedux(<App />, { initialState }, '/ranking');

    const ranking = await screen.findByTestId('ranking-title');
    const player0 = await screen.findByTestId('player-name-0');
    const score0 = await screen.findByTestId('player-score-0');
    const player1 = await screen.findByTestId('player-name-1');
    const score1 = await screen.findByTestId('player-score-1');


    expect(ranking).toBeInTheDocument();
    expect(player0).toBeInTheDocument();
    expect(score0).toBeInTheDocument();
    expect(player1).toBeInTheDocument();
    expect(score1).toBeInTheDocument();
  });

  it('2.3 - Teste se ao clicar no botão "Jogar Novamente" a pessoa é redirecionada para a página inicial', async () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialState }, '/ranking');

    const btnPlayAgain = await screen.findByTestId('btn-go-home');

    act(() => {
      userEvent.click(btnPlayAgain);
    });

    expect(history.location.pathname).toBe('/');
  });

  it('2.4 - Teste se na pagina de ranking tem os componentes renderizados', async () => {
    renderWithRouterAndRedux(<App />, { initialState }, '/ranking');

    const ranking = await screen.findByTestId('ranking-title');
    const player0 = await screen.findByTestId('player-name-0');
    const score0 = await screen.findByTestId('player-score-0');
    const player1 = await screen.findByTestId('player-name-1');
    const score1 = await screen.findByTestId('player-score-1');
    const btnPlayAgain = await screen.findByTestId('btn-go-home');
    const logoTrivia = screen.getByAltText('logo');

    expect(ranking).toBeInTheDocument();
    expect(player0).toBeInTheDocument();
    expect(score0).toBeInTheDocument();
    expect(player1).toBeInTheDocument();
    expect(score1).toBeInTheDocument();
    expect(logoTrivia).toBeInTheDocument();
    expect(btnPlayAgain).toBeInTheDocument();
  });
});

