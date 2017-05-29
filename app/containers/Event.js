import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux' 
const {
    FlatList,
    View,
    TouchableHighlight,
    Text,
    StyleSheet,
} = ReactNative

class Event extends Component{

    componentDidMount() {
        this.props.screenProps.getEvents()
    }

    newEvent(){
        this.props.navigation.navigate('CreateEvent',{})
    }

     _keyExtractor = (item, index) => item.id;

    render(){
        return (
            <View style = {styles.container} >
                <FlatList
                    style = {styles.eventList}
                    data={this.props.events}
                    keyExtractor={this._keyExtractor}
                    renderItem={
                        ({item}) => (
                            <View>
                                <Text>{item.name}</Text> 
                            </View>
                        )
                    }
                />
                <TouchableHighlight style = {styles.bNewEvent} onPress={() => this.newEvent()}>
                    <Text>Create New Event</Text>
                </TouchableHighlight>
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
        events: state.event.events,
    }
}

export default connect(mapStateToProps)(Event)