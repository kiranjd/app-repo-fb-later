import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ToastAndroid,
    KeyboardAvoidingView,
    BackHandler,
    Alert,
    ActivityIndicator
} from 'react-native';
import Dialog from "react-native-dialog";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import HeaderBar from '../common/headerBar';
import { mainStyles } from '../../MainStyles';
import { ListItem, Icon } from 'react-native-elements'

export default class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            userType: '',
            fetchingLocation: false,
            inputPopup: false
        }
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Home');
            return true;
        });
    }

    findCoordinates = () => {
        this.setState({ fetchingLocation: true });
        //alert('function');
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({ fetchingLocation: false });
                let lat = position.coords.latitude;
                let long = position.coords.longitude;
                Alert.alert(
                    'Location obtained',
                    'Current location is updated as your service location',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: true },
                );
                const location = JSON.stringify(position);
                console.log(location['coords'], location);
                this.setState({ location });
            },
            error => {
                console.log(error.message);
                alert("Please make sure you have enabled geo-location service and try again")
                this.setState({ fetchingLocation: false });
            },
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        );
    };

    render() {
        const { firstName, lastName, email } = this.state;
        let navigation = this.props.navigation;
        return (
            <View>
                <HeaderBar pageName='Update Profile' navigation={this.props.navigation} />
                <View>
                    <Dialog.Container visible={this.state.inputPopup}>
                        <Dialog.Title>Service Range</Dialog.Title>
                        <Dialog.Description>
                            Enter your service range
                        </Dialog.Description>
                        <Dialog.Input label="Range in kilo meters" style={{borderWidth: 1, borderRadius: 5}}/>
                        <Dialog.Button label="OK"  onPress={() => {
                                alert('Service range has been updated');
                                this.setState({inputPopup: false});
                            }
                            }/>
                        <Dialog.Button label="Cancel" onPress={() => this.setState({inputPopup: false})}/>
                    </Dialog.Container>
                </View>
                <View style={mainStyles.cardContainer}>
                    <ListItem title="About Me" onPress={() => navigation.navigate('AboutMe')}
                        rightIcon={
                            <Icon
                                name='arrow-forward'
                                color='#000'
                            />
                        }
                    />
                    <ListItem title="Identity Verification" onPress={() => navigation.navigate('IdentityVerification')}
                        rightIcon={
                            <Icon
                                name='arrow-forward'
                                color='#000'
                            />
                        }
                    />
                    <ListItem title="Service Location" onPress={this.findCoordinates}
                        rightIcon={
                            <View>
                                { 
                                !this.state.fetchingLocation? 
                                <Icon
                                    name='arrow-forward'
                                    color='#000'
                                />
                                :
                                <ActivityIndicator color='#000'/>
                                }
                            </View>
                        }
                    />
                     <ListItem title="Service Range" onPress={() => this.setState({inputPopup: true})}
                        rightIcon={
                            <View>
                                <Icon
                                    name='arrow-forward'
                                    color='#000'
                                />
                            </View>
                        }
                    />
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: wp('100%'),
        height: hp('100%'),
    },
});
