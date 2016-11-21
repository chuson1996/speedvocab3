import React, { Component, PropTypes } from 'react';
// import { WithContext as ReactTags } from 'react-tag-input';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import cl from 'classnames';
// import {
//   Pagination,
// } from 'components';

@asyncConnect([{
  promise: ({ store: { dispatch, getState }}) => {
    const promises = [];

    return Promise.all(promises);
  }
}])
// @connect()
export default class FrontendAdvisor extends Component {
  static propTypes = {
  };


  render() {
    const styles = require('./Home.scss');

    return (
      <div className={`container ${styles.frontendAdvisor}`}>
        <div className={`${styles.masthead}`}>
        </div>
      </div>
    );
  }
}
