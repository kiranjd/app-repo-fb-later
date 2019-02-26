
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


import Loginform from './Loginform';

export default class Login extends Component {

  componentDidMount() {
      SplashScreen.hide();
  }
  
  static navigationOptions = {
    header: null
  } 
  render() {
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