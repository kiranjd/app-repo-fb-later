import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

export default class LeftComponent extends Component {
    render() {
        return (
            <Icon
                name='menu' 
                color='#fff'
                onPress = {this.props.onPress}
            />
        );
    }
}