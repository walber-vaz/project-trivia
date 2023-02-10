import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

const tokenPlay =  {token: 'token-1234'};;
const nameDataTestId = 'input-player-name';
const emailDataTestId = 'input-gravatar-email';
const btnPlayDataTestId = 'btn-play';
const btnSettingsDataTestId = 'btn-settings';
const emailValid = 'teste@teste.com';
const emailInvalid = 'teste';
const nameValid = 'teste';
const nameInvalid = '';

describe('1 - Teste Pagina <App />', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockImplementation(() => tokenPlay)
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('1.1 - Teste se os elementos da tela de login estão presentes', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByTestId(nameDataTestId)).toBeInTheDocument();
    expect(screen.getByTestId(emailDataTestId)).toBeInTheDocument();
    expect(screen.getByTestId(btnPlayDataTestId)).toBeInTheDocument();
    expect(screen.getByTestId(btnSettingsDataTestId)).toBeInTheDocument();
  });

  it('1.2 - Teste se o botão de "play" está desabilitado quando o formulário não estiver preenchido', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByTestId(btnPlayDataTestId)).toBeDisabled();
  });

  it('1.3 - Teste se ao preencher os input com dados inválidos o botão de "play" fica desabilitado', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId(nameDataTestId);
    const inputEmail = screen.getByTestId(emailDataTestId);
    const btnPlay = screen.getByTestId(btnPlayDataTestId);

    userEvent.type(inputName, nameInvalid);
    userEvent.type(inputEmail, emailInvalid);

    expect(btnPlay).toBeDisabled();
  });

  it('1.4 - Teste se ao preencher o input os valores são renderizados corretamente', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId(nameDataTestId);
    const inputEmail = screen.getByTestId(emailDataTestId);

    userEvent.type(inputName, nameValid);
    userEvent.type(inputEmail, emailValid);

    expect(inputName.value).toBe(nameValid);
    expect(inputEmail.value).toBe(emailValid);
  });

  it('1.5 - Teste se ao preencher o formulário com dados válidos o botão de "play" fica habilitado', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId(nameDataTestId);
    const inputEmail = screen.getByTestId(emailDataTestId);
    const btnPlay = screen.getByTestId(btnPlayDataTestId);

    userEvent.type(inputName, nameValid);
    userEvent.type(inputEmail, emailValid);

    expect(btnPlay).toBeEnabled();
  });

  it('1.6 - Teste se ao preencher o formulário corretamente o botão de "play" redireciona para a página de jogo', async () => {
    const { history, store } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');

    const inputName = screen.getByTestId(nameDataTestId);
    const inputEmail = screen.getByTestId(emailDataTestId);
    const btnPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(inputName, nameValid);
    userEvent.type(inputEmail, emailValid);

    expect(btnPlay).toBeInTheDocument();
    expect(btnPlay).toBeEnabled();
    userEvent.click(btnPlay);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(history.location.pathname).toBe('/game');
      expect(screen.getByText('Game')).toBeInTheDocument();
      expect(store.getState().login.name).toBe(nameValid);
    });
  });

  it('1.7 - Teste se ao clicar no botão de "settings" o usuário é redirecionado para a página de configurações', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');

    const btnSettings = screen.getByRole('button', { name: /Configurações/i });
    expect(btnSettings).toBeInTheDocument();
    userEvent.click(btnSettings);

    expect(history.location.pathname).toBe('/settings');
    expect(screen.getByText('Configurações')).toBeInTheDocument();
  });
});
