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
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import HeaderBar from '../common/headerBar';
import { mainStyles } from '../../MainStyles';
import { ListItem, Icon, Input, CheckBox, ButtonGroup, Button } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import CustomCheckbox from './customCheckBox';

export default class AboutMe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profession: '',
            qualification1: '',
            qualification2: '',
            qualification3: '',
            classes: [],
            boards: [],
            classItoV: [],
            classVItoVIII: [],
            classIXtoX: [],
            classXItoXII: [],
            price: '',
            intro: ''
        }
        this.filterUser = this.filterUser.bind(this);
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('UpdateProfile');
            return true;
        });
    }

    radioButonProf(value, valueName) {
        if (value === 'other') {
            return (
                <View>
                    <CheckBox
                        left
                        title={valueName}
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.profession === value}
                        onPress={() => this.setState({ profession: value })}
                    />
                    { this.state.profession === 'other' &&
                    <Input
                        placeholder='Age'
                        containerStyle={mainStyles.inputContainer}
                        value={this.state.profession}
                        onChangeText={() => this.setState({profession: this.state.profession})}
                    />
                    }
                </View>
            );
        }
        return (
            <CheckBox
                left
                title={valueName}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.profession === value}
                onPress={() => this.setState({ profession: value })}
            />
        );
    }

    radioButonSex(value, valueName) {
        return (
            <CheckBox
                left
                title={valueName}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.sex === value}
                onPress={() => this.setState({ sex: value })}
            />
        );
    }

    qualification(control) {
        if (control === 'q1') {
            return (
                <Input
                    containerStyle={mainStyles.inputContainer}
                    value={this.state.qualification1}
                    onChangeText={() => this.setState({ qualification1: this.state.qualification1 })}
                />
            );
        }
        if (control === 'q2') {
            return (
                <Input
                    containerStyle={mainStyles.inputContainer}
                    value={this.state.qualification2}
                    onChangeText={() => this.setState({ qualification2: this.state.qualification2 })}
                />
            );
        }
        if (control === 'q3') {
            return (
                <Input
                    containerStyle={mainStyles.inputContainer}
                    value={this.state.qualification3}
                    onChangeText={() => this.setState({ qualification3: this.state.qualification3 })}
                />
            );
        }
    }

    filterUser(filterValue, checked, type){
        switch(type) {
            case 'classes':
                this.classesArrayUpdate(filterValue, checked);
                break;
            case 'boards': 
                this.boardsArrayUpdate(filterValue, checked);
                break;
            case 'classItoV':
                this.classItoVArrayUpdate(filterValue, checked);
                break;
            case 'classVItoVIII':
                this.classVItoVIIIArrayUpdate(filterValue, checked);
                break;
            case 'classIXtoX':
                this.classIXtoXArrayUpdate(filterValue, checked);
                break;
            case 'classXItoXII':
                this.classXItoXIIArrayUpdate(filterValue, checked);
                break;
            default: break;
        }

    }

    classesArrayUpdate(filterValue, checked) {
        //console.log('type', type);
        let { classes } = this.state;
        if(checked) {
            if(!classes.includes(filterValue)) {
                classes.push(filterValue);
            }
        }
        else {
            if(classes.includes(filterValue)) {
                classes.splice(classes.indexOf(filterValue), 1);
            }
        }
        console.log('array', this.state.classes, 'insert?', checked);
      }

      boardsArrayUpdate(filterValue, checked){

        let { boards } = this.state;
        if(checked) {
            if(!boards.includes(filterValue)) {
                boards.push(filterValue);
            }
        }
        else {
            if(boards.includes(filterValue)) {
                boards.splice(boards.indexOf(filterValue), 1);
            }
        }
        console.log('array boards', this.state.boards, 'insert?', checked);
      }

      classItoVArrayUpdate(filterValue, checked){
        let { classItoV } = this.state;
        if(checked) {
            if(!classItoV.includes(filterValue)) {
                classItoV.push(filterValue);
            }
        }
        else {
            if(classItoV.includes(filterValue)) {
                classItoV.splice(classItoV.indexOf(filterValue), 1);
            }
        }
        console.log('array', this.state.classItoV, 'insert?', checked);
      }

      classVItoVIIIArrayUpdate(filterValue, checked){
        let { classVItoVIII } = this.state;
        if(checked) {
            if(!classVItoVIII.includes(filterValue)) {
                classVItoVIII.push(filterValue);
            }
        }
        else {
            if(classVItoVIII.includes(filterValue)) {
                classVItoVIII.splice(classVItoVIII.indexOf(filterValue), 1);
            }
        }
        console.log('array', this.state.classVItoVIII, 'insert?', checked);
      }

      classIXtoXArrayUpdate(filterValue, checked){
        let { classIXtoX } = this.state;
        if(checked) {
            if(!classIXtoX.includes(filterValue)) {
                classIXtoX.push(filterValue);
            }
        }
        else {
            if(classIXtoX.includes(filterValue)) {
                classIXtoX.splice(classIXtoX.indexOf(filterValue), 1);
            }
        }
        console.log('array', this.state.classIXtoX, 'insert?', checked);
      }

      classXItoXIIArrayUpdate(filterValue, checked){
        let { classXItoXII } = this.state;
        if(checked) {
            if(!classXItoXII.includes(filterValue)) {
                classXItoXII.push(filterValue);
            }
        }
        else {
            if(classXItoXII.includes(filterValue)) {
                classXItoXII.splice(classXItoXII.indexOf(filterValue), 1);
            }
        }
        console.log('array', this.state.classXItoXII, 'insert?', checked);
      }

    checkBoxClasses() {
        return ['Class I to V', 'Class VI to VIII', 'Class IX to X', 'Class XI to XII'].map((tag, index) => {
            return <CustomCheckbox key={index} tag={tag} type='classes' filterUser={this.filterUser}/>;
        });
    }

    checkBoxBoard() {
        return ['CBSE', 'ICSE', 'IB/IGSE', 'State'].map((tag, index) => {
            return <CustomCheckbox key={index} tag={tag}  type='boards' filterUser={this.filterUser}/>;
        });
    }

    checkBoxItoV() {
        return ['All subjects', 'Mathematics', 'English', 'Hindi', 'EVS/Social Studies'].map((tag, index) => {
            return <CustomCheckbox key={index} tag={tag} type='classItoV' filterUser={this.filterUser}/>;
        });
    }

    checkBoxVItoVIII() {
        return ['All subjects', 'Mathematics', 'English', 'Hindi', 'Science', 'Social Studies'].map((tag, index) => {
            return <CustomCheckbox key={index} tag={tag} type='classVItoVIII' filterUser={this.filterUser}/>;
        });
    }

    checkBoxIXtoX() {
        return ['Mathematics', 'English', 'Hindi', 'Science', 'Social Studies'].map((tag, index) => {
            return <CustomCheckbox key={index} tag={tag} type='classIXtoX' filterUser={this.filterUser}/>;
        });
    }

    checkBoxXItoXII() {
        return ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'Accounts', 'Economics', 'Business Studies', 'Computer Science'].map((tag, index) => {
            return <CustomCheckbox key={index} tag={tag} type='classXItoXII' filterUser={this.filterUser}/>;
        });
    }

    submitData() {
        //alert('data');
        let billUser = '123';
        let bodyStr = "data=" + encodeURIComponent(this.state.boards);
        bodyStr += "data2=" + encodeURIComponent(billUser);

        var json_arr = JSON.stringify(this.state.boards);
        var data= new FormData();
        data.append ('data', json_arr);

        console.log('boards state',JSON.stringify(this.state.boards));
        let url = "http://139.59.69.143/postAboutMe.php";
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                //'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: data
        })
        .then(response => {
            console.log(response.text());
            alert('Your details have been updated successfully');
            this.props.navigation.navigate('Home');
        })
        .catch(err => console.log(err))
    }


    render() {
        return (
            <View>
                <HeaderBar pageName='About Me' navigation={this.props.navigation} />
                <ScrollView>
                    <View style={mainStyles.cardContainer}>
                        <Text style={mainStyles.formHead}>Age</Text>
                        <Text style={mainStyles.formSub}>Please tell us your age</Text>
                        <Input
                            placeholder='Age'
                            containerStyle={mainStyles.inputContainer}
                            value={this.state.age}
                            onChangeText={() => this.setState({age: this.state.age})}
                        />
                    </View>
                    <View style={mainStyles.cardContainer}>
                        <Text style={mainStyles.formHead}>Profession</Text>
                        <Text style={mainStyles.formSub}>Please select your profession</Text>

                        {this.radioButonProf('student', 'Student')}
                        {this.radioButonProf('schoolTeacher', 'School Teacher')}
                        {this.radioButonProf('fullTimeTutor', 'Full Time Tutor')}
                        {this.radioButonProf('corporateProfessional', 'Corporate Professional')}
                        {this.radioButonProf('other', 'Other')}
                    </View>
                    <View style={mainStyles.cardContainer}>
                        <Text style={mainStyles.formHead}>Gender</Text>
                        {this.radioButonSex('male', 'Male')}
                        {this.radioButonSex('female', 'Female')}
                        {this.radioButonSex('other', 'Other')}
                    </View>
                    <View style={mainStyles.cardContainer}>
                        <Text style={mainStyles.formHead}>How many years of tutoring experiance do you have?</Text>
                        <Input
                            placeholder='Experience'
                            containerStyle={mainStyles.inputContainer}
                            value={this.state.experience}
                            onChangeText={() => this.setState({experience: this.state.experience})}
                        />
                    </View>
                    <View style={mainStyles.cardContainer}>
                        <Text style={mainStyles.formHead}>Qualification</Text>
                        <Text style={mainStyles.formSub}>Please tell us your qualification</Text>
                        {this.qualification('q1')}
                        {this.qualification('q2')}
                        {this.qualification('q3')}
                    </View>
                    <View style={mainStyles.cardContainer}>
                        <Text style={mainStyles.formHead}>Boards Taught</Text>
                        <Text style={mainStyles.formSub}>Please select the board whose syllabi you're confortable with</Text>
                        {this.checkBoxBoard()}
                    </View>
                    <View style={mainStyles.cardContainer}>
                        <Text style={mainStyles.formHead}>Classes Taught</Text>
                        <Text style={mainStyles.formSub}>Please select the classes that you teach</Text>
                        {this.checkBoxClasses()}
                    </View>
                    <View style={mainStyles.cardContainer}>
                        <Text style={mainStyles.formHead}>In Class I to V, subjects taught</Text>
                        <Text style={mainStyles.formSub}>Please select the classes that you teach</Text>
                        {this.checkBoxItoV()}
                    </View>
                    <View style={mainStyles.cardContainer}>
                        <Text style={mainStyles.formHead}>In Class VI to VIII, subjects taught</Text>
                        <Text style={mainStyles.formSub}>Please select the classes that you teach</Text>
                        {this.checkBoxVItoVIII()}
                    </View>
                    <View style={mainStyles.cardContainer}>
                        <Text style={mainStyles.formHead}>In Class IX to X, subjects taught</Text>
                        <Text style={mainStyles.formSub}>Please select the classes that you teach</Text>
                        {this.checkBoxIXtoX()}
                    </View>
                    <View style={mainStyles.cardContainer}>
                        <Text style={mainStyles.formHead}>In Class XI to XII, subjects taught</Text>
                        <Text style={mainStyles.formSub}>Please select the classes that you teach</Text>
                        {this.checkBoxXItoXII()}
                    </View>
                    <View style={mainStyles.cardContainer}>
                        <Text style={mainStyles.formHead}>Price for 12 tution classes</Text>
                        <Text style={mainStyles.formSub}>Your fees for 12 tution classes in a month</Text>
                        <Input
                            containerStyle={mainStyles.inputContainer}
                            value={this.state.price}
                            onChangeText={() => this.setState({price: this.state.fees})}
                        />
                        <Text style={mainStyles.formSub}>Rs. per month</Text>
                    </View>
                    <View style={mainStyles.cardContainer}>
                        <Text style={mainStyles.formHead}>Introduction</Text>
                        <Text style={mainStyles.formSub}>PLease tell us a bit about yourself</Text>
                        <Input
                            containerStyle={mainStyles.inputBoxContainer}
                            value={this.state.intro}
                            onChangeText={() => this.setState({intro: this.state.intro})}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <Button title="Submit" onPress={this.submitData.bind(this)} buttonStyle={{marginHorizontal: wp('2.5%'), borderRadius: 6}}/>
                    <View style={{ height: hp('10%') }} />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: wp('100%'),
        height: hp('100%'),
    },
});
