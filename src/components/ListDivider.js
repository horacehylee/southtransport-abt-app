import React, { Component, PropTypes } from 'react';
import Divider from "./Divider"

class ListDivider extends Component {
    state = {}
    render() {
        return (
            (this.props.index != this.props.data.length - 1 ? (<Divider />) : null)
        );
    }
}

ListDivider.propTypes = {
    data: React.PropTypes.array.isRequired,
    index: React.PropTypes.number.isRequired,
}

export default ListDivider;