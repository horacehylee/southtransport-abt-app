import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

class ListItemView extends Component {
    state = {}
    render() {
        return (
            <View style={[
                (this.props.index == 0) ? styles.firstItem : null,
                (this.props.index == this.props.data.length - 1) ? styles.lastItem : null,
                {backgroundColor: "white"}
            ]}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    firstItem: {
        paddingTop: 8,
    },
    lastItem: {
        paddingBottom: 8,
    },
})

export default ListItemView;