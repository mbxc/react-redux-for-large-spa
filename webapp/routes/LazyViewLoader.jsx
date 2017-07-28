import React from 'react';
import ReactDOM from 'react-dom';
import connect from './connect';

class LazyViewLoader extends React.PureComponent {
  state = {
    mod: null,
    Component: null
  };

  componentDidMount() {
    this.load(this.props);
  }

  load(props) {
    this.setState({
      mod: null,
      Component: null
    });
    props.loadComponent().then(asyncMod => {
      const mod = asyncMod.default ? asyncMod.default : asyncMod;
      if (mod !== this.state.mod) {
        const Component = connect(mod);
        this.setState({
          c: mod,
          Component: <Component {...props} />
        });
      }
    });
  }

  render() {
    const { Component } = this.state || {};
    if (Component) return React.cloneElement(Component, {...this.props});
    return (
      <div style={{ height: '100%' }}>
        <div
          style={{ display: 'block', textAlign: 'center', paddingTop: '10%' }}
        >
          <img src={IMG_LOADING} />
        </div>
      </div>
    );
  }
}

export default LazyViewLoader;
