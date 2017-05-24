import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux' 
const {
    View,
    TouchableHighlight,
    Text,
    StyleSheet,
} = ReactNative

class EventDetail extends Component{
    render(){
        return (
            <View style = {styles.container} >
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    eventList: {
        backgroundColor: 'white',
        flex: 1,
    }, 
    bNewEvent: {
        backgroundColor: 'green',
        height:40,
    }, 
})

function mapStateToProps(state){
    return{
        
    }
}

export default connect(mapStateToProps)(EventDetail)