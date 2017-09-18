import React, { Component } from 'react';
import PropTypes from "prop-types"
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
    data: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
}

export default ListDivider;