import React from 'react';
import connect from './connect';
import LazyViewLoader from './LazyViewLoader';
import { Route, IndexRedirect } from 'react-router';

const loadHome = cb => {
  console.log('Loading Home view...');
  return import('views/Home');
};

export default (
  <Route path="/home">
    <LazyViewLoader loadComponent={loadHome} />
  </Route>
);
