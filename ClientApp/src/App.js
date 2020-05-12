import React, { Component } from 'react';
import { Layout } from './components/Layout';
import Home from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './custom.css'

const App = () => {
    return (
      <Router>
        <Layout>
          <Route exact path='/' component={Home} />
          <Route path='/counter' component={Counter} />
          <Route path='/fetch-data' component={FetchData} />
        </Layout>
      </Router>
    );
}

export default App;