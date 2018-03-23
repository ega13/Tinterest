import firebase, { authProviderTwitter } from '../firebase';
import { LOCALSTORAGEKEY } from '../common';

import { fetchDashboardMins, fetchPublicMins } from './min';



const localStorage = window.localStorage;

export const STORE_AUTHED_USER = 'STORE_AUTHED_USER';
export const AUTH_IN_PROGRESS = 'AUTH_IN_PROGRESS';

export function authListener() {
  return function(dispatch) {
    dispatch(authInProgress(true));

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(storeAuthedUser(user));

        localStorage.setItem(LOCALSTORAGEKEY, JSON.stringify({
          user: {
            uid: user.uid,
            displayName: user.displayName
          }
        }));

        dispatch(fetchDashboardMins(user.uid));
        dispatch(fetchPublicMins());
      }
      else {
        dispatch(storeAuthedUser(null));

        localStorage.removeItem(LOCALSTORAGEKEY);
      }

      dispatch(authInProgress(false));
    });
  }
}

export function authProviderRedirectListener() {
  return function(dispatch) {
    dispatch(authInProgress(true));

    firebase.auth().getRedirectResult()
      .then((result) => {
        dispatch(authInProgress(false));
      })
      .catch((error) => {
        dispatch(authInProgress(false));
        console.log('Error occured after attempting to sign in with provider.');
      });
  }
}

export function signInWithTwitter() {
  return function(dispatch) {
    dispatch(authInProgress(true));

    firebase.auth().signInWithRedirect(authProviderTwitter);
  }
}

export function signOut() {
  return function(dispatch) {
    firebase.auth().signOut()
      .catch((error) => console.log('Error occured when signing out.  (╯°□°）╯︵ ┻━┻'));
  }
}

export function storeAuthedUser(user) {
  return {
    type: STORE_AUTHED_USER,
    payload: {
      user
    }
  }
}

export function authInProgress(inProgress) {
  return {
    type: AUTH_IN_PROGRESS,
    payload: {
      inProgress
    }
  }
}
