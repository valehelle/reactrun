import ReactNative from 'react-native'
import React, { Component } from 'react'
import { secondary, primaryTextButton } from '../lib/colors'
const {
    View,
    TouchableHighlight,
    StyleSheet,
    Text,

} = ReactNative

class PrimaryButton extends Component {

    constructor(props) {
    super(props);
    this.state = {
      viewState: this.props.states
    };
  }

    render(){
        const {
            onPress,
            title,
        } = this.state.viewState

        return(
            <TouchableHighlight onPress={() => onPress()} style = { styles.buttonRun }>
                <Text style = { styles.buttonRunText }>{ title }</Text>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    buttonRun: {
        height: 30,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: secondary,
        borderRadius: 1,
    },    
    buttonRunText: {
        color: primaryTextButton,
        
    },
})
export default PrimaryButton
