import React from 'react';

import setName from 'actions/home/setName';
import getIp from 'actions/home/getIp';

export default ({ home: { name, ip, loading, error } }) => {
  if (loading) return <img src={IMG_LOADING}/>;
  return (
    <div>
      <p>Hello {name || 'my friend'}! {ip && `You're coming from ${ip}.`}</p>
      { error && <p>Unable to get your public IP address.</p> }
      <p><input type="text" onChange={e => setName(e.target.value)} /></p>
    </div>
  );
}

getIp();