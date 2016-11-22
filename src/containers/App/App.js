import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { IndexLink } from 'react-router';
// import { LinkContainer } from 'react-router-bootstrap';
// import Navbar from 'react-bootstrap/lib/Navbar';
// import Nav from 'react-bootstrap/lib/Nav';
// import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
// import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
// import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
// import { InfoBar } from 'components';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import last from 'lodash/last';
import {
  // Footer,
  SubHeader,
  Header } from 'components';
import ProgressBar from 'react-progress-bar-plus';
import { isGlobalLoading } from 'redux/middleware/clientMiddleware';
// import random from 'lodash/random';

@asyncConnect([{
  promise: () => Promise.all([]) // Without this line, server-side rendering breaks!?
}])
@connect(
  (state) => ({
    isGlobalLoading: isGlobalLoading(state)
  }),
  {
    // logout,
    pushState: push
  }
)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    // user: PropTypes.object,
    // logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    location: PropTypes.object,
    route: PropTypes.object,
    isGlobalLoading: PropTypes.bool,
    params: PropTypes.object,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { location: { pathname: path },
      params: { setId } } = this.props;

    const styles = require('./App.scss');
    const { isGlobalLoading: isLoading } = this.props;

    return (
      <div className={styles.app}>
        <ProgressBar
          percent={isLoading ? 0 : 100}
          autoIncrement
          intervalTime={500}
          spinner={false} />

        <Helmet {...config.app}/>
        <div className={styles.appContent}>
          {/* Header is not available on Home page */}
          { path !== '/' && <Header setId={setId} />}
          { path !== '/' && <SubHeader setId={setId} />}
          {this.props.children}
        </div>

        {/* <Footer/> */}
      </div>
    );
  }
}
