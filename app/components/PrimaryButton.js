import ReactNative from 'react-native'
import React, { Component } from 'react'
import { secondary, primaryTextButton } from '../lib/colors'
const {
    View,
    TouchableOpacity,
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
            <TouchableOpacity activeOpacity={ 0.8 } onPress={() => onPress()} style = { styles.button }>
                <Text style = { styles.buttonText }>{ title }</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        height: 30,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: secondary,
        borderRadius: 1,
    },    
    buttonText: {
        color: primaryTextButton,
        
    },
})
export default PrimaryButton
