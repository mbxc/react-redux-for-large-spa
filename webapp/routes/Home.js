import React from 'react';
import connect from './connect';
import LazyViewLoader from './LazyViewLoader';
import { Route, IndexRedirect } from 'react-router'

export default (
  <Route path='/home'>
    <LazyViewLoader loadComponent={cb => {
      console.log("Loading Home view...");
      require.ensure([], require => cb(require('views/Home')));
    }} />
  </Route>
);
