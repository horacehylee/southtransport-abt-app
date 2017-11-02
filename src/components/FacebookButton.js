import React, { Component } from 'react';
import {
    View,
    Linking,
} from 'react-native';
import PropTypes from "prop-types"
import Button from "./Button"
import isEmpty from "lodash/isEmpty"

export const OpenFbPage = (pageId) => {
    if (isEmpty(pageId))
        return

    const fbPageUrl1 = `fb://facewebmodal/f?href=https://m.facebook.com/${pageId}`
    Linking.canOpenURL(fbPageUrl1).then(supported => {
        if (supported) {
            Linking.openURL(fbPageUrl1)
        } else {
            const fbPageUrl2 = `fb://page/${pageId}`
            Linking.canOpenURL(fbPageUrl2).then(supported2 => {
                if (supported2) {
                    Linking.openURL(fbPageUrl2)
                }
                else {
                    const fbPageUrl3 = `https://m.facebook.com/${pageId}`
                    Linking.openURL(fbPageUrl3)
                }
            })
        }
    });
}

class FacebookButton extends Component {
    static propTypes = {
        pageId: PropTypes.string.isRequired
    }

    state = {}

    clicked = () => {
        if (isEmpty(this.props.pageId))
            return

        const fbPageUrl1 = `fb://facewebmodal/f?href=https://m.facebook.com/${this.props.pageId}`
        Linking.canOpenURL(fbPageUrl1).then(supported => {
            if (supported) {
                Linking.openURL(fbPageUrl1)
            } else {
                const fbPageUrl2 = `fb://page/${this.props.pageId}`
                Linking.canOpenURL(fbPageUrl2).then(supported2 => {
                    if (supported2) {
                        Linking.openURL(fbPageUrl2)
                    }
                    else {
                        const fbPageUrl3 = `https://m.facebook.com/${this.props.pageId}`
                        Linking.openURL(fbPageUrl3)
                    }
                })
            }
        });
    }

    render() {
        return (
            <View>
                <Button onPress={this.clicked}>
                    {this.props.children}
                </Button>
            </View>
        );
    }
}

export default FacebookButton;