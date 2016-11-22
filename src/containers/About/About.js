import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class About extends Component {
  render() {
    return (
      <div className="container bodyContainer">
        <Helmet title="About Us"/>
        <p className="m-t-20 text-center">This project was originally created by Chu Hoang Son</p>
      </div>
    );
  }
}
