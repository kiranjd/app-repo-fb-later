import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ToastAndroid,
    KeyboardAvoidingView,
    BackHandler
} from 'react-native';
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
        }
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Home');
            return true;
        });
    }

    render() {
        const { firstName, lastName, email } = this.state;
        let navigation = this.props.navigation;
        return (
            <View>
                <HeaderBar pageName='Update Profile' navigation={this.props.navigation} />
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
                    <ListItem title="Service Location" onPress={() => navigation.navigate('ServiceLocation')}
                        rightIcon={
                            <Icon
                                name='arrow-forward'
                                color='#000'
                            />
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
