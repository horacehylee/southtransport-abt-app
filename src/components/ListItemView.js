import React, { Component } from 'react';
import PropTypes from "prop-types"
import {
    View,
    StyleSheet,
} from 'react-native';
import ListDivider from "./ListDivider"
import renderIf from "./../utils/renderIf"

class ListItemView extends Component {
    state = {}
    render() {
        return (
            <View style={[
                (this.props.index == 0) ? styles.firstItem : null,
                (this.props.index == this.props.data.length - 1) ? styles.lastItem : null,
                { backgroundColor: "white" }
            ]}>
                {this.props.children}
                {renderIf(!this.props.removeDivider, (
                    <ListDivider data={this.props.data} index={this.props.index} />
                ))}
            </View>
        );
    }
}

ListItemView.propTypes = {
    data: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    removeDivider: PropTypes.bool,
}

ListItemView.props = {
    removeDivider: false,
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