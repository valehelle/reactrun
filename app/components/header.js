import ReactNative from 'react-native'
import React from 'react'
import { secondary } from '../lib/colors'

const {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,

} = ReactNative

export function _renderHeaderButton(title, route, navigation){
        return (
            <TouchableOpacity  style = { styles.titleWrapper } onPress={() => navigation.navigate(route,{})} >
                <Text style = { styles.titleText }>{title}</Text>
            </TouchableOpacity>
        )
}

const styles = StyleSheet.create({
    titleWrapper: {
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 17,
        color: 'white'
    }
})