import React from 'react'


import MainPage from '../component/mainPage'
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
      <MainPage contentPage = {Home}></MainPage>
    );
  }
}

export default SiderDemo;