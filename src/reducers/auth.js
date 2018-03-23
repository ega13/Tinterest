import {
  STORE_AUTHED_USER,
  AUTH_IN_PROGRESS
} from '../actions/auth';



const initialState = {
  inProgress: true,
  user: null
};

export default function auth(state = initialState, action) {
  switch(action.type) {
    case AUTH_IN_PROGRESS:
      return Object.assign({}, state, {
        inProgress: action.payload.inProgress
      });

    case STORE_AUTHED_USER:
      return Object.assign({}, state, {
        user: action.payload.user
      });

    default:
      return state;
  }
}
