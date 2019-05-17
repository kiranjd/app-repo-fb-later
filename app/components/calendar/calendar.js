import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, BackHandler, ActivityIndicator, Alert } from 'react-native';
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
    let datesClass = new Object();
    let url = `http://139.59.69.143/api/markDates.php?uid=${userLocal.uid}`;
    console.log(url);

    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
          responseJson.forEach(element => {
            datesClass[element] = { selected: true, selectedColor: 'orange' };
          });
          console.log(datesClass);
          //console.log(dates);
          this.setState({ dates: datesClass, isLoading: false });
      })

      let datesBlock = new Object();
      let urlBlock = `http://139.59.69.143/api/markBlockDates.php?uid=${userLocal.uid}`;
  
      fetch(urlBlock)
        .then((response) => response.json())
        .then((responseJson) => {
            responseJson.forEach(element => {
              datesBlock[element] = { selected: true, selectedColor: 'red' };
            }); 
              console.log(Object.assign(datesBlock, this.state.dates));
      console.log(datesBlock);
      this.setState({ dates: datesBlock, isLoading: false });
            console.log(datesBlock);
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
          onDayLongPress = { (day) => {
            Alert.alert(
  'Do you want to block the day, ' + day.dateString + '?',
  'You\'ll not be alloted classes for the day if you press \'Yes\'',
  [
    {text: 'Yes', onPress: () => {
      let userLocal = this.state.user;
        let url = `http://139.59.69.143/api/event.php?blockDate=${day.dateString}&uid=${userLocal.uid}`;
        alert(url);
        fetch(url)
          .then((response) => {
              if(response.status == '201') {
                Alert.alert('The day has been blocked successfully');
                this.props.navigation.navigate('Home')
              }
              else {
                Alert.alert('Could not block the day')
              }
          })
          .then((responseJson) => {
              //this.setState({ dataSource: responseJson, isLoading: false });
          })
      }},
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed')
    },
  ],
  {cancelable: true},
);
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