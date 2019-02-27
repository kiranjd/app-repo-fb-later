import React, { Component } from 'react';
import { Alert, StyleSheet, StatusBar, TextInput, Text, View, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';

import stylesMain from '../../MainStyles';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { handleFbLogin } from '../../fb/auth';
import { hangleGoogleLogIn } from '../../google/google';

export default class Loginform extends Component {
    constructor(props) {
        super(props);
        this.nav = props.navigateProp;
    }

    
  render() {
    return (
        <KeyboardAvoidingView behavior="position" enabled>
        <View style={styles.container}>
            <StatusBar 
                barStyle="light-content"
            />
            <TextInput 
                placeholder="Userame" 
                placeholderTextColor="#fff"
                underlineColorAndroid="white"
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                autoCapitalize="none"
                autoCorrect={false}
                style={[styles.input, styles.topMarginContainer]}
            />
            <TextInput 
                placeholder="Password" 
                placeholderTextColor="#fff"
                underlineColorAndroid="white"
                style={styles.input}
                returnKeyType="go"
                secureTextEntry
                ref={(input) => this.passwordInput = input}
            />

            <TouchableOpacity style={styles.buttonContainer}>
                <Text 
                    style={styles.buttonText} 
                    onPress={() => this.props.navigation.navigate('Home')}
                >LOGIN</Text>
            </TouchableOpacity>

            <View style={styles.loginViaContainer}>
                <Text style={styles.loginViaText}>Or Login through</Text>
                <View style={{flexDirection: 'row'}}>
                {/* <TouchableOpacity onPress={handleFbLogin}> */}
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
            </View>
            
            <View style={styles.signupContainer}>
                <TouchableOpacity  onPress={() => this.props.navigation.navigate('SendOTPScreen')}>
                    <Text 
                        style={styles.signupText}
                    >Click here to <Text style={{fontWeight: '900'}}>sign up</Text></Text>
                </TouchableOpacity>
            </View>
        </View>
        </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3358ff',
        marginTop: hp('7.5%'),
        padding: wp('3%'),
        justifyContent: 'center',
    },

    topMarginContainer: {
        marginTop: hp('4%'),
    },

    input: {
        height: hp('5%'),
        marginBottom: hp('2%'),
        marginHorizontal: wp('8%'),
        borderBottomColor: '#fff'
    },

    buttonContainer: {
        backgroundColor: '#fff',
        paddingVertical: hp('1%'),
        marginHorizontal: wp('8%'), 
    },

    buttonText: {
        textAlign: 'center',
        color: '#3358ff',
        fontWeight: '900',
        fontSize: wp('5%'),
    },

    signupContainer: {
        // marginTop: 20,
    },

    signupText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: wp('4%')
    },

    loginViaText: {
        textAlign: 'center', 
        color: '#fff',
        fontSize: wp('4%'),
    },

    loginViaContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp('3%'),
        paddingBottom: hp('3%'),
        paddingTop: hp('2.5%')
    }
});
