import React, { Component } from 'react';
import {View, Overlay, Text} from 'react-native';

import firebase from 'react-native-firebase';
import Home from '../../home/home';
import SplashScreen from 'react-native-splash-screen';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class HandleLogin extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: null,
          };
    }

    componentWillMount() {
        SplashScreen.hide();
        //this.props.navigation.navigate('Login');
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user.toJSON() });
                console.log(user);
                this.props.navigation.navigate('Home');
            } else {
                // User has been signed out, reset the state
                
                this.setState({
                    user: null,
                });
                this.props.navigation.navigate('Login');
            }
        });
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
      }

    render() {
        return (
            null
        );
    }
}