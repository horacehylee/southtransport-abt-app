import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
} from 'react-native';
import moment from "moment-timezone"
require("moment/locale/zh-hk")
import { parseString } from "react-native-xml2js"
import ListItemView from "./../components/ListItemView"
import ListDivider from "./../components/ListDivider"
import { Theme } from "./../theme"
import isEmpty from "lodash/isEmpty"

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