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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextField } from 'react-native-material-textfield';
import {KeyboardAvoidingView} from 'react-native';

export default class Login extends Component {
    render() {
        return (
            <ImageBackground source={require('../Images/background.png')} style={styles.backgroundContainer}>
                <Text style={{ fontSize: 35, color: '#AE1EF2', marginLeft: wp('60%'), marginTop: ('60%') }}>
                    Sign Up
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
                                label='Username'
                                animationDuration={255}
                                containerStyle={{ width: wp('70%') }}
                                lineWidth={0}
                                activeLineWidth={0}
                            />
                        </View>
                    </View>

                    <View style={{ width: wp('90%'), marginTop: hp('2%'), height: hp('7%'), flexDirection: 'row', borderRadius: wp('20%'),
                          justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' , borderRadius: 100, borderWidth: 1, borderColor: '#AE1EF2'
                     }}>
                        <View style={{ marginRight: wp('5%'), marginTop: hp('1%') }}>
                            <Icon
                                name='envelope'
                                size={24}
                                color='#AE1EF2'
                            />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                label='Email address'
                                animationDuration={255}
                                containerStyle={{ width: wp('70%') }}
                                lineWidth={0}
                                activeLineWidth={0}
                            />
                        </View>
                    </View>
                    <View style={{ width: wp('90%'), marginTop: hp('2%'), height: hp('7%'), flexDirection: 'row', borderRadius: wp('20%'),
                          justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 100, borderWidth: 1, borderColor: '#AE1EF2'
                    }}>
                        <View style={{ marginRight: wp('5%'), marginTop: hp('1%') }}>
                            <Icon
                                name='key'
                                size={24}
                                color='#AE1EF2'
                            />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                label='Password'
                                animationDuration={255}
                                containerStyle={{ width: wp('70%') }}
                                lineWidth={0}
                                activeLineWidth={0}
                            />
                        </View>
                    </View>
                    <View style={{ width: wp('90%'), marginTop: hp('2%'), height: hp('7%'), flexDirection: 'row', borderRadius: wp('20%'),
                     justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 100, borderWidth: 1, borderColor: '#AE1EF2'
                    }}>
                        <View style={{ marginRight: wp('5%'), marginTop: hp('1%') }}>
                            <Icon
                                name='key'
                                size={24}
                                color='#AE1EF2'
                            />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                label='Confirm Password'
                                animationDuration={255}
                                containerStyle={{ width: wp('70%') }}
                                lineWidth={0}
                                activeLineWidth={0}
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row',marginTop:hp('1%')}}>
                        <TouchableOpacity>
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
                            >Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            {/* <Text style={{ fontSize: 15, marginHorizontal:wp('11%'), marginTop: 10 }}>
                                Already Have Account? <Text style={{color:'#AE1EF2'}}> Log In </Text>
                            </Text> */}
                        </TouchableOpacity>
                    </View>

                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: wp('100%'),
        height: hp('100%'),
        justifyContent: 'center',
        // alignItems: 'center',
    },




});
