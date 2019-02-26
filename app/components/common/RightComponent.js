import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

export default class RightComponent extends Component {
    render() {
        return (
            <Icon
                name='home' 
                color='#fff'
                onPress = {this.props.onPress}
            />
        );
    }
}