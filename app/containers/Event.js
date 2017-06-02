import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux' 
import { NavigationActions } from 'react-navigation'
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

    eventDetails(ID){
        this.props.screenProps.setCurEventID(ID)
        this.props.screenProps.goToDetail()
    }

    componentDidUpdate() {
        if(this.props.goToDetail){
            //Redirect to another screen
            const resetAction = NavigationActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({routeName: 'Event'}),
                NavigationActions.navigate({routeName: 'EventDetailStack'})
            ]
            })
            this.props.navigation.dispatch(resetAction)
        }
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
                                <TouchableHighlight  onPress={() => this.eventDetails(item.id)}>
                                     <Text>{item.name}</Text> 
                                 </TouchableHighlight>
                                
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
        goToDetail: state.event.goToDetail,
    }
}

export default connect(mapStateToProps)(Event)