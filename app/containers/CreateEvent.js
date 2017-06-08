import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import DatePicker from 'react-native-datepicker'
import { NavigationActions } from 'react-navigation'
import { toDate, addMonths } from '../lib/lib'
import { TextField } from 'react-native-material-textfield'
import PrimaryButton from  '../components/PrimaryButton'
var dismissKeyboard = require('dismissKeyboard')


const {
    TextInput,
    View,
    TouchableHighlight,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} = ReactNative

class CreateEvent extends Component{

    constructor(props) {
        super(props);
        this.state = { 
            name: '', 
            distance: '21',
            bibNumber: '',
            weeklyrun: '3', 
            sdate: new Date(), 
            edate: new Date(),
        }
    }

    onTextDistanceChanged(distance) {
        // code to remove non-numeric characters from text
        let pattern = /^\d+$/
        var res = pattern.test(distance);
        if(res){
            this.setState({distance: distance})
        }else{
            let distance = this.state.distance
            if(distance.length > 1){
                distance.substr(0,(distance.length - 1))
            }else{
                distance = ''
            }
            this.setState({distance: distance})
        }
    }

    onTextNameChanged(name) {
        this.setState({name: name})
    }
    
    onTextBibNumberChanged(bibNumber) {
        this.setState({bibNumber: bibNumber})
    }
    onTextWeeklyChanged(weeklyrun) {
        // code to remove non-numeric characters from text
        this.setState({weeklyrun: weeklyrun})
    }

    createPressed(){
         this.props.screenProps.createEvent(this.state)
    }
    componentDidUpdate() {
        if(this.props.eventCreated){
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
    dismissKeyboardAction() {
        dismissKeyboard();
    }

    render(){

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <View style = {styles.container} >
                        <View style = {styles.formContainer}>
                            <TextField
                                onChangeText={(text) => this.onTextNameChanged(text)}
                                value={this.state.name}
                                label= 'Name'
                            />
                            <TextField
                                onChangeText={(text) => this.onTextBibNumberChanged(text)}
                                value={this.state.bibNumber}
                                label= 'Bib Number'
                            />
                            <TextField 
                                keyboardType = 'numeric'
                                onChangeText = {(text)=> this.onTextDistanceChanged(text)}
                                value = {this.state.distance}
                                label= 'Distance'
                                onSubmitEditing={ ()=> this.dismissKeyboardAction()}
                            /> 
                            <Text style = {styles.sDateText}>Start Date</Text>
                            <DatePicker
                                date={this.state.sdate}
                                mode='date'
                                placeholder='Select start date'
                                format='DD-MM-YYYY'
                                minDate={new Date(2017,0,0,0,0,0)}
                                confirmBtnText='Confirm'
                                cancelBtnText='Cancel'
                                showIcon= {false}
                                onDateChange={(date) => {this.setState({sdate: toDate(date), edate: addMonths(toDate(date),1)})}}
                            />
                            <Text style = {styles.eDateText}>End Date</Text>
                            <DatePicker
                                date={this.state.edate}
                                mode='date'
                                placeholder='Select end date'
                                format='DD-MM-YYYY'
                                minDate={this.state.sdate}
                                confirmBtnText='Confirm'
                                cancelBtnText='Cancel'
                                showIcon= {false}
                                onDateChange={(date) => {this.setState({edate: toDate(date)})}}
                            />
                        </View>
                        <View style = { styles.createContainer }>
                            <PrimaryButton states={{title: 'Create'  ,onPress: this.createPressed.bind(this)}} />
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
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
    sDateText: {
        marginTop: 15,
    },
    eDateText: {
        marginTop: 15,
    },
    createContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom:20,
    },
    formContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        marginTop: 10,
    },
})

function mapStateToProps(state){
    return{
        eventCreated: state.event.eventCreated,
    }
}

export default connect(mapStateToProps)(CreateEvent)