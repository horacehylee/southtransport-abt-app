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
import * as rthkNewsActions from "./actions"
import isEmpty from "lodash/isEmpty"
import renderIf from "./../../utils/renderIf"

class RTHKNews extends Component {
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
                {renderIf(!isEmpty(this.props.news), (
                    <View>
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.props.loading && !isEmpty(this.props.news)}
                                    onRefresh={this.refresh}
                                    colors={[Theme.primary]}
                                />
                            }
                            data={this.props.news}
                            renderItem={({ item, index }) => (
                                <ListItemView data={this.props.news} index={index}>
                                    <ListItem
                                        details={item.details}
                                        detailsStyle={{ fontSize: 16, }}
                                        date={item.date}
                                    />
                                </ListItemView>
                            )}
                        />
                    </View>
                ), (
                    <View>
                        <ActivityIndicator />
                    </View>
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

const mapStateToProps = (state, ownProps) => {
    let rthkNewsState = state.get("rthkNews")
    return {
        loading: rthkNewsState.get("loading"),
        news: rthkNewsState.get("news"),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(rthkNewsActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RTHKNews);