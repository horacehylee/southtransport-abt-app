import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    WebView,
} from 'react-native';

class About extends Component {

    render() {
        return (
            <WebView
                source={{ uri: 'https://hksouthtransport-1a188.firebaseapp.com/#/privacy-policy' }}
                javaScriptEnabled={true}
            />
        )
    }
}

export default About;