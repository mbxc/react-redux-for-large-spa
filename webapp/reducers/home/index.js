import merge from 'reducers/utils/merge';
import getIp from 'actions/home/getIp';
import setName from 'actions/home/setName';
import getAddressInfo from 'actions/home/getAddressInfo';

export default {
  initialState: {
    name: null,
    ip: null,
    loading: false,
    error: false,
    addressInfo: null
  },
  reducers: {
    [setName]: merge(name => ({ name })),
    [getIp]: merge(payload => ({ loading: true, error: false, ip: null })),
    [getIp.success]: merge(payload => ({ loading: false, ip: payload.ip })),
    [getIp.error]: merge(payload => ({ loading: false, error: payload })),
    [getAddressInfo.success]: merge(payload => ({ addressInfo: payload }))
  }
};
