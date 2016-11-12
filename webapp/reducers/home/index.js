import getIp from 'actions/home/getIp';
import setName from 'actions/home/setName';

export default {
  initialState: { name: null, ip: null, loading: false, error: false },
  reducers: {
    [setName]: function(state, name) {
      return Object.assign({}, state, {name});
    },
    [getIp]: function(state) {
      return Object.assign({}, state, { loading: true, error: false, ip: null });
    },
    [getIp.success]: function(state, payload) {
      return Object.assign({}, state, { loading: false, ip: payload.ip });
    },
    [getIp.error]: function(state, payload) {
      return Object.assign({}, state, { loading: false, error: payload });
    }
  }
}
