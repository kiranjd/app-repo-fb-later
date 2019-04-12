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

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Home');
      return true;
    });
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
          onDayPress={(day)=>{console.log('day pressed', day)}}
        />
        <Overlay 
          isVisible = {this.state.showOverlay}
          style = {styles.overlayStyle}
          height = {hp('70%')}
          width = { wp('90%') }
        >
          <TouchableOpacity onPress = { () => this.
          setState({showOverlay: false})}>
            <FlatList
              data={[
                {key: '6am', name: 'Ashwin Kuthrapalli'},
                {key: '7am', name: 'Ramraj Rao'},
                {key: '8am'},
                {key: '9am', name: 'Ramesh NV'},
                {key: '10am'},
                {key: '11am'},
                {key: '12pm', name: 'Ramesh NV'},
                {key: '1pm'},
                {key: '2pm'},
                {key: '3pm', name: 'Ramraj Rao'},
                {key: '4pm'},
                {key: '5pm'}, 
                {key: '6pm'},
                {key: '7pm', name: 'Ashwin Kuthrapalli'},
                {key: '8pm'},
                {key: '9pm'},
              ]}
              renderItem={({item}) => 
              <Card>
              <View style={{flexDirection: 'row', margin: 0, alignItems: 'center'}}>
                <View style = {{ width: wp('20%')}}>
                  <Text style = {{fontSize: 25, fontWeight: 'bold', justifyContents: 'flex-start'}}>{item.key}</Text>
                </View>
                <View>
                  <Text style = {{fontSize: 18, fontWeight: 'bold', color: `${item.name? 'blue': 'red'}`, justifyContents: 'center'}}>{item.name? item.name: 'No class'}</Text>
                </View>
                </View>
              </Card>
              }
            />
          </TouchableOpacity>
        </Overlay>
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