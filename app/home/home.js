import React, { Component } from 'react';
import { StyleSheet, StatusBar, TextInput, FlatList, Text, View, Image, RefreshControl, ActivityIndicator, TouchableOpacity, Scroll, Alert } from 'react-native';

import { Card, ListItem, Button, Icon, Header } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderBar from '../components/common/headerBar';
import firebase from 'react-native-firebase';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCard: null,
            user: [],
            dataSource: [],
            isLoading: true,
            credits: '',
            totalHours: ''
        }

        //this.props.navigation.navigate('AboutMe');
    }

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

    _onRefresh = () => {
        this.fetchClasses();
    }

    componentDidMount() {
       this.fetchClasses();
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    fetchClasses = () => {
        {
            let userLocal = this.state.user;
            let url = `http://139.59.69.143/api/getClasses.php?uid=${userLocal.uid}`;

            fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {
                    const dataSource = responseJson;
                    this.setState({
                        dataSource,
                        isLoading: false
                    });
                })

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

    cardButton(classID, parentNumber) {
        return (

            <View style={styles.cardButtonsContainer}>
                <Button
                    icon={
                        <Icon
                            name='check'
                            type='evilicon'
                        />
                    }
                    type="outline"
                    iconRight
                    title="Start Class"
                    raised
                    containerStyle={styles.cardButton}
                    onPress={() => this.props.navigation.navigate('ParentOtp', {
                        classID: classID,
                        parentNumber: parentNumber
                    })}
                />
            </View>
        );
    }

    showCardButton = (i) => {
        console.log(i);
        if (this.state.showCard == i) {
            this.setState({ showCard: null });
        }
        else {
            this.setState({ showCard: i });
        }
    }
    
    render() {
        let { totalHours, credits } = this.state;
        totalHours = totalHours? Number(totalHours).toFixed(2): '0';
        credits = credits? Number(credits).toFixed(2): '0';
        if (!this.state.isLoading && this.state.dataSource.length == 0) {
            return (
                <View style={styles.container}>
                    <HeaderBar pageName='Upcoming Classes' navigation={this.props.navigation} />
                    <View style={{ borderRadius: 7, marginTop: hp('1%'), height: hp('4%'), borderWidth: 2, borderColor: 'red', backgroundColor: 'white', flexDirection: 'row', width: wp('95%'), marginHorizontal: wp('2.5%'), alignContent: 'center', justifyContent: 'center' }}>
                        <Text style={{ width: wp('45%'), textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'black' }}>Open credits: {credits}</Text>
                        <Text style={{ width: wp('45%'), textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'black' }}>Total Hours: {totalHours}</Text>
                    </View>
                    <ScrollView
                    refreshControl = {
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={this._onRefresh}
                        />
                    }
                    >
                    <Text style={{ textAlign: "center", marginTop: hp('35%'), fontSize: wp('8%') }}>No classes alloted</Text>
                    </ScrollView>
                </View>
            );
        }
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <HeaderBar pageName='Upcoming Classes' navigation={this.props.navigation} />
                    <ActivityIndicator size="large" color="#fff" style={{ marginTop: hp('40%') }} />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <HeaderBar pageName='Upcoming Classes' navigation={this.props.navigation} />
                <View style={{ borderRadius: 7, marginTop: hp('1%'), height: hp('4%'), borderWidth: 2, borderColor: 'red', backgroundColor: 'white', flexDirection: 'row', width: wp('95%'), marginHorizontal: wp('2.5%'), alignContent: 'center', justifyContent: 'center' }}>
                        <Text style={{ width: wp('45%'), textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'black' }}>Open credits: {credits}</Text>
                        <Text style={{ width: wp('45%'), textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'black' }}>Total Hours: {totalHours}</Text>
                    </View>
                <FlatList
                    data={this.state.dataSource}
                    extraData={this.state.showCard}
                    onRefresh={this.fetchClasses}
                    refreshing={this.state.isLoading}
                    renderItem={({ item, index }) =>
                        <View>
                            <TouchableOpacity onPress={() => this.showCardButton(index)}>
                                <Card containerStyle={styles.cardViewContainer} >
                                    <View>
                                        <Text style={styles.cardItemText}><Text style={{ color: 'black' }}>Student Name: </Text>{item.studentName}</Text>
                                        <Text style={styles.cardItemText}><Text style={{ color: 'black' }}>Subject: </Text>{item.subject}</Text>
                                        <Text style={styles.cardItemText}><Text style={{ color: 'black' }}>Date and time of class: </Text>{item.date} at {item.time}</Text>
                                    </View>
                                    <View>{(this.state.showCard == index) && this.cardButton(item.ID, item.ParentMobileNumber)}</View>
                                </Card>
                            </TouchableOpacity>
                        </View>
                    }
                    keyExtractor={item => item.ID}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2089dc'
    },

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