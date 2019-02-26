import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import HeaderBar from '../common/headerBar';
import { TextField } from 'react-native-material-textfield';



export default class Help extends Component {
    render() {
        return (
            // <View style={styles.container}>
            //     <Text style={styles.info}>Computer Prof.</Text>
            //     <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>

            // </View>
        <View>
             <HeaderBar navigation={this.props.navigation}/>
             <TextField
        label='Phone number'
      />
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
});