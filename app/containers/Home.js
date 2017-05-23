import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux' 
import realm from '../database/realm'
const {
    View,
    TouchableHighlight,
    StyleSheet,
    Text,
    Modal,
    Alert,
    ScrollView,
} = ReactNative

class Home extends Component{
    startRunning(){
        this.props.navigation.navigate('Activity',{})
    }
    render(){
        realm.write(() => {
  let myEvent = realm.create('Event', {
    name: 'Honda',
    datestart: new Date(),
    dateend: new Date(),
    distance: 12,
    runs: [],
  });

let runs = myEvent.runs
 let run = realm.create('Run', {
    date: new Date(),
    time: new Date(),
    type: 'ccccc',
    distance: 12,
  });
  runs.push(run);
  runs.push(run);
});

// Query Realm for all cars with a high mileage
let events = realm.objects('Event')

// Will return a Results object with our 1 car
console.log(events[events.length - 1].runs[0].laps.length)
        return (
                <View style={ styles.container }>
                    <View style = { styles.titleContainer }>
                        <Text style = { styles.title }>Recharge Running</Text>
                    </View>
                    <View style = { styles.totalDistanceContainer } >
                        <Text style = { styles.title }>21 KM</Text>
                        <Text style = { styles.daysLeft }>5 Days left</Text>
                    </View>
                    <View style = { styles.distanceContainer }>
                        <View style = { styles.totalDistanceRunContainer }>
                            <Text style = { styles.totalDistanceRun }>10 KM run</Text>
                        </View>
                        <View style = { styles.totalDistanceLeftContainer }>
                            <Text style = { styles.totalDistanceLeft }>12 KM left</Text>
                        </View>
                        <View style = { styles.distanceWeekLeftContainer }>
                            <Text style = { styles.distanceWeekLeft }>5 KM left this week</Text>
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
        
    }
}

export default connect(mapStateToProps)(Home)