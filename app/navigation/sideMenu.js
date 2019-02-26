import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Image } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class SideMenu extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profileDetails}>
                    <Button title="SVJK" onPress={() => { this.props.navigation.navigate('Logout') }} />
                    <View style={styles.imageContainer}>
                    <Image style={styles.profileImage} source={require('../components/Images/profile.png')} />
                    </View>                                              
                </View>
                <View style={styles.pages}>
                    <Text style={styles.pagesList}>Last Classes</Text>
                    <Text style={styles.pagesList}>Profile</Text>
                    <Text style={styles.pagesList} onPress={() => { this.props.navigation.navigate('Calendar') }}>Calendar</Text>
                    <Text style={styles.pagesList} onPress={() => { this.props.navigation.navigate('Camera') }}>Camera</Text>
                    <Text style={styles.pagesList}>Help</Text>
                    <Text style={styles.pagesList}>Logout</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    pages : {
        
    },
    imageContainer: {
        opacity: 0.9,
        backgroundColor: '#358',
    },
    profileDetails: {
        
    },
    image: {

    },
     profileImage: {
         marginTop: hp('0%'),
         width: wp('65%'), 
         height: hp('30%'),
         resizeMode: 'contain',
     },
     pagesList: {
         fontSize: wp('3.5%'),
         padding: wp('1.5%'),
         backgroundColor: 'lightgray',
         margin: 1,
         fontWeight: 'bold',
         color: 'black'
     },
})