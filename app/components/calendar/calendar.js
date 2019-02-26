import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import HeaderBar from '../common/headerBar';
//

export default class calendars extends Component {
    render() {
        return (
            <View>
                 <HeaderBar navigation={this.props.navigation}/>
                <CalendarList style={styles.container}
                    horizontal={true}
                    markedDates={{
                        '2019-02-15': { selected: true, marked: false, selectedColor: 'blue' },
                        '2019-02-03': { selected: true, selectedColor: 'red' },
                        '2019-02-10': { selected: true, selectedColor: 'red' },
                        '2019-02-17': { selected: true, selectedColor: 'red' },
                        '2019-02-24': { selected: true, selectedColor: 'red' },

                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'black',
        height: 350,
    }
})
