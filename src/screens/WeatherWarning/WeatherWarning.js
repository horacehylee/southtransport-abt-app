import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
} from 'react-native';
import ListItemView from "./../../components/ListItemView"
import { Theme } from "./../../theme"
import ListItem from "./../../components/ListItem"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as weatherWarningActions from "./actions"
import isEmpty from "lodash/isEmpty"

class WeatherWarning extends Component {
    state = {}

    componentDidMount() {
        this.props.actions.fetchWeatherWarning()
    }

    refresh = () => {
        this.props.actions.fetchWeatherWarning()
    }

    render() {
        return (
            <View>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.loading && isEmpty(this.props.weatherWarnings)}
                            onRefresh={this.refresh}
                            colors={[Theme.primary]}
                        />
                    }
                    data={this.props.weatherWarnings}
                    renderItem={({ item, index }) => (
                        <ListItemView data={this.props.weatherWarnings} index={index}>
                            <ListItem
                                title={item.title}
                                details={item.details}
                                date={item.date}
                            />
                        </ListItemView>
                    )}
                />
            </View>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let weatherWarningState = state.get("weatherWarning")
    return {
        loading: weatherWarningState.get("loading"),
        weatherWarnings: weatherWarningState.get("weatherWarnings"),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(weatherWarningActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherWarning);