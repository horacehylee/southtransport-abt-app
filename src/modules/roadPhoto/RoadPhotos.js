import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
    FlatList,
    RefreshControl,
} from "react-native"
const win = Dimensions.get('window');

const randomizeUrl = (url) => url + "?r=" + Math.random()

class RoadPhotos extends Component {
    state = {
        ...this.getState()
    }

    getState() {
        return {
            refreshing: false,
            roadPhotos: [
                {
                    key: "1",
                    title: "香港仔隧道灣仔入口",
                    imgUrl: randomizeUrl("http://tdcctv.data.one.gov.hk/H210F.JPG")
                },
                {
                    key: "2",
                    title: "香港仔隧道香港仔入口",
                    imgUrl: randomizeUrl("http://tdcctv.data.one.gov.hk/H421F.JPG")
                },
                {
                    key: "3",
                    title: "黃竹坑道近香港仔隧道",
                    imgUrl: randomizeUrl("http://tdcctv.data.one.gov.hk/H401F.JPG")
                },
            ]
        }
    }

    refresh = () => {
        this.setState({
            ...this.getState()
        })
    }

    render() {
        return (
            <FlatList
                style={styles.list}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.refresh}
                        colors={["#157cbe"]}
                    />
                }
                data={this.state.roadPhotos}
                renderItem={({ item, index }) => (
                    <View style={[styles.card, (index == this.state.roadPhotos.length - 1) ? styles.marginBottom : null]}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                        <View style={styles.roadPhotoContainer}>
                            <Image style={styles.roadPhoto} source={{ uri: item.imgUrl }} />
                        </View>
                    </View>
                )}
            >
            </FlatList>
        );
    }
}

const styles = StyleSheet.create({
    titleContainer: {
        paddingLeft: 16,
        paddingBottom: 12,
    },
    title: {
        color: "black",
        // fontWeight: "bold",
        fontSize: 16,
    },
    divider: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginBottom: 8,
        marginHorizontal: 8,
    },
    roadPhotoContainer: {
        // flex: 1,
        // padding: 16,
    },
    roadPhoto: {
        height: (win.width - 16) / 4 * 3,
    },
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        marginHorizontal: 8,
        marginTop: 8,
        // height: 150,
        // marginBottom: 16,
        // padding: 15,
        paddingVertical: 16,
        paddingTop: 16,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        borderRadius: 3,
    },
    marginBottom: {
        marginBottom: 8,
    },
    list: {
    }
})

export default RoadPhotos;