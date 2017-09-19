import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';
import ListItemView from "./../../components/ListItemView"
import { Theme } from "./../../theme"
import ListItem from "./../../components/ListItem"
import { connect } from 'react-redux';
import { bindActionCreators } from "redux"
import * as transportDepartNewsActions from "./actions"
import isEmpty from "lodash/isEmpty"
import { renderIfElse } from "./../../utils/renderIfElse"

class TransportDepartmentNews extends Component {
    state = {}

    componentDidMount() {
        this.props.actions.fetchNews()
    }

    refresh = () => {
        this.props.actions.fetchNews()
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.loading && this.props.messages.size > 0}
                            onRefresh={this.refresh}
                            colors={[Theme.primary]}
                        />
                    }
                    data={this.props.messages}
                    renderItem={({ item, index }) => (
                        <ListItemView data={this.props.messages} index={index}>
                            <ListItem
                                details={item.details}
                                detailsStyle={{ color: "black", fontSize: 16, }}
                                date={item.date}
                            />
                        </ListItemView>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

const mapStateToProps = (state, ownProps) => {
    let transportDepartmentNews = state.get("transportDepartmentNews")
    return {
        loading: transportDepartmentNews.get("loading"),
        messages: transportDepartmentNews.get("messages"),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(transportDepartNewsActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransportDepartmentNews);