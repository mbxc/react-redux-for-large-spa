import React from 'react';
// layouts
import RightHeavyTwoColumnsLayout from 'layouts/RightHeavyTwoColumns';
// page parts
import Welcome from './Welcome';
import LeftMenu from './LeftMenu';
// components
import NameForm from 'components/NameForm';

import setName from 'actions/home/setName';

import getIp from 'actions/home/getIp';
import getAddressInfo from 'actions/home/getAddressInfo';

function HomeMain({ name, ip, loading, error, addressInfo }) {
  if (loading) return <img src={IMG_LOADING} />;
  return (
    <div>
      <Welcome name={name} ip={ip} error={error} />
      <div>
        <NameForm
          onChange={v => setName(v)}
          value={name}
          label="What's your name please?"
        />
      </div>
      <h3>Your address Detail</h3>
      {JSON.stringify(addressInfo)}
    </div>
  );
}

class Home extends React.PureComponent {
  componentDidMount() {
    getIp()
      .then(obj => getAddressInfo(obj.ip))
      .then(() => console.log('good job!!'))
      .catch(() => console.log('oops, it seems there are wrong!'));
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
