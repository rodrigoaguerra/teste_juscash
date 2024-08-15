import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './views/Auth';
import Layout from './components/Layout';
import Dashboard from './views/Dashboard';

import NotFound from './components/NotFound';


class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  
  componentDidMount() {}

  render() {
    return (
      <BrowserRouter>
        <Routes>
            {/* Login */}
            <Route exact path='/' element={<Auth />} />
            <Route element={<Layout />}>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default Router;