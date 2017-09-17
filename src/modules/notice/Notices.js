import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from "react-native"
import Button from "./../../components/Button"
import ListItemView from "./../../components/ListItemView"
import ListDivider from "./../../components/ListDivider"
import isEmpty from "lodash/isEmpty"

class Notices extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        data: [
            {
                key: 1,
                title: "運輸署特別交通消息",
                screen: "abt.transportDepartmentNews"
            },
            {
                key: 2,
                title: "香港電台交通消息",
                screen: "abt.rthkNews"
            },
            {
                key: 3,
                title: "商業電台交通消息",
                screen: "abt.commericalRadioNews"
            }
        ],
    }

    pressNotice(item) {
        if (isEmpty(item.screen))
            return


        this.props.navigator.push({
            screen: item.screen,
            title: item.title,
            animationType: "fade",
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item, index }) => (
                        <ListItemView data={this.state.data} index={index}>
                            <Button onPress={() => this.pressNotice(item)}>
                                <View style={styles.item}>
                                    <Text style={styles.itemTitle}>{item.title}</Text>
                                </View>
                            </Button>
                        </ListItemView>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    marginTop: {
        marginTop: 8,
    },
    marginBottom: {
        marginBottom: 8,
    },
    container: {
        // flex: 1,
        // backgroundColor: "white",
    },
    item: {
        height: 64,
        backgroundColor: "white",
        justifyContent: "center",
        paddingHorizontal: 16,
    },
    itemTitle: {
        fontSize: 16,
        color: "black",
    },
})

export default Notices;