import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import DatePicker from 'react-native-datepicker'
const {
    TextInput,
    View,
    TouchableHighlight,
    Text,
    StyleSheet,
} = ReactNative

class CreateEvent extends Component{

    constructor(props) {
        super(props);
        this.state = { name: 'Name', distance: "", sdate: new Date(), edate: new Date() }
    }

    onTextDistanceChanged(distance) {
        // code to remove non-numeric characters from text
        this.setState({distance: distance})
    }

    onTextNameChanged(name) {
        // code to remove non-numeric characters from text
        this.setState({name: name})
    }

    newEvent(){
         this.props.screenProps.createEvent(this.state)
    }

    render(){

        if(this.props.eventCreated){
            //Redirect to another screen
            //Action for successfull
            alert('SUCCESS')
        }
        return (
            <View style = {styles.container} >
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.onTextNameChanged(text)}
                    value={this.state.text}
                />
                <TextInput 
                    keyboardType = 'numeric'
                    style={{height: 40,}}
                    onChangeText = {(text)=> this.onTextDistanceChanged(text)}
                    value = {this.state.distance}
                /> 

                <DatePicker
                    style={{width: 200}}
                    date={this.state.sdate}
                    mode="date"
                    placeholder="Select start date"
                    format="DD-MM-YYYY"
                    minDate="01-05-2016"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.setState({sdate: date})}}
                />

                <DatePicker
                    style={{width: 200}}
                    date={this.state.edate}
                    mode="date"
                    placeholder="Select end date"
                    format="DD-MM-YYYY"
                    minDate="01-05-2016"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.setState({edate: date})}}
                />


                <TouchableHighlight style = {styles.bNewEvent} onPress={() => this.newEvent()}>
                    <Text>Create Event</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
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
        eventCreated: state.event.eventCreated,
    }
}

export default connect(mapStateToProps)(CreateEvent)