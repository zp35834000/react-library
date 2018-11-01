import React from 'react'


import Home from './test/home'


class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    return (
        <Home></Home>
    );
  }
}

export default SiderDemo;