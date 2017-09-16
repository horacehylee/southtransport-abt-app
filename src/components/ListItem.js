import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import renderIf from "./../utils/renderIf"
import isEmpty from "lodash/isEmpty"
import getTimeAgo from "./../utils/getTimeAgo"
import { Theme } from "./../theme"

class ListItem extends Component {
    state = {}
    render() {
        return (
            <View style={[styles.item]}>
                <View style={styles.contentContainer}>
                    {renderIf(!isEmpty(this.props.title),
                        <Text style={[styles.itemTitle, this.props.titleStyle]}>
                            {this.props.title}
                        </Text>
                    )}
                    {renderIf(!isEmpty(this.props.details),
                        <Text style={[styles.itemDetail, this.props.detailsStyle]}>
                            {this.props.details}
                        </Text>
                    )}
                    {renderIf((this.props.date),
                        <Text style={[styles.itemDate, this.props.dateStyle]}>
                            {getTimeAgo(this.props.date)}
                        </Text>
                    )}
                </View>
            </View>
        );
    }
}

ListItem.PropTypes = {
    title: React.PropTypes.string,
    details: React.PropTypes.string,
    date: React.PropTypes.object,
    titleStyle: React.PropTypes.object,
    detailsStyle: React.PropTypes.object,
    dateStyle: React.PropTypes.object,
}

ListItem.props = {
    titleStyle: {},
    detailsStyle: {},
    dateStyle: {},
}

const styles = StyleSheet.create({
    item: {
        // minHeight: 72,
        backgroundColor: "white",
        paddingHorizontal: 16,
        paddingVertical: 16,
        justifyContent: "center",
    },
    contentContainer: {
    },
    itemTitle: {
        fontSize: 16,
        color: "black",
        fontWeight: "bold",
        color: Theme.primary,
    },
    itemDetail: {
        marginTop: 8,
        fontSize: 14,
        color: "black",
    },
    itemDate: {
        marginTop: 8,
        fontSize: 14,
    },
})

export default ListItem;