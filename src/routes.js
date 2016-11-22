import React from 'react';
import {
  withRouter,
  IndexRoute,
  Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    About,
    NotFound,
    Home,
    LoginSuccess,
    Sets,
    Terms,
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { data }} = store.getState();
      if (!data) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth())
        .then(checkAuth)
        .catch(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/loginQuizletSuccess" component={LoginSuccess}/>
      <Route path="/sets" component={Sets} onEnter={requireLogin}/>
      <Route path="/sets/:setId" component={withRouter(Terms)} onEnter={requireLogin}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
