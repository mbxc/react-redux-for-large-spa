import React from 'react';
import getAddressInfo from 'actions/home/getAddressInfo';
import getIp from 'actions/home/getIp';

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

function HomePageWelcomePart({ name, ip, error }) {
  return (
    <div>
      <div>Hello {name || 'my friend'}! {ip && `You're coming from ${ip}.`}</div>
      {error && <p>Unable to get your public IP address.</p>}
    </div>
  )
}

export default HomePageWelcomePart;