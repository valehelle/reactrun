import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux' 
const {
    View,
    TouchableHighlight,
    Text,
    StyleSheet,
    FlatList,
} = ReactNative

class EventDetail extends Component{

    componentDidMount() {
        this.props.screenProps.getEventDetails()
        this.props.screenProps.redirectEventDetailsDone()
        
    }

    startRunning(){
        this.props.navigation.navigate('Activity',{})
    }

    _keyExtractor = (item, index) => item.id;

    render(){
        console.log(this.props.eventDetails.runs)
        return (
            <View style = {styles.container} >
                <Text>{this.props.eventDetails.name}</Text>
                <FlatList
                    style = {styles.eventList}
                    data={this.props.eventDetails.runs}
                    keyExtractor={this._keyExtractor}
                    renderItem={
                        ({item}) => (
                            <View>
                                <TouchableHighlight  onPress={() => this.eventDetails(item.id)}>
                                     <Text>{item.distance}</Text> 
                                 </TouchableHighlight>
                                
                            </View>
                        )
                    }
                />
                <TouchableHighlight underlayColor='#777' onPress={() => this.startRunning()} style = { styles.buttonRun }>
                    <Text style = { styles.buttonRunText }>Start</Text>
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
    buttonRun: {
        height: 30,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
    },    
    buttonRunText: {
        color: 'white',
    },
})

function mapStateToProps(state){
    return{
        eventDetails: state.event.eventDetails,
    }
}

export default connect(mapStateToProps)(EventDetail)