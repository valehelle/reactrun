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

    componentDidMount() {
        this.props.screenProps.getEventDetails()
        
    }


    render(){
        return (
            <View style = {styles.container} >
                <Text>{this.props.eventDetails.name}</Text>
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
        eventDetails: state.event.eventDetails,
    }
}

export default connect(mapStateToProps)(EventDetail)