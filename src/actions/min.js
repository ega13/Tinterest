import firebase from '../firebase';



export const FETCHING_MINS = 'FETCHING_MINS';
export const STORE_DASHBOARD_MINS = 'STORE_DASHBOARD_MINS';
export const STORE_PUBLIC_MINS = 'STORE_PUBLIC_MINS';

export function fetchPublicMins() {
  return function(dispatch) {
    dispatch(fetchingMins(true));

    firebase.database().ref(`/minterest/public/mins`).on('value', (snapshot) => {
      dispatch(storePublicMins(snapshot.val()));
      dispatch(fetchingMins(false));
    }, (error) => {
      dispatch(fetchingMins(false));
      console.log('Error occured when dispatching dashboard min listener.')
    });
  }
}

export function fetchDashboardMins(uid) {
  return function(dispatch) {
    dispatch(fetchingMins(true));

    firebase.database().ref(`/minterest/users/${uid}/mins`).on('value', (snapshot) => {
      dispatch(storeDashboardMins(snapshot.val()));
      dispatch(fetchingMins(false));
    }, (error) => {
      dispatch(fetchingMins(false));
      console.log('Error occured when dispatching dashboard min listener.')
    });
  }
}

export function addMin(user, min) {
  return function(dispatch) {
    const key = firebase.database().ref(`/minterest/users/${user.uid}/mins`).push().getKey();
    const newData = Object.assign({}, min, {
      author: user.displayName,
      uid: user.uid,
      mid: key,
      likes: 0,
      views: 0
    });

    firebase.database().ref().update({
      [`/minterest/users/${user.uid}/mins/${key}`]: newData,
      [`/minterest/public/mins/${key + user.uid}`]: newData
    })
      .catch((error) => 'Error occured when creating a new min.')
  }
}

export function deleteMin(min) {
  return function(dispatch) {
    firebase.database().ref().update({
      [`/minterest/users/${min.uid}/mins/${min.key}`]: null,
      [`/minterest/public/mins/${min.mid + min.uid}`]: null
    })
      .catch((error) => console.log('Error occured when attempting to delete a Min.', error))
  }
}

export function likeMin(user, min) {
  return function(dispatch) {
    let like = null;
    // Additional check
    if (!min.liked) {
      like = true;
    }
    else if (Object.keys(min.liked).indexOf(user.uid) < 0) {
      like = true;
    }

    firebase.database().ref().update({
      [`/minterest/public/mins/${min.key}/liked/${user.uid}`]: like,
      [`/minterest/users/${min.uid}/mins/${min.mid}/liked/${user.uid}`]: like
    })
      .catch((error) => console.log('Error occured while submitting a like.', error));
  }
}

export function fetchingMins(fetchingMins) {
  return {
    type: FETCHING_MINS,
    payload: {
      fetchingMins
    }
  }
}

export function storeDashboardMins(dashboardMins) {
  return {
    type: STORE_DASHBOARD_MINS,
    payload: {
      dashboardMins
    }
  }
}

export function storePublicMins(publicMins) {
  return {
    type: STORE_PUBLIC_MINS,
    payload: {
      publicMins
    }
  }
}
