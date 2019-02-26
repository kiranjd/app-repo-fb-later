import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';

export const hangleGoogleLogIn = () => {
  GoogleSignin.configure({
    webClientId: '819855999384-1fntb68vma45dl14icjtva3u23e6q91g.apps.googleusercontent.com',
    iosClientId: '',
    //offlineAccess: true,
    //forceConsentPrompt: true,
})
  GoogleSignin.signIn()
    .then((data) => {
      // Create a new Firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
      // Login with the credential
      return firebase.auth().signInWithCredential(credential);
    })
    .then((user) => {
        console.log(user);
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the
      // `onAuthStateChanged` listener we set up in App.js earlier
    })
    .catch((error) => {
      const { code, message } = error;
      console.log(message);
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
}