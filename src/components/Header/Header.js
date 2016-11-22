import React, { Component, PropTypes } from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import { withRouter } from 'react-router';
// import Nav from 'react-bootstrap/lib/Nav';
// import NavItem from 'react-bootstrap/lib/NavItem';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import c from 'classnames';
import find from 'lodash/find';
import get from 'lodash/get';
// import {IndexLinkContainer} from 'react-router-bootstrap';

@connect(
  (state, ownProps) => ({
    path: state.routing.locationBeforeTransitions.pathname,
    setTitle: get(find(state.sets.data, { id: parseInt(ownProps.setId, 10) }), 'title')
  }),
  { push }
)
class Header extends Component {
  static propTypes = {
    path: PropTypes.string,
    setTitle: PropTypes.string,
    push: PropTypes.func.isRequired,
  };

  back = () => {
    const { path } = this.props;
    if (/^\/sets\/.{1,}$/.test(path)) {
      this.props.push('/sets');
    }
  };

  render() {
    const styles = require('./Header.scss');
    const { path, setTitle } = this.props;
    let headerTitle = '';
    let backable = true;

    if (path === '/sets') {
      backable = false;
      headerTitle = 'Sets';
    } else if (/^\/sets\/.{1,}$/.test(path)) {
      headerTitle = setTitle;
    }


    return (
      <Navbar fixedTop inverse className={styles.header}>
        <Navbar.Header className={c('hidden-xs')}>
          <Navbar.Brand>
            <a href="#"><h1><strong>SpeedVocab</strong></h1></a>
          </Navbar.Brand>
        </Navbar.Header>
        <a
          onClick={this.back}
          className={c(styles.backBtn, { 'hide': !backable })}>
          <h3><i className={c('material-icons')}>keyboard_arrow_left</i></h3>
        </a>
        <h3 className="inline-block">{headerTitle}</h3>
      </Navbar>
    );
  }
}

export default withRouter(Header);
