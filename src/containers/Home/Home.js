import React, { Component, PropTypes } from 'react';
import {quizletAuthorize} from 'redux/modules/auth';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import c from 'classnames';
// import {
//   Pagination,
// } from 'components';

// @connect()
export default class Home extends Component {
  static propTypes = {
  };

  render() {
    const styles = require('./Home.scss');

    return (
      <div className={`${styles.home}`}>
        <div className={`${styles.masthead}`}>
          <h1>SpeedVocab</h1>

          <Button
            onClick={quizletAuthorize}
            bsStyle="info"
            className={c(styles.quizletLoginBtn)}>
            <img src={require('./Quizlet.png')} alt=""/>
            <h4>Login with Quizlet</h4>
          </Button>
        </div>

      </div>
    );
  }
}
