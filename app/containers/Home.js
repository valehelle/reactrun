import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import { getToday, daysLeft, mToKM } from '../lib/lib'

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
                        <Text style = { styles.title }>{this.props.event.name}</Text>
                    </View>
                    <View style = { styles.totalDistanceContainer } >
                        <Text style = { styles.title }>{this.props.event.distance} KM</Text>
                        <Text style = { styles.daysLeft }>{daysLeft(this.props.event.dateend)} Days left</Text>
                    </View>
                    <View style = { styles.distanceContainer }>
                        <View style = { styles.totalDistanceRunContainer }>
                            <Text style = { styles.totalDistanceRun }>{mToKM(this.props.event.distanceTravelled)} KM run</Text>
                        </View>
                        <View style = { styles.totalDistanceLeftContainer }>
                            <Text style = { styles.totalDistanceLeft }>{this.props.event.distance - mToKM(this.props.event.distanceTravelled)} KM left</Text>
                        </View>
                        <View style = { styles.distanceWeekLeftContainer }>
                            <Text style = { styles.distanceWeekLeft }>   5 KM left this week</Text>
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
        flex: 1,
    },
    eventDateContainer: {
        flex: 1,
    },
    distanceContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    startHistoryContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
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
        event: state.event.latestEvent,
    }
}

export default connect(mapStateToProps)(Home)