import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './containers/AppContainer';
import rootSaga from './sagas';
import configureStore from './store';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

const store = configureStore();
store.runSaga(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
