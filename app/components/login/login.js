import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ImageBackground, 
  TouchableOpacity,
  Alert
 } from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/FontAwesome';
import { handleFbLogin } from '../../fb/auth';
import { hangleGoogleLogIn } from '../../google/google';
import firebase from 'react-native-firebase';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  handleSignUp = () => {
    const {email, password} = this.state;
    var validInputs = true;
    if(email == '') {
      Alert.alert('Enter email');
      validInputs = false;
    }  

    if(password == '') {
      validInputs = false;
    }

    if(validInputs) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
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

  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <ImageBackground source={require('../Images/background.png')} style={styles.backgroundContainer}>
        {/* <View style={{flex: 1, backgroundColor: 'black', flexDirection: 'row'}}>
          <View style={{backgroundColor: 'black', height: hp('40%'), width: wp('8%'), margin: 5, borderBottomLeftRadius: 50, borderBottomRightRadius: 50}}>
          </View>
          <View style={{backgroundColor: 'black', height: hp('5%'), width: wp('2%'), margin: 5}}>
          </View>
        </View> */}
        <Text style={{marginTop: hp('36%'),fontSize:35,color:'#AE1EF2',marginLeft:wp('63%')}}>
          Login
        </Text>
        <View style={{ justifyContent:'center', alignItems: 'center', marginTop: hp('8%'), }}>
          <View style={{ 
                    width: wp('90%'), 
                    flexDirection: 'row', 
                    borderRadius: 100, 
                    borderWidth: 1,
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    backgroundColor: 'white', 
                    paddingBottom: 10, 
                    paddingTop: 0,
                    borderColor: '#AE1EF2' 
                    }}>
            <View style={{ marginRight: 20, marginTop: 10 }}>
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
                containerStyle={{ width: wp('70%') }}
                lineWidth={0}
                activeLineWidth={0}
                maxLength={30}
                onChangeText={value => this.setState({email: value})}
              />
            </View>
          </View>

          <View style={{ 
                  width: wp('90%'), 
                  flexDirection: 'row', 
                  borderRadius: 100, 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  backgroundColor: 'white',
                  marginTop:20, 
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
            <View style={{ height: hp('5%'), justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
              <TextField
                label='Password'
                animationDuration={255}
                containerStyle={{ width: wp('70%') }}
                secureTextEntry={true}
                lineWidth={0}
                activeLineWidth={0}
                maxLength={12}
                onChangeText={value => this.setState({password: value})}
              />
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={this.handleSignUp}>
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
              padding:'2%',
              marginTop: hp('2%')
            }}
            >Login</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <Text style={{fontSize:15, color:'black', marginLeft: wp('25%'), marginTop: hp('3%')}}>
          Forgot Password?
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
        <TouchableOpacity style={{marginBottom: hp('5%')}} onPress={() => this.props.navigation.navigate('SendOTPScreen')}>
        <Text style={{fontSize:15, color:'black',alignContent:'center',marginHorizontal:100}}>
          Create new account? 
          <Text style={{fontSize:15, color:'#ae1ef2'}}> Sign up</Text>
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