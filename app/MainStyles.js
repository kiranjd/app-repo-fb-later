import{ StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const mainStyles = StyleSheet.create({
    cardContainer: {
        width: wp('95%'),
        borderWidth: 1,
        alignSelf: 'center',
        borderRadius: 5,
        margin: hp('1%'),
        backgroundColor: '#d3d3d3'
    },
    imagePicker: {
        backgroundColor: '#d3d3d3',
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('20%'),
        width: wp('40%'),
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: wp('3.6%')
    },
    inputContainer: {
        width: wp('80%'),
        borderWidth: 1,
        marginHorizontal: wp('3%'),
        marginVertical: hp('0.5%'),
        borderRadius: 7,
        backgroundColor: '#fff'
    },
    formHead: {
        marginHorizontal: wp('3%'),
        marginTop: hp('0.5%'),
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
    formSub: {
        marginHorizontal: wp('3%'),
    },
    inputBoxContainer: {
        width: wp('80%'),
        borderWidth: 1,
        height: hp('20%'),
        marginHorizontal: wp('3%'),
        marginVertical: hp('0.5%'),
        borderRadius: 7,
        backgroundColor: '#fff',
        
    }
})