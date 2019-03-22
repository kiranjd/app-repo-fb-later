import React, { Component } from 'react';
import { StyleSheet, StatusBar, TextInput, Text, View, Image, TouchableOpacity, Scroll, Alert } from 'react-native';

import { Card, ListItem, Button, Icon, Header } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderBar from '../components/common/headerBar';
import firebase from 'react-native-firebase';

export default class Home extends Component {
    constructor(props) {
        super(props);
        //debugger;
        //this.showCardButton = this.showCardButton.bind(this);
        this.state = {
            showCard: null,
            user: [],
        }
    }

    fetchData = (user) => {
        let url = `http://139.59.69.143/api/getClasses.php?uid=${user.uid}`;
        console.log(url);
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
        })
    }

    componentDidMount() {
        
        this.setState({isLoading: true});
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ 
                    user: user.toJSON(),
                });
                this.fetchData(this.state.user);
            } else {
                this.setState({
                    user: null,
                });
                
            }
        });
        
        

        this.setState({isLoading: false});
    }

    cardButton() {
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
                    onPress = {() => this.props.navigation.navigate('ParentOtp')}
                />
                <Button
                    icon={
                        <Icon
                            name='play'
                            type='evilicon'
                        />
                    }
                    on
                    raised
                    type="outline"
                    iconRight
                    title="Go Live!"
                    style={styles.cardButton}
                    containerStyle={styles.cardButton}
                    onPress = {() =>  this.props.navigation.navigate('GoLive')}
                />
            </View>
        );
    }

    showCardButton(i) {
        console.log(i);
        if (this.state.showCard === i) {
            this.setState({ showCard: null });

        }

        else {
            this.setState({ showCard: i });

        }
    }

    toggleDrawer = () => {
        this.props.navigation.toggleDrawer();
        ////
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderBar pageName='Upcoming Classes' navigation={this.props.navigation}/>
                <ScrollView >
                    {
                        users.map((u, i) => {
                            return (
                                // <TouchableOpacity onPress={ () => this.props.navigation.toggleDrawer()}>
                                <TouchableOpacity key={i} onPress={() => this.showCardButton(i)}>
                                    <Card  containerStyle={styles.cardViewContainer} >
                                        <View>
                                            <Text style={styles.cardItemText}><Text style={{ color: 'black' }}>Student Name: </Text>{u.studentName}</Text>
                                            <Text style={styles.cardItemText}><Text style={{ color: 'black' }}>Subject: </Text>{u.subject}</Text>
                                            <Text style={styles.cardItemText}><Text style={{ color: 'black' }}>Time of class: </Text>{u.timeOfClass}</Text>
                                        </View>
                                        <View>{(this.state.showCard === i) && this.cardButton()}</View>                                        
                                    </Card>
                                </TouchableOpacity>
                            );
                        })
                    }
                </ScrollView>
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
        marginHorizontal: wp('13%'),
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

const users = [
    {
        studentName: 'Brynn',
        subject: 'Mathamatics',
        timeOfClass: '07/02/2019'
    },
    {
        studentName: 'Raaju',
        subject: 'Physics',
        timeOfClass: '28/02/2019'
    }, {
        studentName: 'Tejas',
        subject: 'Chemistry',
        timeOfClass: '24/02/2019'
    }, {
        studentName: 'Sunil',
        subject: 'Coder',
        timeOfClass: '11/02/2019'
    }, {
        studentName: 'Sunil',
        subject: 'Coder',
        timeOfClass: '11/02/2019'
    }, {
        studentName: 'Sunil',
        subject: 'Coder',
        timeOfClass: '11/02/2019'
    }, {
        studentName: 'Sunil',
        subject: 'Coder',
        timeOfClass: '11/02/2019'
    }, {
        studentName: 'Sunil',
        subject: 'Coder',
        timeOfClass: '11/02/2019'
    },
]