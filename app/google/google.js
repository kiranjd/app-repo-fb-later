import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import { Alert } from 'react-native';

export const hangleGoogleLogIn = () => {
  GoogleSignin.configure({
    webClientId: '819855999384-l6r65jt5s62u68d8r850j04ahi03icec.apps.googleusercontent.com',
    iosClientId: '',
    //offlineAccess: true,
    //forceConsentPrompt: true,
})
  GoogleSignin.signIn()
    .then((data) => {
      // Create a new Firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
      // Login with the credential
      firebase.auth()
        .signInWithCredential(credential)
        .then(user => {
          //let userJson = user.toJSON();
          //debugger;
         if(user.additionalUserInfo.isNewUser){
          fetch('http://139.59.69.143/api/postUserData.php', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "name": user.user.displayName,
                "uuid": user.user.uid,
                "mobile": user.user.phoneNumber,
                "email": user.user.email,
              }),
            });
            alert('api');
            Alert.alert(
              'Add Mobile Number',
              'Link your mobile number from side menu',
              [
                {text: 'OK'},
              ],
              {cancelable: false},
            );
          } else {
            console.log('old user');
          }
        })
        .catch((err) => {
          if(err.code === 'auth/account-exists-with-different-credential') {
      alert("An account is already in use with the email id. Use the same social login");
          }
        })
    })
    .catch((error) => {
      const { code, message } = error;
      console.log(error);
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
}