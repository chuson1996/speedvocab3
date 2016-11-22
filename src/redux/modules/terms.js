const LOAD = 'speed-vocab/terms/LOAD';
const LOAD_SUCCESS = 'speed-vocab/terms/LOAD_SUCCESS';
const LOAD_FAIL = 'speed-vocab/terms/LOAD_FAIL';

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

export function load(setId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/loadTerms?setId=${setId}`)
  };
}
