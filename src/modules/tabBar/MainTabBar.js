import React, { Component } from "react"
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyButton from "./../_global/button/Button"

//color between rgb(59,89,152) and rgb(204,204,204)
function interpolateColor(progress) {
    const red = 59 + (204 - 59) * progress;
    const green = 89 + (204 - 89) * progress;
    const blue = 152 + (204 - 152) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
}

class MainTabBar extends Component {
    // tabIcons = []

    constructor(props) {
        super(props)
        // this.setTabIcon = this.setTabIcon.bind(this)
        this.setAnimationValue = this.setAnimationValue.bind(this)
    }

    componentDidMount() {
        console.log("did mount")
        this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
    }

    setAnimationValue({ value }) {
        // console.log("setAnimationValue.this", this)
        // console.log("setAnimationValue.this.props", this.props)
        // console.log("set animation: ", value)
        // console.log("tabIcons", this.props.tabIcons)
        this.props.tabIcons.forEach((icon, i) => {
            const progress = Math.min(1, Math.abs(value - i))
            icon.setNativeProps({
                style: {
                    color: interpolateColor(progress),
                },
            });
        });
    }

    setTabIcon = (i) => (icon) => {
        // console.log("setTabIcon", icon, i)
        this.props.tabIcons[i] = icon;
        // console.log(this.props.tabIcons)
    }

    renderTabButtons() {
        return this.props.tabs.map((tab, i) =>
            <TouchableNativeFeedback delayPressIn={0} key={tab} background={TouchableNativeFeedback.SelectableBackground()} onPress={() => this.props.goToPage(i)} >
                <View style={styles.tab}>
                    <Icon
                        name={tab}
                        size={30}
                        color={this.props.activeTab === i ? interpolateColor(0) : interpolateColor(1)}
                        ref={this.setTabIcon(i)}
                    />
                </View>
            </TouchableNativeFeedback>
        )
    }

    render() {
        return (
            <View style={[styles.tabs, this.props.style,]}>
                {this.renderTabButtons()}
            </View>
        )
    }
}

MainTabBar.propTypes = {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    tabIcons: React.PropTypes.array,
}

MainTabBar.defaultProps = {
    tabIcons: []
}

// const MainTabBar = React.createClass({
//     tabIcons: [],

//     propTypes: {
//         goToPage: React.PropTypes.func,
//         activeTab: React.PropTypes.number,
//         tabs: React.PropTypes.array,
//     },

//     componentDidMount() {
//         console.log("MainTabBar did mount")
//         this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
//     },

//     setAnimationValue({ value, }) {
//         console.log("setAnimationValue", value)
//         this.tabIcons.forEach((icon, i) => {
//             const progress = Math.min(1, Math.abs(value - i))
//             icon.setNativeProps({
//                 style: {
//                     color: this.iconColor(progress),
//                 },
//             });
//         });
//     },

//     //color between rgb(59,89,152) and rgb(204,204,204)
//     iconColor(progress) {
//         const red = 59 + (204 - 59) * progress;
//         const green = 89 + (204 - 89) * progress;
//         const blue = 152 + (204 - 152) * progress;
//         return `rgb(${red}, ${green}, ${blue})`;
//     },

//     setTabIcon: (i) => (icon) => {
//         console.log(this)
//         console.log("ref called"); 
//         this.tabIcons[i] = icon;
//     },

//     render() {
//         return <View style={[styles.tabs, this.props.style,]}>
//             {console.log("renderButtons")}
//             {this.props.tabs.map((tab, i) => {
//                 return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
//                     <Icon
//                         name={tab}
//                         size={30}
//                         color={this.props.activeTab === i ? 'rgb(59,89,152)' : 'rgb(204,204,204)'}
//                         ref={(icon) => this.setTabIcon(i)}
//                     />
//                 </TouchableOpacity>;
//             })}
//         </View>;
//     },
// })

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    tabs: {
        height: 45,
        flexDirection: 'row',
        paddingTop: 5,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
});

export default MainTabBar