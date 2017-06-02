import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'


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

    startRunning(){
        this.props.screenProps.setCurEventID(this.props.eventID)
        this.props.navigation.navigate('Activity',{})
    }


    render(){
        return (
                <View style={ styles.container }>
                    <StatusBar
                        backgroundColor="green"
                        barStyle="light-content"
                    />
                    <View style = { styles.titleContainer }>
                        <Text style = { styles.title }>{this.props.name}</Text>
                    </View>
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
                    <View style = { styles.startHistoryContainer }>
                        <TouchableHighlight underlayColor='#777' onPress={() => this.startRunning()} style = { styles.buttonRun }>
                            <Text style = { styles.buttonRunText }>Start</Text>
                        </TouchableHighlight>
                    </View>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    titleContainer: {
        flex: 1,
    },
    totalDistanceContainer: {
        flex: 2,
        flexDirection: 'row',
    },
    eventDateContainer: {
        flex: 2,
    },
    distanceContainer: {
        flex: 2,
        flexDirection: 'row',
    },
    distanceWeekContainer: {
        flex: 3,
    },
    startHistoryContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        
    },
    totalDistance: {
        textAlign: 'center',
        fontSize: 50,
        fontWeight: 'bold',
    },
    daysLeftContainer: {
        flex: 1,
    },
    totalDistanceContainer: {
        flex: 2,
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
    buttonRun: {
        height: 30,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius:1,
    },    
    buttonRunText: {
        color: 'white',
        
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