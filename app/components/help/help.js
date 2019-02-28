import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import HeaderBar from '../common/headerBar';
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class Help extends Component {
    render() {
        return (
            // <View style={styles.container}>
            //     <Text style={styles.info}>Computer Prof.</Text>
            //     <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>

            // </View>
            <View style={styles.container}>
                <HeaderBar navigation={this.props.navigation} />
                <View style={{justifyContent: 'center',alignItems: 'center', marginTop: 10}}>
                <View style={{width: wp('90%'), flexDirection: 'row', borderRadius: 100, justifyContent: 'center',alignItems: 'center', backgroundColor: 'skyblue' , paddingBottom: 10, paddingTop: 0}}>
                    <View style={{ marginRight: 20, marginTop: 10 }}>
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    </View>
                    <View style={{height: hp('5%'), justifyContent: 'center',alignItems: 'center', marginBottom: 5 }}>
                        <TextField
                            label='Phone number'
                            animationDuration='200'
                            containerStyle={{width: wp('70%')}}
                        />
                    </View>
                </View>
                </View>
                <View style={StyleSheet.inputWithIcon}>
                    <View>
                        <Icon
                            name='user'
                            size={24}
                            color='black'
                        />
                    </View>
                    <View>
                        <TextField
                            label='Phone number'
                            animationDuration='255'
                            containerStyle={styles.input}
                        />
                    </View>
                </View>
                <ListItem
                    title='FAQ'
                    titleStyle={{ color: 'black', fontWeight: 'bold' }}
                />
                <ListItem
                    title='Contact us'
                    titleStyle={{ color: 'black', fontWeight: 'bold' }}
                    subtitle='Questions? Need help?'
                />
                <ListItem
                    title='Terms and Privacy Policy'
                    titleStyle={{ color: 'black', fontWeight: 'bold' }}
                />
                <ListItem
                    title='App info'
                    titleStyle={{ color: 'black', fontWeight: 'bold' }}
                />
            </View>
        )
    }

}
const styles = StyleSheet.create({
    inputWithIcon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    input: {
        width: wp('70%'),
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
    container: {
        flex: 1,
    }
});