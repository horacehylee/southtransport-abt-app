import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Linking,
} from "react-native"

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

import { OpenFbPage } from './FacebookButton';

import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Button from "./Button"

import isEmpty from "lodash/isEmpty"

const OpenInstagramPage = (pageId) => {
    if (isEmpty(pageId))
        return
    const url = `https://instagram.com/_u/${pageId}`
    Linking.openURL(url);
}

const OpenTelegram = (pageId) => {
    if (isEmpty(pageId))
        return;
    const url = `https://telegram.me/${pageId}`;
    Linking.openURL(url);
}

class MenuWrapper extends Component {

    menuOptions = [
        {
            title: '南交FB Page',
            onSelect: () => OpenFbPage('southtransport'),
        },
        {
            title: '南交IG',
            onSelect: () => OpenInstagramPage('hksouthtransport'),
        },
        {
            title: '南交TG',
            onSelect: () => OpenTelegram('hksouthtransport'),
        },
        {
            title: '設定',
            onSelect: () => {
                this.props.navigator.push({
                    screen: 'abt.settings',
                    title: '設定',
                    animationType: "fade",
                })
            }
        },
        {
            title: '使用政策',
            onSelect: () => {
                this.props.navigator.push({
                    screen: 'abt.about',
                    title: '使用政策',
                    animationType: "fade",
                })
            }
        },
    ]

    render() {
        return (
            <View>
                <Menu>
                    <MenuTrigger>
                        <View style={styles.buttonContainer}>
                            <Icon name="dots-vertical" style={styles.button} />
                        </View>
                    </MenuTrigger>
                    <MenuOptions style={styles.menuContainer} customStyles={customStyles}>
                        {[...this.menuOptions].map((option, i) => {
                            const onSelect = (option.onSelect) ? option.onSelect : () => console.log(`selected ${option.title}`);
                            return (
                                <MenuOption key={i} style={styles.menuOption} onSelect={onSelect} >
                                    <Text>{option.title}</Text>
                                </MenuOption>
                            )
                        })}
                    </MenuOptions>
                </Menu>
            </View>
        )
    }

    clicked = () => {
        console.log('clicked');
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 12,
        // paddingHorizontal: 16,
    },
    button: {
        color: "white",
        fontSize: 32,
    },
    // menuContainer: {
    //     width: 56,
    //     paddingVertical: 8,
    // },
    optionsContainer: {
        width: 56 * 3,
        paddingVertical: 8,
        margin: 12,
    },
    menuOption: {
        height: 48,
        paddingHorizontal: 16,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});

const customStyles = {
    optionsContainer: styles.optionsContainer,
}

export default MenuWrapper;