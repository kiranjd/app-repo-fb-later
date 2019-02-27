import React, { Component } from 'react';
import {View} from 'react-native';

import firebase from 'react-native-firebase';
import Home from '../../home/home';
import SplashScreen from 'react-native-splash-screen';


export default class HandleLogin extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: null,
          };
    }

    componentDidMount() {
        SplashScreen.hide();
        this.props.navigation.navigate('Login');
        // this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        //     if (user) {
        //         this.setState({ user: user.toJSON() });
        //         console.log(user);
        //         var sometext = 'hell';
        //         //this.props.navigation.navigate('Home', {uname: 'sometext'});
        //     } else {
        //         // User has been signed out, reset the state
        //         this.setState({
        //             user: null,
        //         });
        //         this.props.navigation.navigate('Login');
        //     }
        // });
    }

    // componentWillUnmount() {
    //     if (this.unsubscribe) this.unsubscribe();
    //   }

    render() {
        return (
            null
        );
    }
}