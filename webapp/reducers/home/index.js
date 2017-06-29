import merge from 'reducers/utils/merge';
import getIp from 'actions/home/getIp';
import setName from 'actions/home/setName';

export default {
  initialState: { name: null, ip: null, loading: false, error: false },
  reducers: {
    [setName]: merge(name => ({ name })),
    [getIp]: merge(payload => ({ loading: true, error: false, ip: null })),
    [getIp.success]: merge(payload => ({ loading: false, ip: payload.ip })),
    [getIp.error]: merge(payload => ({ loading: false, error: payload }))
  }
}
