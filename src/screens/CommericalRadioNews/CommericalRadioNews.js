import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	RefreshControl,
} from 'react-native';
import { parseString } from "react-native-xml2js"
import ListItemView from "./../../components/ListItemView"
import { Theme } from "./../../theme"
import ListItem from "./../../components/ListItem"
import { connect } from 'react-redux';
import { bindActionCreators } from "redux"
import * as commericalRadioNewsActions from "./actions"
import isEmpty from "lodash/isEmpty"


class CommericalRadioNews extends Component {
	state = {}

	componentDidMount() {
		this.props.actions.fetchNews()
	}

	refresh() {
		this.props.actions.fetchNews()
	}

	render() {
		return (
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
})

const mapStateToProps = (state, ownProps) => {
	let commericalRadioNewsState = state.get("commericalRadioNews")
	return {
		loading: commericalRadioNewsState.get("loading"),
		news: commericalRadioNewsState.get("news"),
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(commericalRadioNewsActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CommericalRadioNews);