import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';

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

    signUpUser() {

    }

    render() {

            const { firstName, lastName, email} = this.state;

            let data = [{
              value: 'Banana',
            }, {
              value: 'Mango',
            }, {
              value: 'Pear',
            }];

        return (
            <ImageBackground source={require('../Images/background.png')} style={styles.backgroundContainer}>
                <Text style={{ fontSize: 35, color: '#AE1EF2', marginLeft: wp('60%'), marginTop: ('60%') }}>
                    Sign Up
                </Text>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('5%') }}>

                    <View style={{
                        width: wp('90%'), height: hp('7%'), flexDirection: 'row', borderRadius: wp('20%'),
                        justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 100, borderWidth: 1, borderColor: '#AE1EF2'
                    }}>
                        <View style={{ marginRight: wp('5%'), marginTop: hp('1%') }}>
                            <Icon
                                name='user'
                                size={24}
                                color='#AE1EF2'
                            />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                label='Full name'
                                animationDuration={255}
                                containerStyle={{ width: wp('70%') }}
                                lineWidth={0}
                                activeLineWidth={0}
                                onChangeText={value => this.setState({ firstName: value })}
                                value={firstName}
                                
                            />
                        </View>
                    </View>

                    <View style={{ width: wp('90%'), marginTop: hp('2%'), height: hp('7%'), flexDirection: 'row', borderRadius: wp('20%'),
                          justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' , borderRadius: 100, borderWidth: 1, borderColor: '#AE1EF2'
                     }}>
                        <View style={{ marginRight: wp('5%'), marginTop: hp('1%') }}>
                            <Icon
                                name='user'
                                size={24}
                                color='#AE1EF2'
                            />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                label='Last name'
                                animationDuration={255}
                                containerStyle={{ width: wp('70%') }}
                                lineWidth={0}
                                activeLineWidth={0}
                                onChangeText={value => this.setState({ lastName: value })}
                                value={lastName}
                            />
                        </View>
                    </View>
                    <View style={{ width: wp('90%'), marginTop: hp('2%'), height: hp('7%'), flexDirection: 'row', borderRadius: wp('20%'),
                          justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 100, borderWidth: 1, borderColor: '#AE1EF2'
                    }}>
                        <View style={{ marginRight: wp('5%'), marginTop: hp('1%') }}>
                            <Icon
                                name='envelop'
                                size={24}
                                color='#AE1EF2'
                            />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                label='Email'
                                animationDuration={255}
                                containerStyle={{ width: wp('70%') }}
                                lineWidth={0}
                                activeLineWidth={0}
                                onChangeText={value => this.setState({ email: value })}
                                value={email}
                            />
                        </View>
                    </View>
                    <Dropdown
        label='Favorite Fruit'
        data={data}
      />

                    <View style={{ flexDirection: 'row',marginTop:hp('1%')}}>
                        <TouchableOpacity onPress={() => this.signUpUser()}>
                            <Text
                                style={{
                                    width: wp('30%'),
                                    height: 40,
                                    color: 'white',
                                    textAlign: 'center',
                                    marginRight: wp('70%'),
                                    backgroundColor: '#AE1EF2',
                                    borderBottomRightRadius: 20,
                                    borderTopRightRadius: 20,
                                    padding: '2%',
                                }}
                            >Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: wp('100%'),
        height: hp('100%'),
        justifyContent: 'center',
    },
});
