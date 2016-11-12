import connect from './connect';
import createLazyViewLoader from './createLazyViewLoader';

export default {
  path: 'home',
  component: createLazyViewLoader(cb => {
    require.ensure([], require => cb(require('views/Home')));
  })
}