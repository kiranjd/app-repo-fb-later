import React, { Component } from 'react';
import { StyleSheet, StatusBar, TextInput, Text, View, Image, TouchableOpacity, Scroll, BackHandler } from 'react-native';

import { Card, ListItem, Button } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';

import { Thumbnail } from 'react-native-thumbnail-video';
import HeaderBar from '../common/headerBar';

export default class LastClasses extends Component {
    constructor(props) {
        super(props);
        this.showCardButton = this.showCardButton.bind(this);
        this.state = {
            showButton: [],
            show: null,
        }
    }

    componentDidMount() {
        this.setState({ showButtons: [], show: false });
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Home');
            return true;
          });
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
                />
            </View>
        );
    }

    showCardButton = () => {
        // console.log(i);
        // this.setState({showButton: {i: true}});
        if (!this.state.show) {
            this.setState({ show: true });
        }
        else {
            this.setState({ show: false });
        }

    }

    render() {
        return (
            <ScrollView style={styles.container}>
             <HeaderBar pageName='Last Classes' navigation={this.props.navigation}/>
                {
                    users.map((u, i) => {
                        return (
                            <TouchableOpacity>
                                <Card key={i} containerStyle={styles.cardViewContainer} >
                                <View style={styles.cardViewInnerContainer}>
                                    <View style={styles.cardTextContainer}>
                                    <View style={styles.cardDetails}> 
                                        <Text style={styles.cardItemText}> Student Name </Text>
                                        <Text style={styles.cardItemTextValue}> {u.studentName} </Text>
                                    </View>
                                    <View style={styles.cardDetails}> 
                                        <Text style={styles.cardItemText}> Date </Text>
                                        <Text style={styles.cardItemTextValue}> {u.date} </Text>
                                    </View>
                                    <View style={styles.cardDetails}> 
                                        <Text style={styles.cardItemText}> Subject </Text>
                                        <Text style={styles.cardItemTextValue}> {u.subject} </Text>
                                    </View>
                                    <View style={styles.cardDetails}> 
                                        <Text style={styles.cardItemText}> Start Time </Text>
                                        <Text style={styles.cardItemTextValue}> {u.startTime} </Text>
                                    </View>
                                    <View style={styles.cardDetails}> 
                                        <Text style={styles.cardItemText}> End Time </Text>
                                        <Text style={styles.cardItemTextValue}> {u.endTime} </Text>
                                    </View>
                                            
                                        
                                    </View>
                    
                                    <View style={styles.thumbnailContainer}>
                                        <Thumbnail containerStyle={styles.thumbnailStyle} imageWidth={wp('30%')} imageHeight={hp('17%')} url="https://www.youtube.com/watch?v=BZLILkaiXXM" />
                                    </View>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        );
                    })
                }
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
        width:'60%',
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
        width:'50%',
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
        subject:- 'Mathamatics',
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
