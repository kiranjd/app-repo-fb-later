import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, StatusBar, ToastAndroid } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { NodeCameraView } from 'react-native-nodemediaclient';
import Orientation from 'react-native-orientation';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer'
//import { AndroidBackHandler } from 'react-navigation-backhandler';

export default class GoLive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            publishBtnTitle: 'START PUBLISH',
            isPublish: false,
            time: '00:00',
            color: 'red',
            stopwatchStart: false,
            stopwatchReset: false,
        }
    }

    componentDidMount() {
        Orientation.lockToLandscape();
    }

    getFormattedTime(time) {
        this.currentTime = time;
    };

    toggleStopwatch() {
        this.setState({ stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false });
    };

    resetStopwatch() {
        this.setState({ stopwatchStart: false, stopwatchReset: true });
    }

    render() {
        const { color } = this.state;
        recordButtonStyle = function () {
            return {
                borderRadius: 100,
                width: 70,
                height: 70,
                borderRadius: 200 / 2,
                borderWidth: 3,
                backgroundColor: color,
                borderColor: 'white'
            }
        }
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden={true} />
                <Overlay
                    isVisible={true}
                    overlayStyle={{
                        position: 'absolute',
                        backgroundColor: 'transparent',
                        flex: 1,
                        borderWidth: 0,
                        elevation: 0,
                    }}
                    fullScreen={true}
                >
                    {this.state.isPublish && <View>
                        <Stopwatch start={this.state.stopwatchStart}
                            reset={this.state.stopwatchReset}
                            options={options}
                            getTime={this.getFormattedTime} />
                    </View>}

                    {!this.state.isPublish && <View style={{height: 37}}></View>}
                    <View style={{ flexDirection: 'row', top: '35%', left: '80%' }}>
                        <TouchableOpacity>
                            <Button
                                buttonStyle={recordButtonStyle()}
                                onPress={() => {
                                    if (this.state.isPublish) {
                                        this.setState({
                                            publishBtnTitle: 'Start Publish',
                                            isPublish: false,
                                            color: 'red'
                                        });
                                        this.resetStopwatch();
                                        this.vb.stop();
                                        ToastAndroid.show('Publish Ended', ToastAndroid.LONG);
                                        this.props.navigation.navigate('Home')
                                    } else {
                                        this.setState({
                                            publishBtnTitle: 'Stop Publish',
                                            isPublish: true,
                                            color: 'green'
                                        });
                                        this.toggleStopwatch();
                                        this.vb.start();
                                        ToastAndroid.show('Publish Started', ToastAndroid.SHORT);
                                    }
                                }}
                                //title={this.state.publishBtnTitle}
                                color="#841584"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
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
                                buttonStyle={{
                                    height: hp('8%'),
                                    width: hp('8%'),
                                    backgroundColor: 'transparent',
                                    marginTop: hp('0.5%'),
                                    marginLeft: wp('14%')
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </Overlay>

                <NodeCameraView
                    style={{ height: '100%' }}
                    ref={(vb) => { this.vb = vb }}
                    outputUrl={"rtmp://testapi.flaplive.com/live/ath_svjk_2"}
                    camera={{ cameraId: 0, cameraFrontMirror: true }}
                    audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
                    video={{ preset: 12, bitrate: 400000, profile: 1, fps: 15, videoFrontMirror: false }}
                    autopreview={true}
                />
            </View>
        );
    }
}

const options = {
    container: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 3,
        borderRadius: 100,
        width: 110,
    },
    text: {
        fontSize: 20,
        color: '#FFF',
        marginLeft: 7,
    }
};