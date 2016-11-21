import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

// import auth from './auth';
import {reducer as form} from 'redux-form';
import {reducer as requests} from '../middleware/clientMiddleware';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  // auth,
  requests,
  form,
});
