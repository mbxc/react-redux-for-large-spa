import React from 'react';
import connect from './connect';
import App from 'views/App';
import Home from './Home';
import { Route, Redirect } from 'react-router-dom'

const AppContainer = connect(App);
export default (
  <Route path='/'>
    <AppContainer>
      <Route path='' exact><Redirect to="/home" /></Route>
      {Home}
    </AppContainer>
  </Route>
);
