import React, { Component } from 'react';
import { StyleSheet, StatusBar, Flatlist, TextInput, FlatList, Text, View, Image, RefreshControl, ActivityIndicator, TouchableOpacity, Scroll, Alert } from 'react-native';

import { Card, ListItem, Button, Icon, Header } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderBar from '../common/headerBar';
import firebase from 'react-native-firebase';

export default class Students extends Component {
    render() {
        return (
            <View style={styles.container}>
                <HeaderBar pageName='New Requests' navigation={this.props.navigation} />
                <Card
                    title='Student Name: Ashwin Kuthrapalli'>
                    <View style={{ flexDirection: 'row', width: wp('85%'), justifyContent: 'space-around' }}>
                        <Text style={{ color: 'black', padding: 5, borderRadius: 5, marginBottom: 10, borderWidth: 1, textAlign: 'center' }}>
                            Class: 10th
                    </Text>
                        <Text style={{ color: 'black', borderRadius: 5, padding: 5, marginBottom: 10, borderWidth: 1, textAlign: 'center' }}>
                            Location: Hebbal
                    </Text>
                        <Text style={{ color: 'black', borderRadius: 5, padding: 5, marginBottom: 10, borderWidth: 1, textAlign: 'center' }}>
                            Subject: Biology
                    </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Button
                            backgroundColor='#000000'
                            buttonStyle={{ width: wp('40%'), backgroundColor: 'green', marginHorizontal: wp('1%') }}
                            title='Accept' />
                        <Button
                            backgroundColor='#FF0000'
                            buttonStyle={{ width: wp('40%'), backgroundColor: 'red', marginHorizontal: wp('1%') }}
                            title='Reject' />
                    </View>
                </Card>
                <Card
                    title='Student Name: Maven Joseph'>
                    <View style={{ flexDirection: 'row', width: wp('85%'), justifyContent: 'space-around' }}>
                        <Text style={{ color: 'black', padding: 5, borderRadius: 5, marginBottom: 10, borderWidth: 1, textAlign: 'center' }}>
                            Class: 10th
                    </Text>
                        <Text style={{ color: 'black', borderRadius: 5, padding: 5, marginBottom: 10, borderWidth: 1, textAlign: 'center' }}>
                            Location: Hebbal
                    </Text>
                        <Text style={{ color: 'black', borderRadius: 5, padding: 5, marginBottom: 10, borderWidth: 1, textAlign: 'center' }}>
                            Subject: Biology
                    </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Button
                            backgroundColor='#000000'
                            buttonStyle={{ width: wp('40%'), backgroundColor: 'green', marginHorizontal: wp('1%') }}
                            title='Accept' />
                        <Button
                            backgroundColor='#FF0000'
                            buttonStyle={{ width: wp('40%'), backgroundColor: 'red', marginHorizontal: wp('1%') }}
                            title='Reject' />
                    </View>
                </Card>
                <Card
                    title='Student Name: Harshitha'>
                    <View style={{ flexDirection: 'row', width: wp('85%'), justifyContent: 'space-around' }}>
                        <Text style={{ color: 'black', padding: 5, borderRadius: 5, marginBottom: 10, borderWidth: 1, textAlign: 'center' }}>
                            Class: 10th
                    </Text>
                        <Text style={{ color: 'black', borderRadius: 5, padding: 5, marginBottom: 10, borderWidth: 1, textAlign: 'center' }}>
                            Location: Hebbal
                    </Text>
                        <Text style={{ color: 'black', borderRadius: 5, padding: 5, marginBottom: 10, borderWidth: 1, textAlign: 'center' }}>
                            Subject: Biology
                    </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Button
                            backgroundColor='#000000'
                            buttonStyle={{ width: wp('40%'), backgroundColor: 'green', marginHorizontal: wp('1%') }}
                            title='Accept' />
                        <Button
                            backgroundColor='#FF0000'
                            buttonStyle={{ width: wp('40%'), backgroundColor: 'red', marginHorizontal: wp('1%') }}
                            title='Reject' />
                    </View>
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2089dc'
    },

    textCard: { borderRadius: 7, marginTop: hp('1%'), borderWidth: 2, borderColor: 'red', backgroundColor: 'white', width: wp('95%'), marginHorizontal: wp('2.5%'), alignContent: 'center', justifyContent: 'space-evenly' },

    cardButtonsContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
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