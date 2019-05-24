import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    ImageBackground,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    BackHandler,
    KeyboardAvoidingView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HeaderBar from '../common/headerBar';
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ParentOtp extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.state = {
            phoneNumber: this.props.navigation.getParam('parentNumber', ''),
            codeSent: false,
            codeVerified: false,
            apiKey: '33119aa2-46a6-11e9-8806-0200cd936042',
            sessionId: '',
            codeInput: '',
            classID: this.props.navigation.getParam('classID', 'default')
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Home');
            return true;
          });
        this.sendOtp();
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
                            onFocus={() => this.setState({ blur: 4 })}
                            onEndEditing={() => this.setState({ blur: 0 })}
                        />
                    </View>
                </View>

                <TouchableOpacity onPress={this.sendOtp}>
                {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('GoLive', {classID: this.state.classID})}> */}
                    <Text
                        style={{
                            fontSize: 15,
                            width: wp('40%'),
                            height: 40,
                            color: 'white',
                            textAlign: 'center',
                            backgroundColor: '#AE1EF2',
                            borderRadius: 20,
                            padding: '2%',
                            marginTop: hp('2%'),
                            marginLeft: wp('30%')
                        }}
                    >Send OTP</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderVerificationCodeInput() {
        const { codeInput } = this.state;

        return (
                        <View>
                            <Text style={{textAlign: 'center'}}>OTP has been sent to {this.state.phoneNumber}</Text>
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
                                        label='Enter OTP'
                                        animationDuration={255}
                                        containerStyle={{ width: wp('70%') }}
                                        lineWidth={0}
                                        activeLineWidth={0}
                                        maxLength={13}
                                        returnKeyType="next"
                                        keyboardType="number-pad"
                                        onChangeText={value => this.setState({ codeInput: value })}
                                        value={codeInput}
                                        onFocus={() => this.setState({ blur: 5 })}
                                        onEndEditing={() => this.setState({ blur: 0 })}
                                      />
                                    </View>
                                  </View>
                        
                                <TouchableOpacity onPress={this.confirmCode}>
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
                                    >Confirm OTP</Text>
                                </TouchableOpacity>
                                    </View>
        );
    }

    confirmCode = () => {
        const { codeInput, sessionId, apiKey } = this.state;

        let url = `https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${sessionId}/${codeInput}`;
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.Status == 'Success') {
                    this.setState({ codeVerified: true });
                    let url = `http://139.59.69.143/api/postClassStatus.php?classID=${this.state.classID}&status=1`
                    fetch(url, {method: 'GET'})
                    .then((response) => {
                        if(response.status) {
                            Alert.alert(
                                'Parent OTP verified', 
                                'Press continue to \'Go Live\'', 
                                [
                                    {text: 'Continue', onPress: () => this.props.navigation.navigate('GoLive', {classID: this.state.classID})}
                                ]
                                )
                        }
                    })
                }
                console.log(responseJson);
            })
    }

    sendOtp = () => {
        const { phoneNumber, apiKey } = this.state;
        let url = `https://2factor.in/API/V1/${apiKey}/SMS/${phoneNumber}/AUTOGEN`;
        
        //Alert.alert(url);
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.Status == 'Success') {
                    this.setState({ codeSent: true, sessionId: responseJson.Details })
                }
                console.log(responseJson.Status);
            })
    }

    render() {
        const { codeSent, codeVerified } = this.state;
        return (
            <ImageBackground source={require('../Images/background.png')} blurRadius={this.state.blur} style={styles.backgroundContainer}>
                <HeaderBar pageName='Parent OTP Verification' navigation={this.props.navigation} />
                <KeyboardAvoidingView keyboardVerticalOffset={70} behavior="position" >
                <Text style={{
                    marginTop: hp('38%'),
                    fontSize: 35,
                    color: '#AE1EF2',
                    marginLeft: wp('45%')
                }}>
                    Send OTP
        </Text>
                {!codeSent && this.renderPhoneNumberInput()}

                {codeSent && this.renderVerificationCodeInput() }
</KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: wp('100%'),
        height: hp('100%'),
    },
});