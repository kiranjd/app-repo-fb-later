import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import firebase from 'react-native-firebase';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Overlay } from 'react-native-elements';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.state = {
            user: null,
            message: '',
            codeInput: '',
            phoneNumber: '+91',
            confirmResult: null,
            codeSent: false,
            verified: false,
            autoVerify: false,
            blur: 0,
        };
    }

    componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user.toJSON() });
            } else {
                // User has been signed out, reset the state
                this.setState({
                    user: null,
                    message: '',
                    codeInput: '',
                    phoneNumber: '+91',
                    confirmResult: null,
                });
            }
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }


    phoneAuth = () => {
        const { phoneNumber } = this.state;
        console.log(phoneNumber);
        firebase.auth()
            .verifyPhoneNumber(phoneNumber)
            //7353831649
            .on('state_changed', (phoneAuthSnapshot) => {
                switch (phoneAuthSnapshot.state) {
                    case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT:
                        firebase.auth().signInWithPhoneNumber(phoneNumber)
                            .then(confirmResult => {
                                this.setState({ confirmResult });
                                console.log(this.state.confirmResult);
                            })
                            .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
                    case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
                        this.setState({ codeSent: true });
                        console.log('code sent');
                        break;
                    case firebase.auth.PhoneAuthState.AUTO_VERIFIED:
                        this.setState({ autoVerify: true })
                        const { verificationId, code } = phoneAuthSnapshot;
                        const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
                        firebase.auth().signInWithCredential(credential);
                        this.setState({ message: 'Number has been verified.' });
                        //console.log('auto verified on android with OTP:');
                        //console.log(phoneAuthSnapshot);
                        break;
                }
            }, (error) => {
                console.log(error);
            });
    }

    confirmCode = () => {
        const { codeInput, confirmResult } = this.state;

        if (confirmResult && codeInput.length) {
            confirmResult.confirm(codeInput)
                .then((user) => {
                    this.setState({ message: 'Code Confirmed!', verified: true });
                })
                .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
        }
    };

    renderVerificationCodeInput() {
        const { codeInput } = this.state;

        return (
            <View style={styles.messageTextContainer}>
                <Text style={styles.messageText}>Auto-verificaion unsuccessful. Please enter the verification code below:</Text>
                <TextInput
                    autoFocus
                    placeholder="Enter OTP"
                    placeholderTextColor='#3358ff'
                    underlineColorAndroid='#3358ff'
                    returnKeyType="next"
                    keyboardType="number-pad"
                    autoCorrect={false}
                    onChangeText={value => this.setState({ codeInput: value })}
                    value={codeInput}
                    style={styles.inputMessage}
                />
                <TouchableOpacity style={styles.buttonInsideContainer}>
                    <Text
                        style={styles.buttonTextInside}
                        onPress={this.confirmCode}
                    >Confirm OTP</Text>
                </TouchableOpacity>

            </View>
        );
    }

    renderPhoneNumberInput() {
        const { phoneNumber } = this.state;

        return (
            <View>
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
                    borderColor: '#AE1EF2', 
                    marginLeft: wp('5%'),
                    marginTop: hp('5%')
                    }}>
            <View style={{ marginRight: 20, marginTop: 10 }}>
              <Icon
                name='mobile'
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
                label='Mobile Number'
                animationDuration={255}
                containerStyle={{ width: wp('70%') }}
                lineWidth={0}
                activeLineWidth={0}
                maxLength={13}
                value={phoneNumber}
                returnKeyType="next"
                keyboardType="number-pad"
                onChangeText={value => this.setState({ phoneNumber: value })}
                onFocus={() => this.setState({ blur: 5 })}
                onEndEditing={() => this.setState({ blur: 0 })}
              />
            </View>
          </View>

        <TouchableOpacity onPress={this.phoneAuth}>
          <Text 
            style={{
              fontSize:15, 
              width: wp('40%'), 
              height: 40, 
              color:'white', 
              textAlign:'center', 
              backgroundColor:'#AE1EF2', 
              borderRadius: 20,
              padding:'2%',
              marginTop: hp('2%'),
              marginLeft: wp('30%')
            }}
            >Send OTP</Text>
        </TouchableOpacity>
            </View>
        );
    }

    waitForOtp() {
        return (
            <Overlay 
                isVisible={true} 
                height={hp('25%')} 
                width={wp('60%')} 
                borderRadius={10}
            >
            <View style={{margin: 10}}>
                <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>Waiting for auto-verification of OTP</Text>
                <ActivityIndicator size="large" color="#3358ff" />
            </View>
          </Overlay>
 
        );
    }

    verified() {
        return (
            <Overlay 
            isVisible={true} 
            height={hp('25%')} 
            width={wp('60%')} 
            borderRadius={10}
        >
         <Text style={styles.messageText}>OTP has been successfully verified.</Text>
                <TouchableOpacity style={styles.buttonInsideContainer}>
                    <Text
                        style={styles.buttonTextInside}
                        onPress={() => this.props.navigation.navigate('SignupDetails')}
                    >CONTINUE</Text>
                </TouchableOpacity>
        </Overlay>
        )
    }

    autoVerify() {
        return (
            <View style={styles.messageTextContainer}>
                <Text style={styles.messageText}>Your number has been automatically verified!</Text>
                <TouchableOpacity style={styles.buttonInsideContainer}>
                    <Text
                        style={styles.buttonTextInside}
                        onPress={() => this.props.navigation.navigate('SignupDetails')}
                    >CONTINUE</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { autoVerify, user, confirmResult, codeSent, verified } = this.state;
        return (
            <ImageBackground source={require('../Images/background.png')} blurRadius={this.state.blur} style={styles.backgroundContainer}>
                <Text style={{ 
                    marginTop: hp('38%'), 
                    fontSize: 35, 
                    color: '#AE1EF2', 
                    marginLeft: wp('45%') 
                    }}>
                    Send OTP
        </Text>

                {!autoVerify && !codeSent && !confirmResult && this.renderPhoneNumberInput()}
                {/* //If user not present, then present the enter mobile number component
                 {!user && !confirmResult && this.renderPhoneNumberInput()} */}
                {codeSent && !confirmResult && this.waitForOtp()}
                {/* <Text>{this.state.message}</Text> */}

                {!verified && confirmResult && this.renderVerificationCodeInput()}

                {autoVerify && this.autoVerify()}

                {verified && this.verified()}
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: wp('100%'),
        height: hp('100%'),
        
        //justifyContent: 'center',
        //alignItems: 'center'
    },

    // input: {
    //     height: hp('5%'),
    //     marginBottom: hp('2%'),
    //     marginHorizontal: wp('8%'),
    //     borderBottomColor: '#fff',
    //     color: '#fff'
    // },

    // inputMessage: {
    //     height: hp('5%'),
    //     marginBottom: hp('2%'),
    //     marginHorizontal: wp('8%'),
    //     borderBottomColor: '#fff',
    //     color: '#3358ff'
    // },

    // messageText: {
    //     color: '#3358ff',
    //     textAlign: 'center',
    //     fontSize: wp('5%'),
    //     margin: wp('5%')
    // },

    // messageTextContainer: {
    //     borderWidth: wp('0.5%'),
    //     borderRadius: wp('1%'),
    //     margin: wp('2.5%'),
    //     padding: wp('2.5%'),
    //     backgroundColor: '#fff'
    // },

    // buttonContainer: {
    //     backgroundColor: '#fff',
    //     paddingVertical: hp('1%'),
    //     marginHorizontal: wp('8%'),
    // },

    // buttonText: {
    //     textAlign: 'center',
    //     color: '#3358ff',
    //     fontWeight: '900',
    //     fontSize: wp('5%'),
    // },

    // buttonTextInside: {
    //     textAlign: 'center',
    //     color: '#fff',
    //     fontWeight: '900',
    //     fontSize: wp('5%'),
    // },

    // buttonInsideContainer: {
    //     backgroundColor: '#3358ff',
    //     paddingVertical: hp('1%'),
    //     marginHorizontal: wp('8%'),
    // },
});