import React, { Component } from 'react';
import { Header } from 'react-native-elements';
import LeftComponent from './leftComponent';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RightComponent from './RightComponent';

export default class HeaderBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Header
                placement="center"
                // leftComponent={{ icon: 'menu', color: '#fff' }}
                leftComponent={<LeftComponent onPress={() => this.props.navigation.toggleDrawer()} />}
                centerComponent={{ text: 'CURRENT CLASSES', style: { color: '#fff' } }}
                rightComponent={<RightComponent onPress={() => this.props.navigation.navigate('Home')}/>}
                containerStyle={{ backgroundColor: '#3358ff', height: hp('7%'), borderBottomWidth: 0, shadowColor: 'black' }}
            />
        );
    }
}