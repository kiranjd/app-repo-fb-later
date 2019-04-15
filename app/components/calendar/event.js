import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, BackHandler, ActivityIndicator } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import HeaderBar from '../common/headerBar';
import firebase from 'react-native-firebase';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Overlay, Card } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

export default class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: [],
          day: this.props.navigation.getParam('day', 'default'),
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

        let userLocal = this.state.user;
        let dates = new Object();
        let url = `http://139.59.69.143/api/event.php?date=${this.state.day}&uid=${userLocal.uid}`;
        //console.log(url);
        fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
              this.setState({ dataSource: responseJson, isLoading: false });
          })
      }

    render() {
        let dayString = "Classes for ";
        dayString += this.props.navigation.getParam('day', 'default');
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <HeaderBar pageName = {dayString} navigation={this.props.navigation} />
                    <ActivityIndicator size="large" color="#000" style={{ marginTop: hp('40%') }} />
                </View>
            );
        }

        return (
            <View>
            <HeaderBar pageName = {dayString} navigation={this.props.navigation} />
            <FlatList
              data={this.state.dataSource}
              renderItem={({item}) => 
              <Card>
              <View style={{flexDirection: 'row', margin: 0, alignItems: 'center'}}>
                <View style = {{ width: wp('20%')}}>
                  <Text style = {{fontSize: 25, fontWeight: 'bold', justifyContents: 'flex-start'}}>{item.StartTime}</Text>
                </View>
                <View>
                  <Text style = {{fontSize: 18, fontWeight: 'bold', color: `${item.Name? 'blue': 'red'}`, justifyContents: 'center'}}>{item.Name}</Text>
                </View>
                </View>
              </Card>
              }
            />
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})