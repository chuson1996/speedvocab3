const LOAD = 'speed-vocab/sets/LOAD';
const LOAD_SUCCESS = 'speed-vocab/sets/LOAD_SUCCESS';
const LOAD_FAIL = 'speed-vocab/sets/LOAD_FAIL';

const initialState = {
  data: [],
  loaded: false,
  loading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        data: action.result,
        loaded: true,
        loading: false
      };
    case LOAD_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.sets.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadSets')
  };
}
