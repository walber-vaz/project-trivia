import { legacy_createStore as createStore } from 'redux';
// import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { rootReducer } from './reducers';

export const store = createStore(rootReducer, composeWithDevTools());

if (window.Cypress) {
  window.store = store;
}
