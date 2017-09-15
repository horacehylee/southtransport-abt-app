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
                (this.props.index == 0) ? styles.marginTop : null,
                (this.props.index == this.props.data.length - 1) ? styles.marginBottom : null,
                {backgroundColor: "white"}
            ]}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    marginTop: {
        paddingTop: 8,
    },
    marginBottom: {
        paddingBottom: 8,
    },
})

export default ListItemView;