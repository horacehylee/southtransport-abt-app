import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
 } from 'react-native';

 class RTHKNews extends Component {
     state = {  }
     render() {
         return (
             <View style={styles.container}>
                 <Text>Hello</Text>
             </View>
         );
     }
 }

 const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    }
 })
 
 export default RTHKNews;