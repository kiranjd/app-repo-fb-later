
import React, { Component } from 'react';
import { StyleSheet, Text, View,Dimensions, Image,ImageBackground, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Loginform from './Loginform';

import bgImage from '../Images/background.jpg'
import logo from '../Images/Logo.png'
import { TextInput } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

const { width: WIDTH } = Dimensions.get('window')

export default class Login extends Component {

  componentDidMount() {
      SplashScreen.hide();
  }
  
  static navigationOptions = {
    header: null
  } 
  render() {
    return (
      // <View style={styles.container}>
      //   <View style={styles.logoContainer}>
      //     <Image 
      //       style={styles.logo} 
      //       source={require('../Images/Logo.png')}
      //      />
      //   </View>
      //   <Loginform navigation={this.props.navigation}/>
      // </View>
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        {/* <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.logoText}>VJVk</Text>
        </View> */}

        <View style={styles.inputContainer}>
        {/* <Icon name='User' size={28} color={'rgba(255,255,255,0.7)'}
        style={styles.inputIcon}/> */}
          <TextInput
            style={styles.input}
            placeholder={'Username'}
            placeholderTextColor={'rgba(255,255,255,0.7'}
          />
        </View>

        <View style={styles.inputContainer}>
        {/* <Icon name={'ios-Lock-outLine'} size={28} color={'rgba(255,255,255,0.7)'}
        style={styles.inputIcon}/> */}
          <TextInput
            style={styles.input}
            placeholder={'Password'}
            secureTextEntry={true}
            placeholderTextColor={'rgba(255,255,255,0.7'}
          />
        </View>
        

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //    flex: 1,
  //    backgroundColor: '#fff'
  // },

  // logoContainer: {
  //   alignItems: 'center',
  //   marginTop: hp('6%')
  // },

  // logo: {
  //   width: wp('60%'),
  //   height: hp('35%')
  // },

  // title: {
  //   color : '#FF9800',
  //   marginTop: 10,
  //   width: 200,
  //   textAlign: 'center',
  //   opacity: 0.9,
  //   fontSize: 50,
  //   fontWeight: 'bold',
  // },

  // Loginform: {
  //   justifyContent: 'center'
  // }

  backgroundContainer: {
    flex:1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50
  },
  logo: {
    width: 120,
    height: 120
  },
  logoText: {
    color : 'red',
    fontSize: 20,
    fontWeight: '500',
    marginTop:10,
    opacity: 0.5
  },
  inputContainer: {
    marginTop: 10
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'white',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 25
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37 
  }

});