
import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Dimensions, 
  Image, 
  ImageBackground, 
  TouchableOpacity
 } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Loginform from './Loginform';
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/FontAwesome';
import { handleFbLogin } from '../../fb/auth';
import { hangleGoogleLogIn } from '../../google/google';

import bgImage from '../Images/background.jpg'
import logo from '../Images/Logo.png'
import { TextInput } from 'react-native-gesture-handler';

const { width: WIDTH } = Dimensions.get('window')


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

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
        <Text style={{marginTop:'65%',fontSize:35,color:'#AE1EF2',marginLeft:270}}>
          Login
        </Text>
        <View style={{ justifyContent:'center', alignItems: 'center', marginTop: '20%', }}>
          <View style={{ width: wp('90%'), flexDirection: 'row', borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', paddingBottom: 10, paddingTop: 0 }}>
            <View style={{ marginRight: 20, marginTop: 10 }}>
              <Icon
                name='user'
                size={24}
                color='#AE1EF2'
              />
            </View>
            <View style={{ height: hp('5%'), justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
              <TextField
                label='User name'
                animationDuration={255}
                containerStyle={{ width: wp('70%') }}
              />
            </View>
          </View>

          <View style={{ width: wp('90%'), flexDirection: 'row', borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white',marginTop:20, paddingBottom: 10, paddingTop: 0 }}>
            <View style={{ marginRight: 20, marginTop: 10 }}>
              <Icon
                name='key'
                size={24}
                color='#AE1EF2'
              />
            </View>
            <View style={{ height: hp('5%'), justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
              <TextField
                label='Password'
                animationDuration={500}
                containerStyle={{ width: wp('70%') }}
                secureTextEntry={true}
              />
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
        <TouchableOpacity>
          <Text 
            style={{
              fontSize:15, 
              width: wp('40%'), 
              height: 40, 
              color:'white', 
              textAlign:'center', 
              backgroundColor:'#AE1EF2', 
              borderBottomRightRadius:20, 
              borderTopRightRadius:20, 
              padding:'2%'}}
            >Login</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <Text style={{fontSize:15, color:'white', marginHorizontal: 100, marginTop: 10}}>
          Forget Password?
        </Text>
        </TouchableOpacity>
        </View>

          <View 
            style={{
              backgroundColor: '#fff', 
              width: wp('60%'), 
              height: hp('9%'), 
              marginVertical: hp('3%'),
              borderBottomLeftRadius:50, 
              borderTopLeftRadius:50,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginLeft: wp('40%'),
              backgroundColor:'#AE1EF2', 
              // paddingBottom: hp('0.5%'),
              // paddingLeft: wp('2%'),
            }}
            >
             <TouchableOpacity onPress={handleFbLogin}>
                    <Image
                        style={{width: 50, height: 50, justifyContent: 'center', margin: wp('1%')}}
                        source={require('../Images/facebook.png')}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={hangleGoogleLogIn}>
                    <Image
                        style={{width: 50, height: 50, justifyContent: 'center', margin: 5}}
                        source={require('../Images/google-plus.png')}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Image
                        style={{width: 50, height: 50, justifyContent: 'center', margin: 5}}
                        source={require('../Images/linkedin.png')}
                    />
                    </TouchableOpacity>

          </View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SendOTPScreen')}>
        <Text style={{fontSize:15, color:'white',alignContent:'center',marginHorizontal:100}}>
          Create New Account? 
          <Text style={{fontSize:15, color:'#AE1EF2'}}>SignUp</Text>
        </Text>
        </TouchableOpacity>

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
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    // alignItems: 'center',
  },




});