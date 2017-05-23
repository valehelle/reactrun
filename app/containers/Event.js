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
    newEvent(){
        this.props.navigation.navigate('CreateEvent',{})
    }

    render(){
        return (
            <View style = {styles.container} >
                <FlatList
                    style = {styles.eventList}
                    data={[{key: 'a',babe: 'ala' }, {key: 'b', babe: 'ala'}]}
                    renderItem={
                        ({item}) => (
                            <View>
                                <Text>{item.key}</Text> 
                                <Text>{item.babe}</Text>
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
        
    }
}

export default connect(mapStateToProps)(Event)