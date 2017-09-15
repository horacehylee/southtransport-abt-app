import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from "react-native"
import Button from "./../tabBar/Button"
import ListItemView from "./../../components/ListItemView"
import ListDivider from "./../../components/ListDivider"

class Notices extends Component {
    state = {
        data: [
            {
                key: 1,
                title: "運輸署特別交通消息",
            },
            {
                key: 2,
                title: "香港電台交通消息",
            },
            {
                key: 3,
                title: "商業電台交通消息",
            }
        ],
    }

    refresh() {
        console.log("refresh")
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item, index }) => (
                        <ListItemView data={this.state.data} index={index}>
                            <Button>
                                <View style={styles.item}>
                                    <Text style={styles.itemTitle}>{item.title}</Text>
                                </View>
                            </Button>
                            <ListDivider data={this.state.data} index={index} />
                            {/* {(index != this.state.data.length - 1 ? (<Divider />) : null)} */}
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