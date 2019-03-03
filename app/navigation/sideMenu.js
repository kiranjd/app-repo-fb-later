import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';
import firebase from 'react-native-firebase';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            displayName: '',
            profileUrl: '',
        }
    }

    componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ 
                    user: user.toJSON(),
                    displayName: user.displayName,
                    profileUrl: user.photoURL, 
                });
                //console.log(user.photoURL);
            } else {
                this.setState({
                    user: null,
                });
                
            }
            //console.log(this.state.user['displayName']);
        });
    }

    render() {
        signOutUser = async () => {
            
            try {
                await firebase.auth().signOut(); 
                this.props.navigation.navigate('Login');
                console.log('out');       
            } catch (e) {
                console.log(e);
            }
        }

        return (
            <View style={styles.container}>
                <View style={styles.profileDetails}>
                <StatusBar backgroundColor="blue"
  animated />
                    <Button title="SVJK" onPress={() => { this.props.navigation.navigate('Logout') }} />
                        <Image containerStyle={styles.imageContainer} style={styles.profileImage} source={{uri: this.state.profileUrl+'?height=200'}}/>
                    <Text style={styles.profileName}>{this.state.displayName}</Text>
                </View>
                <View style={styles.pages}>
                    <TouchableOpacity activeOpacity={0.2} underlayColor={'black'}>
                        <View style={styles.iconWithText}>
                            <Icon name='play' type='evilicon' color='white' />
                            <Text style={styles.pagesList} onPress={() => { this.props.navigation.navigate('Last Classes') }}>Last Classes</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.iconWithText}>
                        <Icon name='link' type='evilicon' color='white' />
                        <Text style={styles.pagesList} onPress={() => { this.props.navigation.navigate('Profile') }}>Profile</Text>
                    </View>
                    <View style={styles.iconWithText}>
                        <Icon name='calendar' type='evilicon' color='white' />
                        <Text style={styles.pagesList} onPress={() => { this.props.navigation.navigate('Calendar') }}>Calendar</Text>
                    </View>
                    <View style={styles.iconWithText}>
                        <Icon name='chart' type='evilicon' color='white' />
                        <Text style={styles.pagesList} onPress={() => { this.props.navigation.navigate('Help') }}>Help</Text>
                    </View>
                    <View style={styles.iconWithText}>
                        <Icon name='chart' type='evilicon' color='white' />
                        <Text style={styles.pagesList} onPress={() => { this.props.navigation.navigate('UpdateProfile') }}>Update Profile</Text>
                    </View>
                    <View style={styles.iconWithText}>
                        <Icon name='close' type='evilicon' color='white' />
                        <Text style={styles.pagesList} onPress={() => { signOutUser() }}>Logout</Text>
                    </View>
                    
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#70A5F1',
    },
    pages: {
        backgroundColor: '#70A5F1',
    },
    iconWithText: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageContainer: {
        opacity: 0.9,
    },
    profileDetails: {

    },
    image: {

    },
    profileImage: {
        marginTop: hp('2%'),
        marginLeft: wp('15%'),
        width: 150, height: 150,
        borderRadius: 200/ 2,
        borderWidth: 3,
        backgroundColor: 'black',
        borderColor: 'white',
    },
    pagesList: {
        fontSize: wp('3.5%'),
        padding: wp('1.5%'),
        margin: 1,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'monospace',
    },

    profileName: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        //fontFamily: 'monospace',
        marginTop: hp('2%'),
        marginBottom: hp('2%'),
        fontSize: 20
    }
})