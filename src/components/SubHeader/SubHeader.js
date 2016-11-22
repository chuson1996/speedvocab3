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
class SubHeader extends Component {
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
    const styles = require('./SubHeader.scss');
    const { path, setTitle } = this.props;
    let headerTitle = '';
    let backable = false;
    let backLabel = '';

    if (path === '/sets') {
      backable = false;
      headerTitle = 'Sets';
    } else if (/^\/sets\/\d{1,}$/.test(path)) {
      headerTitle = setTitle;
      backLabel = 'Sets';
      backable = true;
    }


    return backable ? (
      <Navbar className={c(styles.subHeader, 'hidden-xs')}>
        <a
          onClick={this.back}
          className={c(styles.backBtn)}>
          <h1>
            <i className={c('material-icons')}>keyboard_arrow_left</i>
            { backLabel }
          </h1>
        </a>
        <h1 className="inline-block">{headerTitle}</h1>
      </Navbar>
    ) : null;
  }
}

export default withRouter(SubHeader);
