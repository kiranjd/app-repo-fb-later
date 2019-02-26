import React, { Component } from 'react';
import { StyleSheet, StatusBar, TextInput, Text, View, TouchableOpacity, Image } from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class SignupForm extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    autoFocus
                    placeholder="Username" 
                    placeholderTextColor="#fff"
                    underlineColorAndroid="white"
                    returnKeyType="next"
                    // onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType=""
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                />
                <TextInput 
                    placeholder="First Name" 
                    placeholderTextColor="#fff"
                    underlineColorAndroid="white"
                    returnKeyType="next"
                    // onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType=""
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                />
                <TextInput 
                    placeholder="Last Name" 
                    placeholderTextColor="#fff"
                    underlineColorAndroid="white"
                    returnKeyType="next"
                    // onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType=""
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                />
                <TextInput 
                    placeholder="Email" 
                    placeholderTextColor="#fff"
                    underlineColorAndroid="white"
                    returnKeyType="next"
                    // onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                />
                <TextInput 
                    secureTextEntry
                    placeholder="Password" 
                    placeholderTextColor="#fff"
                    underlineColorAndroid="white"
                    returnKeyType="next"
                    // onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType=""
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                />
                <TextInput 
                    secureTextEntry
                    placeholder="Confirm Password" 
                    placeholderTextColor="#fff"
                    underlineColorAndroid="white"
                    returnKeyType="next"
                    // onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType=""
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.buttonContainer}>
                <Text 
                    style={styles.buttonText} 
                    onPress={() => this.props.navigation.navigate('Home')}
                >Submit</Text>
            </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
        backgroundColor: '#3358ff'
    },

    input: {
        height: hp('5%'),
        marginBottom: hp('3%'),
        marginHorizontal: wp('8%'),
        borderBottomColor: '#fff',
        color: '#fff'
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
});