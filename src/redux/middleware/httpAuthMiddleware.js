import { push } from 'react-router-redux';
import get from 'lodash/get';

export default function httpAuthMiddleware() {
  return ({ dispatch, getState }) => {
    return (next) => (action) => {
      const status = get(action, 'error.status');
      if (status === 401) {
        console.log('Status is 401');
        dispatch(push('/'));
        console.log(getState());
      }

      next(action);
    };
  };
}
