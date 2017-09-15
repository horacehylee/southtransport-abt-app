import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from "react-native"
import Button from "./../tabBar/Button"

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
                    renderItem={({ item }) => (
                        <View>
                            <Button>
                                <View style={styles.item}>
                                    <Text style={styles.itemTitle}>{item.title}</Text>
                                </View>
                            </Button>
                            <View style={styles.divider} />
                        </View>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: "white",
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
    divider: {
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 1,
        marginHorizontal: 12,
        backgroundColor: "white"
    },
})

export default Notices;