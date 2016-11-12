import React from 'react';

import DefaultLayout from 'layouts/Default';
import Header from './shared/Header';
import Footer from './shared/Footer';

require('./base.less');

export default function App({ children }) {
  return (
    <DefaultLayout
      Header={<Header />}
      Footer={<Footer />}
      Main={children}
      />
  );
}  