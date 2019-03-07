import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, ToastAndroid, BackHandler } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import HeaderBar from '../common/headerBar';
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { NodeCameraView } from 'react-native-nodemediaclient';

export default class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {
            publishBtnTitle: 'START PUBLISH',
            isPublish: false,
            time: 0,
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick() {
        Alert.alert('p');
        this.props.navigation.goBack(null);
        return true;
    }
    

    render() {
        

        return (
            <View style={{ flex: 1 }}>
                <Overlay
                    isVisible={true}
                    overlayStyle={{
                        width: wp('100%'),
                        height: 70,
                        position: 'absolute',
                        bottom: hp('7%'),
                        left: wp('42%'),
                        backgroundColor: 'transparent',
                        flex: 1,
                        flexDirection: 'row',
                        borderWidth: 0,
                        elevation: 0,
                    }}
                >
                    <Button
                        buttonStyle={{
                            borderRadius: 100,
                            width: 70,
                            height: 70,
                            borderRadius: 200 / 2,
                            borderWidth: 3,
                            backgroundColor: 'red',
                            borderColor: 'white'
                        }}
                        onPress={() => {
                            if (this.state.isPublish) {
                                this.setState({ publishBtnTitle: 'Start Publish', isPublish: false });
                                this.vb.stop();
                                ToastAndroid.show('Publish Ended', ToastAndroid.SHORT);
                            } else {
                                this.setState({ publishBtnTitle: 'Stop Publish', isPublish: true });
                                this.vb.start();
                                ToastAndroid.show('Publish Started', ToastAndroid.SHORT);
                            }
                        }}
                        //title={this.state.publishBtnTitle}
                        color="#841584"
                    />
                    <Button
                    onPress={() => {
                        this.vb.switchCamera();
                    }}
                    icon={
                        <Icon
                          name="refresh"
                          size={45}
                          color="white"
                        />
                    }
                    buttonStyle={{height: hp('8%'), width: hp('8%'), backgroundColor: 'transparent',marginTop: hp('0.5%'), marginLeft: wp('14%')}}
                />
                </Overlay>

                <NodeCameraView
                    style={{ height: '100%' }}
                    ref={(vb) => { this.vb = vb }}
                    outputUrl={"rtmp://testapi.flaplive.com/live/ath_svjk"}
                    camera={{ cameraId: 0, cameraFrontMirror: true }}
                    audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
                    video={{ preset: 12, bitrate: 400000, profile: 1, fps: 15, videoFrontMirror: false }}
                    autopreview={true}
                />
            </View>
        );
    }
}
