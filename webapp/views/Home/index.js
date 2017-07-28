import React from 'react';
// layouts
import DefaultLayout from 'layouts/Default';
import RightHeavyTwoColumnsLayout from 'layouts/RightHeavyTwoColumns';
// page parts
import Welcome from './Welcome';
import LeftMenu from './LeftMenu';
import Header from '../shared/Header';
import Footer from '../shared/Footer';

// components
import NameForm from 'components/NameForm';
// actions
import setName from 'actions/home/setName';

import getIp from 'actions/home/getIp';
import getAddressInfo from 'actions/home/getAddressInfo';

function HomeMain({ name, ip, loading, error, addressInfo }) {
  if (loading) return <img src={IMG_LOADING} />;
  return (
    <div>
      <Welcome {...{ name, ip, error }} />
      <div>
        <NameForm onChange={v => setName(v)} value={name} label="What's your name please?" />
      </div>
      <h3>Your address Detail</h3>
      {JSON.stringify(addressInfo)}
    </div>
  );
}

class Home extends React.PureComponent {
  componentDidMount() {
    // an example of action chaining
    Promise
      .resolve()
      // .then(openGlobalLoading)
      .then(getIp)
      .then(ipInfo => getAddressInfo(ipInfo.ip))
      .then(() => {
        // closeGlobalLoading();
        console.log('good job!!');
      })
      .catch(() => {
        // closeGlobalLoading();
        console.log('oops, there was an error!');
      });
  }
  render() {
    const { home } = this.props;
    return (
      <RightHeavyTwoColumnsLayout
        LeftMenu={<LeftMenu />}
        Main={<HomeMain {...home} />}
        minHeight={400}
      />
    );
  }
}

export default Home;
