import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import get from 'lodash/get';
import { load } from 'redux/modules/auth';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

@connect(null, { load, push })
class LoginSuccess extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { location } = this.props;
    const code = get(location, 'query.code');
    if (code) {
      this.props.load(code)
        .then(() => {
          this.props.push('/sets');
        });
    }
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default withRouter(LoginSuccess);
