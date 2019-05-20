import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ToastAndroid,
    KeyboardAvoidingView,
    BackHandler,
    Alert,
    ActivityIndicator,
    Picker
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import HeaderBar from '../common/headerBar';
import { mainStyles } from '../../MainStyles';
import { ListItem, Icon, Input, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

export default class UpdateProfile extends Component {
    constructor() {
        super();
        this.state = {
            idType: 'pan',
            avatarSouce: '',
            // name: '',
            // number: ''
        }
    }

    showImage() {
        const imageSource = this.state.ImageSource;
        console.log('avatar', imageSource);
        if (imageSource) {
            return (
                <TouchableOpacity onPress={() => this.pickImage()} >
                    <Image source={{uri: 'data:image/png;base64,'+ imageSource}} style={mainStyles.imagePicker} />
                </TouchableOpacity>
            );
        }
        else {
            return (
                <TouchableOpacity style={mainStyles.imagePicker} onPress={() => this.pickImage()}>
                    <Text style={{ textAlign: 'center', color: 'rgba(0,0,0,0.6)' }}>Click to add or capture image</Text>
                    <View>
                        <Icon name='add' style={{ fontSize: 50, color: 'rgba(0,0,0,0.3)' }} />
                    </View>
                </TouchableOpacity>
            );
        }
    }


    pickImage() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                console.log('image picker response', response);
                const source = response.data;
                this.setState({
                    ImageSource: source,
                    data: response.data,
                    avatarSouce: source
                });
                //console.log('store in state', this.state.ImageSource);
            }
        });
    }

    postData = () => {
        if(this.state.name === '' || this.state.number === '') { 
            alert('Please fill all fields correctly');
            return;
        } 
        setTimeout(function(){alert('Images posted successfully')}, 2000)
    }

    render() {
        return(
            <View>
                <HeaderBar pageName='Idenity Verification' navigation={this.props.navigation} />
                <View style={mainStyles.cardContainer}>
                    <Text style={mainStyles.formHead}>What ID would you like to add?</Text>
                    <View style={mainStyles.inputContainer}>
                    <Picker               
                        selectedValue={this.state.idType}
                        style={{ height: 50, width: wp('80%') }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ idType: itemValue })
                        }>
                        <Picker.Item label="PAN Card" value="pan" />
                        <Picker.Item label="Voter ID" value="voter" />
                        <Picker.Item label="Driver's License" value="dl" />
                        <Picker.Item label="Aadhaar" value="aadhaar" />
                    </Picker>                    
                    </View>
                    <Input
                            placeholder='Name on card'
                            containerStyle={mainStyles.inputContainer}
                            value={this.state.name}
                            onChangeText={() => this.setState({name: this.state.name})}
                    />
                    <Input
                            placeholder='Card number'
                            containerStyle={mainStyles.inputContainer}
                            value={this.state.number}
                            onChangeText={() => this.setState({number: this.state.number})}
                    />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    {this.showImage()} 
                
                    {this.state.idType === 'pan'?null: this.showImage()} 
                </View>
                <Button title="Submit" onPress={this.postData}buttonStyle={{marginHorizontal: wp('2.5%'), borderRadius: 6}}/>
            </View>
        );
    }
}

const options = {
    title: 'Choose image',
    cameraType: 'back',
    maxWidth: 5000,
    maxHeight: 5000
};