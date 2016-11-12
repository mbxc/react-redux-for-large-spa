import connect from './connect';
import App from 'views/App';
import Home from './Home';

export default [
  {
    path: '/',
    component: connect(App),
    childRoutes: [
      Home
    ],
    indexRoute: {
      onEnter: (next, replaceState) => {
        replaceState(next.location.pathname + (next.location.pathname.endsWith('/') ? '' : '/') + 'home');
      }
    }
  }
]
