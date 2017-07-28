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

function HomeMain({ name, ip, loading, error }) {
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
    </div>
  );
}

class Home extends React.PureComponent {
  componentDidMount() {
    getIp();
  }
  render() {
    const { home } = this.props;
    return (
      <RightHeavyTwoColumnsLayout
        LeftMenu={<LeftMenu />}
        Main={
          <HomeMain
            name={home.name}
            ip={home.ip}
            loading={home.loading}
            error={home.error}
          />
        }
        minHeight={400}
      />
    );
  }
}

export default Home;