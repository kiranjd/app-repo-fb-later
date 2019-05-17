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
                placement="left"
                leftComponent={<LeftComponent onPress={() => this.props.navigation.toggleDrawer()} />}
                centerComponent={{ text: this.props.pageName, style: { color: '#fff', fontWeight: "bold", fontSize: 20, marginBottom: 5, fontFamily: 'sans sarif' } }}
                rightComponent={<RightComponent onPress={() => this.props.navigation.navigate('Home')}/>}
                containerStyle={{ 
                    backgroundColor: '#3358d1',
                    height: hp('9%'), 
                    borderBottomWidth: 0, 
                    shadowColor: 'black' ,
                    alignContent: 'center',
                    
                 }}
            />
        );
    }
}