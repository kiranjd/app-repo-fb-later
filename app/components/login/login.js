
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import firebase from 'react-native-firebase';


import Loginform from './Loginform';
import Home from '../../home/home';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    SplashScreen.hide();
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.setState({ user: user.toJSON() });
            console.log(user);
        } else {
            // User has been signed out, reset the state
            this.setState({
                user: null,
            });
        }
    });
}

componentWillUnmount() {
  if (this.unsubscribe) this.unsubscribe();
}
  static navigationOptions = {
    header: null
  } 

  login() {
    return (
      <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          style={styles.logo} 
          source={require('../Images/Logo.png')}
         />
      </View>
      <Loginform navigation={this.props.navigation}/>
    </View>
    );
  }

  home() {
    this.props.navigation.navigate('Home', {user: 'test'})
    return (
      null
    );    
  }
  render() {
    const {user} = this.state;
    return (
      //!user? this.login() : this.home()
      this.login()
    );
  }
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: '#fff'
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: hp('6%')
  },

  logo: {
    width: wp('60%'),
    height: hp('35%')
  },

  title: {
    color : '#FF9800',
    marginTop: 10,
    width: 200,
    textAlign: 'center',
    opacity: 0.9,
    fontSize: 50,
    fontWeight: 'bold',
  },

  Loginform: {
    justifyContent: 'center'
  }
});