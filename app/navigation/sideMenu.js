import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, StatusBar, PermissionsAndroid, ToastAndroid } from 'react-native';
import { Icon } from 'react-native-elements';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            displayName: '',
            profileUrl: '',
            ImageSource: '',
            data: '',
        }

        requestCameraPermission();
        async function requestCameraPermission() {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                  title: 'SVJK requires your permission to record audio',
                  message:
                    '',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
                },
              );
              const grantedAudio = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                  title: 'SVJK requires your permission to record audio',
                  message:
                    '',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
                },
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
              } else {
                console.log('Camera permission denied');
              }
            } catch (err) {
              console.warn(err);
            }
          }
    }

    componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ 
                    user: user.toJSON(),
                    displayName: user.displayName,
                    profileUrl: user.photoURL, 
                });
                fetch('http://139.59.69.143/api/postUserData.php', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      "name": user.displayName,
                      "uuid": user.uid,
                      "mobile": user.phoneNumber,
                      "email": user.email,
                    }),
                  });
            } else {
                this.setState({
                    user: null,
                });
                
            }
        });
    }

    randomString(length) {
        return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
    }

    uploadImage() {
        let url = "http://139.59.69.143/profileImageUpload.php";

        RNFetchBlob.fetch('POST', url, {
            'Content-Type': 'multipart/form-data',
          }, [
              { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
            ]).then((response) => {
                console.log(response);
                let imageData = response.json();
                imageData = 'http://'+ decodeURIComponent(imageData.imageUrl);
                console.log('url:',imageData);
                var user = firebase.auth().currentUser;
                console.log(user);
                user.updateProfile({
                    photoURL: `${imageData}`
                }); 
                this.setState({ 
                    profileUrl: imageData, 
                })
                // .then(() => {
 
                //     ToastAndroid.show('Profile picure updated', ToastAndroid.SHORT);
                // }).catch(function (error) {
                //     console.log(error)
                // });
            }).catch((err) => {
              console.log(err);
            })
    }

    pickImage() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                this.setState({
                    ImageSource: source,
                    data: response.data,
                });
                this.uploadImage();
            }
        });
    }

    render() {
        signOutUser = async () => {
            
            try {
                await firebase.auth().signOut(); 
                this.props.navigation.navigate('Login');
                console.log('out');       
            } catch (e) {
                console.log(e);
            }
        }
        // alert(this.state.profileUrl);
        return (
            <View style={styles.container}>
                <View style={styles.profileDetails}>
                <StatusBar backgroundColor="blue" animated />
                    <Button title="SVJK" onPress={() => { this.props.navigation.navigate('Home') }} />
                    <TouchableOpacity onPress={() => this.pickImage()}>
                        <Image containerStyle={styles.imageContainer} style={styles.profileImage} source={{uri: this.state.profileUrl}}/>
                    </TouchableOpacity>
                    <Text style={styles.profileName}>{this.state.displayName}</Text>
                </View>
                <View style={styles.pages}>
                    <TouchableOpacity activeOpacity={0.2} underlayColor={'black'}>
                        <View style={styles.iconWithText}>
                            <Icon name='play' type='evilicon' color='white' />
                            <Text style={styles.pagesList} onPress={() => { this.props.navigation.navigate('Last Classes') }}>Last Classes</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <View style={styles.iconWithText}>
                        <Icon name='link' type='evilicon' color='white' />
                        <Text style={styles.pagesList} onPress={() => { this.props.navigation.navigate('Profile') }}>Profile</Text>
                    </View> */}
                    <View style={styles.iconWithText}>
                        <Icon name='calendar' type='evilicon' color='white' />
                        <Text style={styles.pagesList} onPress={() => { this.props.navigation.navigate('Calendar') }}>Calendar</Text>
                    </View>
                    {/* <View style={styles.iconWithText}>
                        <Icon name='chart' type='evilicon' color='white' />
                        <Text style={styles.pagesList} onPress={() => { this.props.navigation.navigate('Help') }}>Help</Text>
                    </View> */}
                    <View style={styles.iconWithText}>
                        <Icon name='chart' type='evilicon' color='white' />
                        <Text style={styles.pagesList} onPress={() => { this.props.navigation.navigate('UpdateProfile') }}>Update Profile</Text>
                    </View>
                    <View style={styles.iconWithText}>
                        <Icon name='plus' type='evilicon' color='white' />
                        <Text style={styles.pagesList} onPress={() => { this.props.navigation.navigate('Credits') }}>Credits</Text>
                    </View>
                    <View style={styles.iconWithText}>
                        <Icon name='star' type='evilicon' color='white' />
                        <Text style={styles.pagesList} onPress={() => { this.props.navigation.navigate('Students') }}>New Requests</Text>
                    </View>
                    <View style={styles.iconWithText}>
                        <Icon name='link' type='evilicon' color='white' />
                        <Text style={styles.pagesList} onPress={() => { this.props.navigation.navigate('WebviewTC') }}>Terms And Conditions</Text>
                    </View>
                    <View style={styles.iconWithText}>
                        <Icon name='unlock' type='evilicon' color='white' />
                        <Text style={styles.pagesList} onPress={() => { this.props.navigation.navigate('WebviewPrivacy') }}>Privacy Policy</Text>
                    </View>
                    {/* <View style={styles.iconWithText}>
                        <Icon name='credit-card' type='evilicon' color='white' />
                        <Text style={styles.pagesList} onPress={() => { this.props.navigation.navigate('LinkMobile') }}>Link Mobile</Text>
                    </View> */}
                    <View style={styles.iconWithText}>
                        <Icon name='close' type='evilicon' color='white' />
                        <Text style={styles.pagesList} onPress={() => { signOutUser() }}>Logout</Text>
                    </View>
                    
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#70A5F1',
    },
    pages: {
        backgroundColor: '#70A5F1',
    },
    iconWithText: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageContainer: {
        opacity: 0.9,
    },
    profileDetails: {

    },
    image: {

    },
    profileImage: {
        marginTop: hp('2%'),
        marginLeft: wp('15%'),
        width: 150, height: 150,
        borderRadius: 200/ 2,
        borderWidth: 3,
        backgroundColor: 'black',
        borderColor: 'white',
    },
    pagesList: {
        fontSize: wp('3.5%'),
        padding: wp('1.5%'),
        margin: 1,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'monospace',
    },

    profileName: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        marginTop: hp('2%'),
        marginBottom: hp('2%'),
        fontSize: 20
    }
})

const options = {
    title: 'Profile picture',
    cameraType: 'front',
    maxWidth: 5000,
    maxHeight: 5000
};