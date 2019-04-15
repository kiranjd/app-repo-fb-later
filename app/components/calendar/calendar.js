import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, BackHandler, ActivityIndicator } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import HeaderBar from '../common/headerBar';
import firebase from 'react-native-firebase';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Overlay, Card } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
//

export default class calendars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: null, 
      user: [],
      isLoading: true,
      showOverlay: true
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      console.log('jj');
      this.setState({showOverlay: false});
      //debugger;
      this.props.navigation.navigate('Home');
      return true;
    });

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
    let url = `http://139.59.69.143/api/markDates.php?uid=${userLocal.uid}`;

    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
          responseJson.forEach(element => {
            dates[element] = { selected: true, selectedColor: 'orange' };
          });
          this.setState({ dates: dates, isLoading: false });
      })
  }



  render() {
    if (this.state.isLoading) {
      return (
          <View style={styles.container}>
              <HeaderBar pageName='Alloted Classes' navigation={this.props.navigation} />
              <ActivityIndicator size="large" color="#000" style={{ marginTop: hp('40%') }} />
          </View>
      );
  }
    return (
      <View style={styles.container}>
        <HeaderBar pageName = 'Alloted Classes' navigation = {this.props.navigation} />
        <CalendarList style={styles.calendarContainer}
          //horizontal={true}
          pastScrollRange={1}
          futureScrollRange={1}
          markedDates={this.state.dates}
          onDayPress={(day) => {
            this.props.navigation.navigate('Event', { day: day.dateString });
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
  },
  calendarContainer: {
    borderWidth: 0.7,
    borderColor: 'black',
  },
  overlayStyle: {
    height: hp('50%')
  }
})