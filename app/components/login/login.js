import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/FontAwesome';
import { handleFbLogin, emailRed } from '../../fb/auth';
import { hangleGoogleLogIn } from '../../google/google';
import firebase from 'react-native-firebase';
import { Overlay } from 'react-native-elements';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      email: '',
      password: '',
      overlay: false,
    };
  }

  componentWillMount() {
    SplashScreen.hide();

    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.toJSON() });
      } else {
        this.setState({
          user: null,
        });
        this.props.navigation.navigate('Login');
      }
    });
  }

  handleSignUp = () => {
    const { email, password } = this.state;
    let validInputs = true;
    if (email == '') {
      Alert.alert('Enter email');
      validInputs = false;
    }

    if (password == '') {
      validInputs = false;
    }

    if (validInputs) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => Alert.alert('Your account has been created successfully.'))
        .catch(error => {
          console.log(error);
          firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch(error => this.setState({ errorMessage: error.message }))
        })
    }
  }

  gmailPress() {
    hangleGoogleLogIn();
    this.setState({ overlay: true });
  }

  fbPress() {
    handleFbLogin();
    this.setState({ overlay: true })
  }

  static navigationOptions = {
    header: null
  }
  render() {
    if (this.state.user) {
      this.props.navigation.navigate('Home');
    }
    return (
      <ImageBackground source={require('../Images/background.png')} style={styles.backgroundContainer}>
        
        {/* loagging in indicator */}
        <Overlay
          isVisible={this.state.overlay}
          height={hp('20%')}
          width={wp('60%')}
          borderRadius={10}

        >
          <View style={{ margin: 10 }}>
            <Text onPress={() => this.setState({ overlay: false })} style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Please wait. Logging in...</Text>
            <ActivityIndicator size="large" color="#3358ff" />
          </View>
        </Overlay>

        <Text style={{ marginTop: hp('37%'), fontSize: 35, color: '#AE1EF2', marginLeft: wp('63%') }}>
          Login
        </Text>

        {/* enter email and password  */}
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('4%'), marginRight: wp('5%') }}>
          <View style={{
             width: wp('75%'),
             flexDirection: 'row',
             borderRadius: 100,
             justifyContent: 'center',
             alignItems: 'center',
             backgroundColor: 'white',
             marginTop: 20,
             paddingBottom: 10,
             paddingTop: 0,
             borderRadius: 100,
             borderWidth: 1,
             borderColor: '#AE1EF2',
          }}>
            <View style={{ marginRight: 27, marginTop: 10 }}>
              <Icon
                name='user'
                size={24}
                color='#AE1EF2'
              />
            </View>
            <View style={{
              height: hp('5%'),
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 5,
            }}>

              <TextField
                label='Email'
                animationDuration={255}
                containerStyle={{ width: wp('60%') }}
                lineWidth={0}
                activeLineWidth={0}
                maxLength={30}
                onChangeText={value => this.setState({ email: value })}
              />
            </View>
          </View>

          <View style={{
            width: wp('75%'),
            flexDirection: 'row',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            marginTop: 20,
            paddingBottom: 10,
            paddingTop: 0,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: '#AE1EF2',
          }}
          >
            <View style={{ marginRight: 20, marginTop: 10 }}>
              <Icon
                name='key'
                size={24}
                color='#AE1EF2'
              />
            </View>
            <View style={{ 
              height: hp('5%'), 
              justifyContent: 'center', 
              alignItems: 'center', 
              marginBottom: 5 
              }}>
              <TextField
                label='Password'
                animationDuration={255}
                containerStyle={{ width: wp('60%') }}
                secureTextEntry={true}
                lineWidth={0}
                activeLineWidth={0}
                maxLength={16}
                onChangeText={value => this.setState({ password: value })}
              />
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>

          <TouchableOpacity onPress={this.handleSignUp}>
            <Text
              style={{
                fontSize: 15,
                width: wp('40%'),
                height: 40,
                color: 'white',
                textAlign: 'center',
                backgroundColor: '#AE1EF2',
                borderBottomRightRadius: 20,
                borderTopRightRadius: 20,
                padding: '2%',
                marginTop: hp('2%')
              }}
            >Login</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={{ fontSize: 15, color: 'black', marginLeft: wp('25%'), marginTop: hp('3%') }}>
              Forgot Password?
        </Text>
          </TouchableOpacity>
        </View>

        {/* social login bottons */}
        <View
          style={{
            backgroundColor: '#fff',
            width: wp('60%'),
            height: hp('9%'),
            marginVertical: hp('3%'),
            borderBottomLeftRadius: 50,
            borderTopLeftRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginLeft: wp('40%'),
            backgroundColor: '#AE1EF2',
          }}
        >
          <TouchableOpacity onPress={() => this.fbPress()}>
            <Image
              style={{ width: 50, height: 50, justifyContent: 'center', margin: wp('1%') }}
              source={require('../Images/facebook.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>
            this.gmailPress()
          }>
            <Image
              style={{ width: 50, height: 50, justifyContent: 'center', margin: 5 }}
              source={require('../Images/google-plus.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={{ width: 50, height: 50, justifyContent: 'center', margin: 5 }}
              source={require('../Images/linkedin.png')}
            />
          </TouchableOpacity>

        </View>

        {/* signup page - mobile */}
        <TouchableOpacity style={{ 
            marginBottom: hp('5%'), 
           }} 
          onPress={() => {
          this.unsubscribe();
          this.props.navigation.navigate('SendOTPScreen');
        }}>
          <Text style={{ fontSize: 15, color: 'black', textAlign: 'center'}}>
            New user?
          <Text style={{ fontSize: 15, color: '#ae1ef2', textAlign: 'center' }}> Sign up</Text>
          </Text>
        </TouchableOpacity>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
  },

});