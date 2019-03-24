import React, { Component } from 'react';
import { View, StatusBar, WebView, Linking, BackHandler } from 'react-native';
import Orientation from 'react-native-orientation';

export default class WebViewForVideo extends Component {
    componentDidMount() {
        Orientation.lockToLandscape();
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Last Classes');
            return true;
        });
    }

    componentWillUnmount() {
            Orientation.lockToPortrait();
    }
  render() {
     // alert(this.props.navigation.getParam('videoUrl', 'default'));
    const uri = this.props.navigation.getParam('videoUrl', 'default');
    return (        
      <WebView
        ref={(ref) => { this.webview = ref; }}
        source={{ uri }}
      />
    );
  }
}