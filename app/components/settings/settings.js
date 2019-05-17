// import React, { Component } from 'react';
// import { List,ListRenderItem, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';




// export default class Settings extends Component {
//     render() {
//         return (
//             <ScrollView>
//                 <List>
//                     <Text> Hello World</Text>
//                     <Text> Hello World</Text>
//                     <Text> Hello World</Text>

//                 </List>
//             </ScrollView>
//         )
//     }
// }


// Can't able to import the list Item



import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { List, FlatList,ListItem,Text,View } from 'react-native-elements';

export default class Settings extends Component {
  render() {
    return (
      <ScrollView>
          
          
          <Text> Hello World </Text>
        {/* <List>
          <ListItem
            title="Notifications"
          />
          <ListItem
            title="Profile"
          />
          <ListItem
            title="Password"
          />
        </List>
        <List>
          <ListItem
            title="Sign Out"
            rightIcon={{ name: 'cancel' }}
          />
        </List> */}
      </ScrollView>
    );
  }
}