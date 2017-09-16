import React, { Component, PropTypes } from 'react';
import Divider from "./Divider"
import renderIf from "./../utils/renderIf"

class ListDivider extends Component {
    state = {}
    render() {
        return (
            renderIf(this.props.index != this.props.data.length - 1, <Divider />)
        );
    }
}

ListDivider.propTypes = {
    data: React.PropTypes.array.isRequired,
    index: React.PropTypes.number.isRequired,
}

export default ListDivider;