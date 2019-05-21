import React, { Component } from 'react';
import { StyleSheet, StatusBar, TextInput, FlatList, Text, View, Image, RefreshControl, ActivityIndicator, TouchableOpacity, Scroll, Alert } from 'react-native';

import { Card, ListItem, Button, Icon, Header } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderBar from '../common/headerBar';
import firebase from 'react-native-firebase';

export default class Credits extends Component {

    componentWillMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user: user.toJSON(),
                });
            } else {
                this.setState({
                    user: null,
                });
            }
        });
    }

    componentDidMount() {
        this.fetchClasses();
     }

     fetchClasses = () => {
        {
            let userLocal = this.state.user;
            let url2 = `http://139.59.69.143/api/getCredits.php?uid=${userLocal.uid}`;

            fetch(url2)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.setState({
                        credits: responseJson.Credits,
                        totalHours: responseJson.TotalHours
                    });
                })
        }
    }

    render() {
        let {credits, totalHours } = this.state;
            return (
                <View style={styles.container}>
                    <HeaderBar pageName='Your Credits' navigation={this.props.navigation} />
                    <View style={styles.textCard}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black'}}>Credits: {credits}</Text>
                    </View>
                    <View style={styles.textCard}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black'}}>Credits Open: {credits}</Text>
                    </View>
                    <View style={styles.textCard}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black'}}>Credits Closed: 0</Text>
                    </View>
                    <View style={styles.textCard}>
<Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black'}}>Encash: {credits * 100} ₹</Text>
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2089dc'
    },

    textCard: {borderRadius: 7, marginTop: hp('1%'), borderWidth: 2, borderColor: 'red', backgroundColor: 'white', width: wp('95%'), marginHorizontal: wp('2.5%'), alignContent: 'center', justifyContent: 'space-evenly'},

    cardButtonsContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        // marginHorizontal: wp('13%'),
    },

    cardButton: {
        marginHorizontal: wp('1%'),
    },

    cardItemText: {
        fontWeight: 'bold',
        margin: hp('0.25%'),
        color: 'blue',
    },

    buttonText: {
        textAlign: 'center',
        color: '#3358ff',
        fontWeight: '900',
        fontSize: wp('5%'),
    },

    buttonTextInside: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '900',
        fontSize: wp('5%'),
    },

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
    },

    buttonInsideContainer: {
        backgroundColor: '#3358ff',
        paddingVertical: hp('1%'),
        marginHorizontal: wp('8%'),
    },

    cardViewContainer: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingVertical: hp('2%'),
        marginHorizontal: hp('2%'),
        borderColor: 'black',
        borderWidth: 0.5,
    }
});