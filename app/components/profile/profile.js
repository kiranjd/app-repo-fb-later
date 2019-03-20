import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { ListItem } from 'react-native-elements';
import HeaderBar from '../common/headerBar';
import firebase from 'react-native-firebase';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      displayName: '',
      profileUrl: '',
    }
  }

  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  componentDidMount() {
    //SplashScreen.hide();
    //this.props.navigation.navigate('Login');
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user);
            this.setState({ user: user.toJSON(), displayName: user.displayName, profileUrl: user.photoURL+'?height=200' });
            //this.props.navigation.navigate('Home');
        } else {
            // User has been signed out, reset the state
            this.setState({
                user: null,
            });
            this.props.navigation.navigate('Login');
        }
    });
}

  render() {
    return (
      <View style={styles.container}>
          <HeaderBar navigation={this.props.navigation}/>
        <Image style={styles.header} source={require('../Images/wall.jpg')} />
        <TouchableOpacity style={styles.avatar}>
        <Avatar 
        size="xlarge"
        rounded
        showEditButton='true'
        editButton={{color:'black'}}
          source={{
            uri:
              this.state.profileUrl,
          }}
          onEditPress=''
        />
  </TouchableOpacity>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{this.state.displayName}</Text>
            <Text style={styles.info}>UX Designer / Mobile developer</Text>
            <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam.
               Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an</Text>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text onPress={this._onPressButton} >Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  header: {
    backgroundColor: "#00BFFF",
    height: 200,
  },
  avatar: {
    width: wp('32%'), 
    height: hp('18%'),
    // borderRadius: 63,
    // borderWidth: 4,
    // borderColor: "red",
    alignSelf: 'center',
    position: 'absolute',
    marginTop: hp('23%'),
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  }
});