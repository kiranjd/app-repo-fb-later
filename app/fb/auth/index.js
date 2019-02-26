import firebase from 'react-native-firebase';
import Auth from '../config/auth';

const fbLoginPermissions = ['email'];

export const handleFbLogin = () => (
  Auth.Facebook.login(fbLoginPermissions)
    .then((token) => {
      console.log(token);
      firebase.auth()
        .signInWithCredential(firebase.auth.FacebookAuthProvider.credential(token));
    })
    .catch((err) => console.log(err))
);