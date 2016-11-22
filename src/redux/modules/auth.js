import config from 'config';

const LOAD = 'speed-vocab/auth/LOAD';
const LOAD_SUCCESS = 'speed-vocab/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'speed-vocab/auth/LOAD_FAIL';
const LOGOUT = 'speed-vocab/auth/LOGOUT';
const LOGOUT_SUCCESS = 'speed-vocab/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'speed-vocab/auth/LOGOUT_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load(code) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/loadAuth', { data: { code }})
      .then((res) => {
        const accessToken = res.access_token;
        window.localStorage.setItem('accessToken', accessToken);
      })
  };
}

// export function loginSuccess(token) {
//   window.localStorage.setItem('quizletToken', token);
//   return {
//     type: LOGIN_SUCCESS
//   };
// }

/* This is not a Redux action */
export function quizletAuthorize() {
  const redirectUri = config.auth.quizlet.redirectUri;
  const scope = ['read', 'write_set', 'write_group'].join(' ');
  const clientId = config.auth.quizlet.clientId;
  window.location.href = `https://quizlet.com/authorize?scope=${scope}&client_id=${clientId}&response_type=code&state=authenticated&redirect_uri=${redirectUri}`;
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
}
