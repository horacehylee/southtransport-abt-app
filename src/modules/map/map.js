import React, { Component } from 'react';
import Config from 'react-native-config'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
} from 'react-native';
import MapView from 'react-native-maps';

const abtRegion = {
    latitude: 22.26701441536384,
    longitude: 114.18040797114372,
    latitudeDelta: 0.03999958262855685,
    longitudeDelta: 0.03980230540038576,
}

const range = 0.002

class AbtMap extends Component {
    constructor(props) {
        super(props)
        this.state = { needReset: false };
    }

    reset() {
        this.map.animateToRegion(abtRegion)
    }

    onRegionChangeComplete = (region) => {
        this.setState({ needReset: !this.withinRange(region, abtRegion) });
    }

    withinRange(region, abtRegion) {
        inRange = true;
        inRange &= Math.abs(region.latitude - abtRegion.latitude) <= range
        inRange &= Math.abs(region.longitude - abtRegion.longitude) <= range
        return inRange
    }

    renderResetButton() {
        if (this.state.needReset) {
            return (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => this.reset()}
                        style={[styles.bubble, styles.button]}
                    >
                        <Text>
                            {"返回香隧"}
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    ref={ref => { this.map = ref; }}
                    style={styles.map}
                    initialRegion={abtRegion}
                    showsTraffic={true}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                />
                {this.renderResetButton()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    button: {
        marginTop: 12,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'column',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
});

export default AbtMap