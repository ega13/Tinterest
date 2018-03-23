import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBN0xWU16Q4WqbRZpt7ypNBhWHWjeqyjAA",
  authDomain: "fcc-certificates.firebaseapp.com",
  databaseURL: "https://fcc-certificates.firebaseio.com",
  projectId: "fcc-certificates",
};

export const authProviderTwitter = new firebase.auth.TwitterAuthProvider();

export default firebase.initializeApp(config);
