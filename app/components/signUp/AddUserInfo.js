import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    ImageBackground,
    TouchableOpacity,
    ToastAndroid,
    KeyboardAvoidingView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import firebase from 'react-native-firebase';
import HeaderBar from '../common/headerBar';

export default class AddUserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            userType: '',
            goToHome: false,
        }
    }

    componentDidMount() {
        var user = firebase.auth().currentUser;
        if (user.displayName !== null) {
            let firstName = user.displayName.split(" ", 1);
            let lastName = user.displayName.split(/ (.+)/)[1];
            this.setState({
                firstName: firstName.toString(),
                lastName: lastName,
            });
        }
    }

    updateUser = () => {
        const { firstName, lastName, email } = this.state;
        //ToastAndroid.show('Updating user details...', ToastAndroid.SHORT);
        var user = firebase.auth().currentUser;

        user
            .updateProfile({
                displayName: firstName + ' ' + lastName,
            })
            .then(() => {
                ToastAndroid.show('Updated successfully', ToastAndroid.SHORT);
                this.props.navigation.navigate('Home');
            })
            .catch(function (error) {
                alert(error);
            });

        user.sendEmailVerification().then(function () {
            console.log('sent mail');
        }).catch(function (error) {
            // An error happened.
        });
    }

    render() {

        const { firstName, lastName, email } = this.state;

        let data = [{
            value: 'Teacher',
        }, {
            value: 'Student',
        }
        ];

        if (this.state.go == true) {
        }

        return (
            <ImageBackground source={require('../Images/background.png')} style={styles.backgroundContainer}>
                
                <KeyboardAvoidingView keyboardVerticalOffset={-80} behavior="position" >
                <Text style={{ fontSize: 35, color: '#AE1EF2', marginLeft: wp('56%'), marginTop: ('67%') }}>
                    Signup
                </Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('5%') }}>
                        <View style={{
                            width: wp('90%'), height: hp('7%'), flexDirection: 'row', borderRadius: wp('20%'),
                            justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 100, borderWidth: 1, borderColor: '#AE1EF2'
                        }}>
                            <View style={{ marginRight: wp('5%'), marginTop: hp('1%') }}>
                                <Icon
                                    name='user'
                                    size={24}
                                    color='#AE1EF2'
                                />
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TextField
                                    label='First name'
                                    animationDuration={255}
                                    containerStyle={{ width: wp('70%') }}
                                    lineWidth={0}
                                    activeLineWidth={0}
                                    onChangeText={value => this.setState({ firstName: value })}
                                    value={firstName}
                                    autoCapitalize='words'
                                />
                            </View>
                        </View>

                        <View style={{
                            width: wp('90%'), marginTop: hp('2%'), height: hp('7%'), flexDirection: 'row', borderRadius: wp('20%'),
                            justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 100, borderWidth: 1, borderColor: '#AE1EF2'
                        }}>
                            <View style={{ marginRight: wp('5%'), marginTop: hp('1%') }}>
                                <Icon
                                    name='user'
                                    size={24}
                                    color='#AE1EF2'
                                />
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TextField
                                    label='Last name'
                                    animationDuration={255}
                                    containerStyle={{ width: wp('70%') }}
                                    lineWidth={0}
                                    activeLineWidth={0}
                                    onChangeText={value => this.setState({ lastName: value })}
                                    value={lastName}
                                    autoCapitalize
                                />
                            </View>
                        </View>
                        <View style={{
                            width: wp('90%'), marginTop: hp('2%'), height: hp('7%'), flexDirection: 'row', borderRadius: wp('20%'),
                            justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 100, borderWidth: 1, borderColor: '#AE1EF2'
                        }}

                        >
                            <View style={{ marginRight: wp('5%'), marginTop: hp('1%') }}>
                                <Icon
                                    name='envelope'
                                    size={24}
                                    color='#AE1EF2'
                                />
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TextField
                                    label='Email'
                                    animationDuration={255}
                                    containerStyle={{ width: wp('70%') }}
                                    lineWidth={0}
                                    activeLineWidth={0}
                                    //onChangeText={value => this.setState({ email: value })}
                                    value={email}
                                    onPress={() => ToastAndroid.show('Updating user details...', ToastAndroid.SHORT)}
                                />
                            </View>
                        </View>
                        <View style={{
                            width: wp('90%'), marginTop: hp('2%'), height: hp('7%'), flexDirection: 'row', borderRadius: wp('20%'),
                            justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 100, borderWidth: 1, borderColor: '#AE1EF2'
                        }}>

                            <Dropdown
                                label='User type'
                                data={data}
                                containerStyle={{ width: wp('70%') }}
                                lineWidth={0}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: hp('1%') }}>
                            <TouchableOpacity onPress={this.updateUser}>
                                <Text
                                    style={{
                                        width: wp('30%'),
                                        height: 40,
                                        color: 'white',
                                        textAlign: 'center',
                                        marginRight: wp('70%'),
                                        backgroundColor: '#AE1EF2',
                                        borderBottomRightRadius: 20,
                                        borderTopRightRadius: 20,
                                        padding: '2%',
                                    }}
                                >Signup</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
          </KeyboardAvoidingView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: wp('100\%'),
        height: hp('100%'),
        //justifyContent: 'center',
    },
});
