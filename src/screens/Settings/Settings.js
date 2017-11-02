import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';

class Settings extends Component {

    componentDidMount() {
        this.props = {
            ...this.props,
            settings: [
                {
                    title: '通知',
                    children: [
                        {
                            title: '開關',
                            value: true,
                        },
                        {
                            title: '聲音',
                            value: true,
                        }
                    ]
                }
            ]
        };
    }

    render() {
        return (
            <View>
            </View>
        )
    }
}

export default Settings;