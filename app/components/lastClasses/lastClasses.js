import React, { Component } from 'react';
import { StyleSheet, StatusBar, TextInput, ActivityIndicator, Text, WebView, Linking, FlatList, View, Image, TouchableOpacity, Scroll, BackHandler } from 'react-native';

import { Card, ListItem, Button } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';

import { Thumbnail } from 'react-native-thumbnail-video';
import HeaderBar from '../common/headerBar';
import firebase from 'react-native-firebase';

export default class LastClasses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showButton: [],
            show: null,
            user: [],
            dataSource: [],
            isLoading: true,
        }
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

    componentDidMount() {
        this.setState({ showButtons: [], show: false });

        let userLocal = this.state.user;
        let url = `http://139.59.69.143/api/getLastClasses.php?uid=${userLocal.uid}`;

        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                const dataSource = responseJson;
                this.setState({
                    dataSource,
                    isLoading: false
                });
            })

        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Home');
            return true;
        });
    }

    render() {
        if (!this.state.isLoading && this.state.dataSource.length == 0) {
            return (
                <View style={styles.container}>
                    <HeaderBar pageName='Last Classes' navigation={this.props.navigation} />
                    <Text style={{ textAlign: "center", marginTop: hp('40%'), fontSize: wp('8%') }}>No classes taken yet or not authorised to view</Text>
                </View>
            );
        }

        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <HeaderBar pageName='Last Classes' navigation={this.props.navigation} />
                    <ActivityIndicator size="large" color="#000" style={{ marginTop: hp('40%') }} />
                </View>
            );
        }

        return (
         <ScrollView style={styles.container}>
            <View>
                <HeaderBar pageName='Last Classes' navigation={this.props.navigation} />
                {
                    <FlatList
                        data={this.state.dataSource}
                        extraData={this.state.showCard}
                        onRefresh={() => {
                            let userLocal = this.state.user;
                            let url = `http://139.59.69.143/api/getLastClasses.php?uid=${userLocal.uid}`;
                            fetch(url)
                                .then((response) => response.json())
                                .then((responseJson) => {
                                    const dataSource = responseJson;
                                    this.setState({
                                        dataSource,
                                        isLoading: false
                                    });
                                })
                        }}
                        //this.props.navigation.navigate('showVideo', { videoUrl: item.videoUrl }
                        refreshing={this.state.isLoading}
                        renderItem={({ item }) =>
                            <View>
                                <TouchableOpacity onPress={() => Linking.openURL('http://139.59.69.143/playVideo.php?videoUrl=' + item.videoUrl)}>
                                    <Card containerStyle={styles.cardViewContainer} >
                                        <View style={styles.cardViewInnerContainer}>
                                            <View style={styles.cardTextContainer}>
                                                <View style={styles.cardDetails}>
                                                    <Text style={styles.cardItemText}> Student Name </Text>
                                                    <Text style={styles.cardItemTextValue}> {item.studentName} </Text>
                                                </View>
                                                <View style={styles.cardDetails}>
                                                    <Text style={styles.cardItemText}> Date </Text>
                                                    <Text style={styles.cardItemTextValue}> {item.date} </Text>
                                                </View>
                                                <View style={styles.cardDetails}>
                                                    <Text style={styles.cardItemText}> Subject </Text>
                                                    <Text style={styles.cardItemTextValue}> {item.subject} </Text>
                                                </View>
                                                <View style={styles.cardDetails}>
                                                    <Text style={styles.cardItemText}> Start Time </Text>
                                                    <Text style={styles.cardItemTextValue}> {item.startTime} </Text>
                                                </View>
                                                <View style={styles.cardDetails}>
                                                    <Text style={styles.cardItemText}> Duration of class </Text>
                                                    <Text style={styles.cardItemTextValue}> {item.duration} minutes</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            </View>
                        }
                        keyExtractor={item => item.ID}
                    />
                }
            </View>
             </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //flexDirection: 'column',
    },

    cardViewContainer: {
        // borderRadius: 10,
        flexDirection: 'column',
        backgroundColor: '#070707'
    },

    cardViewInnerContainer: {
        flexDirection: 'row',
    },

    cardDetails: {
        flexDirection: 'row',
    },

    cardTextContainer: {
        marginRight: wp('5%'),
        width: '100%',
    },

    cardItemText: {
        fontWeight: 'bold',
        margin: hp('0.25%'),
        color: 'white',
        width: '50%',
    },

    cardItemTextValue: {
        fontWeight: 'bold',
        margin: hp('0.25%'),
        color: '#f7f2b9',
        width: '50%',
    },

    thumbnailContainer: {
        alignContent: 'flex-end',
    },

    thumbnailStyle: {

    },
});


const users = [
    {
        studentName: 'Brynn',
        date: '07/02/2019',
        subject: - 'Mathamatics',
        startTime: '11:15:00',
        endTime: '12:00:00'
    },
    {
        studentName: 'Jhon',
        date: '07/02/2019',
        subject: 'Mathamatics',
        startTime: '11:15:00',
        endTime: '12:00:00'
    },
    {
        studentName: 'carel',
        date: '08/02/2019',
        subject: 'Science',
        startTime: '01:15:00',
        endTime: '2:00:00'
    },
    {
        studentName: 'raj',
        date: '07/02/2019',
        subject: 'arts',
        startTime: '3:00:00',
        endTime: '3:45:00'
    },
    {
        studentName: 'Tom',
        date: '07/02/2019',
        subject: 'arts',
        startTime: '3:00:00',
        endTime: '3:45:00'
    },

]
