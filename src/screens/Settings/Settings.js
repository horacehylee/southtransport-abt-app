import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux"
import * as settingsAction from "./actions"

import { Theme } from './../../theme';

import SettingsList from 'react-native-settings-list';
import renderIf from '../../utils/renderIf';

if (!Object.entries)
    Object.entries = function (obj) {
        var ownProps = Object.keys(obj),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array
        while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];

        return resArray;
    };

class Settings extends Component {

    componentDidMount() {
        this.props.actions.loadSettings();
    }

    onValueChange = (groupKey, itemKey) => (value) => {
        this.props.actions.updateSettings(groupKey, itemKey, value);
    }

    onSendTestNotificationPress = () => {
        console.log('onSendTestNotificationPress')
        this.props.actions.sendTestNotification();
    }

    addGroupToArray = (array, settingsObj, settingsOpt) => {
        Object.entries(settingsObj).forEach(([groupKey, groupObj], i) => {
            const groupOpt = settingsOpt[groupKey];
            array.push(
                <SettingsList.Item
                    key={i}
                    hasNavArrow={false}
                    title={groupOpt.title}
                    titleStyle={styles.groupTitle}
                    itemWidth={groupHeight}
                    borderHide={'Both'}
                />
            )
            this.addItemsToArray(array, groupKey, groupObj, groupOpt);
        })
    }

    addItemsToArray = (array, groupKey, groupObj, groupOpt) => {
        Object.entries(groupObj).forEach(([itemKey, itemValue], j) => {
            const itemOpt = groupOpt[itemKey];
            array.push(
                <SettingsList.Item
                    key={j}
                    hasNavArrow={false}
                    itemWidth={itemHeight}
                    titleStyle={styles.itemTitle}
                    hasSwitch={true}
                    switchState={itemValue}
                    switchOnValueChange={this.onValueChange(groupKey, itemKey)}
                    title={itemOpt.title}
                />
            )
        })
    }

    render() {
        const settingsArray = [];
        this.addGroupToArray(settingsArray, this.props.settings, this.props.settingsOptions);
        return (
            <View>
                <SettingsList borderColor='#d6d5d9'>
                    {settingsArray}
                    <SettingsList.Item
                        hasNavArrow={false}
                        itemWidth={itemHeight}
                        titleStyle={styles.itemTitle}
                        hasSwitch={false}
                        onPress={this.onSendTestNotificationPress}
                        title={'通知測試'}
                    />
                </SettingsList>
            </View>
        )
    }
}

const groupHeight = 50;
const itemHeight = 56;

const styles = StyleSheet.create({
    groupTitle: {
        color: Theme.primary,
        marginTop: 12,
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemTitle: {
        color: 'black',
        fontSize: 16,
    }
});

const mapStateToProps = (state, ownProps) => {
    let settingsState = state.get("settings");
    return {
        loading: settingsState.get("loading"),
        settings: settingsState.get("settings").toJS(),
        settingsOptions: settingsState.get("settingsOptions").toJS(),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(settingsAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);