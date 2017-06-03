import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import { secondary, primaryTextButton, primaryDark } from '../lib/colors'
import PrimaryButton from  '../components/PrimaryButton'

const {
    View,
    TouchableHighlight,
    StyleSheet,
    Text,
    Modal,
    Alert,
    ScrollView,
    StatusBar,
} = ReactNative

class Home extends Component{

    componentDidMount() {
        this.props.screenProps.getLatestEvent()

    }

    startButtonPress(){
        if(this.props.eventID != ''){
            this.props.screenProps.setCurEventID(this.props.eventID)
            this.props.navigation.navigate('Activity',{})
        }else{
            this.props.navigation.navigate('CreateEvent',{})
        }
    }
    _renderEmpty(){
            return(
                <View style = { styles.emptyContainer }>
                    <StatusBar
                        backgroundColor="#7ca220"
                        barStyle="light-content"
                    />
                    <Text style = { styles.emptyTitleText }>Your latest event will be shown here.</Text>
                    <PrimaryButton states={{title: 'Create' ,onPress: this.startButtonPress.bind(this)}} />
                </View>
            )  
        }
    _renderEvent(){
        return(
                <View style={ styles.container }>
                    <StatusBar
                        backgroundColor = {primaryDark}
                        barStyle="light-content"
                    />
                    <View style = { styles.titleContainer }>
                        <Text style = { styles.title }>{this.props.name}</Text>
                    </View>
                    <View style = { styles.eventDetailContainer }>
                        <View style = { styles.totalDistanceContainer } >
                            <Text style = { styles.totalDistance }>{this.props.totalDistance}<Text style = { styles.distanceWeekSmallText }>KM </Text></Text>
                        </View>
                        <View style = { styles.distanceContainer }>
                            <View style = { styles.daysLeftContainer }>
                                <Text style = { styles.daysLeftText }>{this.props.daysLeft} </Text>
                                <Text style = { styles.distanceWeekSmallText }>Days Left</Text>
                            </View>
                            <View style = { styles.totalDistanceCurrentContainer }>
                                <View style = { styles.totalDistanceRunContainer }>
                                    <Text style = { styles.totalDistanceRunText }>{this.props.overallDistanceTravelled}<Text style = { styles.distanceWeekSmallText }>KM </Text></Text>
                                    <Text style = { styles.distanceWeekSmallText }>Ran</Text>
                                </View>
                            </View>
                        </View>
                        <View style = { styles.distanceWeekContainer }>
                            <Text style = { styles.distanceWeekSmallText }>This Week</Text>
                            <View style = {styles.distanceWeekRowContainer}>
                                <View style = { styles.distanceWeekLeftContainer }>
                                    <Text style = { styles.distanceWeekText }>{this.props.distanceWeekly}<Text style = { styles.distanceWeekSmallText }>KM </Text></Text>
                                    <Text style = { styles.distanceWeekSmallText }>Needed</Text>
                                </View>
                                <View style = { styles.distanceWeekLeftContainer }>
                                    <Text style = { styles.distanceWeekText }>{this.props.distanceWeeklyRun}<Text style = { styles.distanceWeekSmallText }>KM </Text></Text>
                                    <Text style = { styles.distanceWeekSmallText }>Ran</Text>
                                </View>
                                <View style = { styles.distanceWeekLeftContainer }>
                                    <Text style = { styles.distanceWeekText }>{this.props.distanceWeeklyLeft}<Text style = { styles.distanceWeekSmallText }>KM </Text></Text>
                                    <Text style = { styles.distanceWeekSmallText }>Left</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style = { styles.startContainer }>
                        <PrimaryButton states={{title: 'Start'  ,onPress: this.startButtonPress.bind(this)}} />
                    </View>
                </View>
        )
    }


    render(){
        return (
                <View style = { styles.content }>
                    {this.props.eventID === ''? this._renderEmpty(): this._renderEvent()}
                </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        marginTop: 10,
    },
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
    },
    titleContainer: {
        flex: 2,
        justifyContent: 'center',
    },
    totalDistanceContainer: {
        flex: 1,
    },
    distanceContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    distanceWeekContainer: {
        flex: 1,
    },
    startContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    title: {
        fontSize: 25,
    },
    eventDetailContainer:{
        flex: 8,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingTop: 30,
    },
    totalDistance: {
        textAlign: 'center',
        fontSize: 50,
        fontWeight: 'bold',
    },
    daysLeftContainer: {
        flex: 1,
    },
    daysLeftText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    totalDistanceCurrentContainer: {
        flex: 1,
    },
    totalDistanceLeftContainer: {
        flex: 1,
    },
    totalDistanceRunText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    totalDistanceLeftText: {
        textAlign: 'center',
        fontSize: 20,
    },
    distanceWeekRowContainer: {
        flex: 3,
        flexDirection: 'row',
    },
    distanceWeekLeftContainer:{
        flex: 1,
    },
    distanceWeekSmallText: {
        textAlign: 'center',
        fontSize: 13, 
    },
    distanceWeekText: {
        textAlign: 'center',
        fontSize: 20, 
        fontWeight: 'bold',
    },
    emptyContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyTitleText:{
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 30,
    },
    emptyTitleSubText:{
        fontSize: 15,
        marginBottom: 20,
    },
})


function mapStateToProps(state){
    return{
        name: state.latestEvent.name,
        eventID: state.latestEvent.eventID,
        totalDistance: state.latestEvent.totalDistance,
        distanceWeeklyLeft: state.latestEvent.distanceWeeklyLeft,
        distanceWeekly: state.latestEvent.distanceWeekly,
        daysLeft: state.latestEvent.daysLeft,
        overallDistanceTravelled: state.latestEvent.overallDistanceTravelled,
        overallDistanceLeft: state.latestEvent.overallDistanceLeft,
        distanceWeeklyRun: state.latestEvent.distanceWeeklyRun,
        distanceWeeklyRunLeft: state.latestEvent.distanceWeeklyRunLeft,
        eventCreated: state.event.eventCreated,
        isEventIDUpdated: state.event.isEventIDUpdated,
    }
}

export default connect(mapStateToProps)(Home)