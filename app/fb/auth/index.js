import firebase from 'react-native-firebase';
import Auth from '../config/auth';

const fbLoginPermissions = ['email'];

export function handleFbLogin() {
  Auth.Facebook.login(['email'])
    .then((token) => {
      console.log(token);
      firebase.auth()
        .signInWithCredential(firebase.auth.FacebookAuthProvider.credential(token))
        .then(user => {
          if(user.additionalUserInfo.isNewUser){
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
          }
        })
        .catch((err) => {
          if(err.code === 'auth/account-exists-with-different-credential') {
      alert("An account is already in use with the email id. Use the same social login");
          }
        })
    })
    .catch((err) => {
      console.log(err.code);   
    })
};
