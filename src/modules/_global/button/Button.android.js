import React, { Component, PropTypes } from 'react';
import {
    TouchableNativeFeedback
} from 'react-native';

class MyButton extends Component {
    render() {
        return (
            // <TouchableNativeFeedback>
            //     delayPressIn={0}
            //     background={TouchableNativeFeedback.SelectableBackground()}
            //     {...props}>

            //     {props.children}
            // </TouchableNativeFeedback>
            <View>
                
            </View>
        )
    }
}

MyButton.propTypes = {
    children: PropTypes.object
};

export default MyButton