import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createBrowserHistory} from 'history';
import { Router } from "react-router-dom";
import { observerBatching } from "mobx-react-lite/batchingForReactDom"

//const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
export const history = createBrowserHistory();
const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router history={history}>
    <App />
    </Router>,
  rootElement);

registerServiceWorker();

