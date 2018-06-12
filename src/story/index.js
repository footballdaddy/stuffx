import React from 'react';
import ReactDOM from 'react-dom';
// import './styles/index.css';
// import AppContainer from './AppContainer';
import { Provider } from 'react-redux';
import store from './store';
// import 'semantic-ui-css/semantic.min.css';local
import IndexContainer from './indexContainer'
ReactDOM.render(
  <Provider store={store}>
    <IndexContainer />
  </Provider>,
  document.getElementById('root'),
);
