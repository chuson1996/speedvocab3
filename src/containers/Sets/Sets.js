import React, { Component, PropTypes } from 'react';
import { load as loadSets } from 'redux/modules/sets';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { push } from 'react-router-redux';
import c from 'classnames';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    promises.push(dispatch(loadSets()));

    return Promise.all(promises);
  }
}])
@connect(
  (state) => ({
    sets: state.sets.data,
    loading: state.sets.loading,
    loaded: state.sets.loaded,
  }),
  {
    push
  }
)
export default class Sets extends Component {
  static propTypes = {
    sets: PropTypes.array,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    push: PropTypes.func.isRequired,
  };

  render() {
    const styles = require('./Sets.scss');
    const { sets, loading, loaded } = this.props;

    return (
      <div className="container">
        <div className={c(styles.sets)}>
          <h1 className={c('hidden-xs', 'text-center', styles.setTitle)}>Your sets</h1>
          { loaded && sets.map((set, i) =>
            <div
              key={i}
              className={styles.set}
              onClick={() => this.props.push(`/sets/${set.id}`)}>
              <h2>{set.title}</h2>
            </div>
          )}
        </div>
      </div>
    );
  }
}
