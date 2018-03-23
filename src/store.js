import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';
import { authListener, authProviderRedirectListener } from './actions/auth';



const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

store.dispatch(authListener());
store.dispatch(authProviderRedirectListener());

export default store;
