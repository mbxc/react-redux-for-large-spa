import React from 'react';
import connect from './connect';

class LazyViewLoader extends React.Component {
    componentWillMount() {
      this.state = {};
      this.props.loadComponent(c => this.setState({ c: c.default || c }));
    }
    render() {
      const { c } = this.state || {};
      if (c) {
        const Component = connect(c);
        return <Component {...this.props} />;
      }
      return (
        <div style={{height: "100%"}}>
          <div style={{display: "block", textAlign: "center", paddingTop: "10%"}}>
            <img src={IMG_LOADING} />
          </div>
        </div>
      );
    }
  }

export default LazyViewLoader;
