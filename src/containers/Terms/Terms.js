import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { load as _loadTerms } from 'redux/modules/terms';
import c from 'classnames';
import get from 'lodash/get';
import Markdown from 'react-markdown';
import { asyncConnect } from 'redux-async-connect';
import { isLoaded as areSetsLoaded, load as loadSets } from 'redux/modules/sets';
import first from 'lodash/first';
import last from 'lodash/last';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!areSetsLoaded(getState())) {
      promises.push(dispatch(loadSets()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  (state, ownProps) => ({
    terms: state.terms.data,
    loading: state.terms.loading,
    loaded: state.terms.loaded,
    setId: ownProps.params.setId,
  }),
  {
    loadTerms: _loadTerms,
  }
)
export default class Terms extends Component {
  static propTypes = {
    terms: PropTypes.array,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    setId: PropTypes.string,
    loadTerms: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { loadTerms, setId } = this.props;
    loadTerms(setId);
  }

  render() {
    const styles = require('./Terms.scss');
    const { terms, loaded } = this.props;

    const format = (text) => {
      // console.log(text.match(/\n\(/i));
      let lines = text.split(/\n/);
      lines = lines.map((line) => {
        if (first(line) === '(' && last(line) === ')') {
          return line.slice(1, line.length - 1);
        }
        return line;
      });

      return lines.join('\n');
    };

    return (
      <div className={c(styles.terms)}>
        { loaded && terms.map((item, id) =>
          <div key={id} className={c(styles.term)}>
            <h2 className={styles.word}>{item.term}</h2>
            <Markdown source={format(item.definition)} />
            <img className={styles.image} src={get(item, 'image.url')}/>
          </div>
        )}
      </div>
    );
  }
}
