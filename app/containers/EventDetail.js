import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import { DateFormatter, mToKM, TimeNiceFormatter, DateNiceFormatter } from '../lib/lib'
import PrimaryButton from  '../components/PrimaryButton'

const {
    View,
    TouchableHighlight,
    TouchableOpacity,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    Image,
} = ReactNative

class EventDetail extends Component{

    componentDidMount() {
        this.props.screenProps.getEventDetails()
        this.props.screenProps.redirectEventDetailsDone()
        
    }

    startButtonPress(){
        this.props.navigation.navigate('Activity',{ name: this.props.name })
    }
    runDetailsPressed(id){
        this.props.screenProps.setRunDetailID(id)
        this.props.navigation.navigate('FinishActivity',{})
    }

    _keyExtractor = (item, index) => item.id;

        
    runs(){
        return Object.keys(this.props.runs).map( key => this.props.runs[key])
    }

    _renderBanner(){
        return(
            <View style = { styles.bannerContainer } >
                <Image source={ { uri: this.props.bannerSource } }  style={ styles.bannerImage } />  
            </View>
        )
    }

    render(){
        return (
            <ScrollView>
            <View style = {styles.container} >
                <View style = { styles.bannerContainer } >
                    {this.props.bannerSource != '' ? this._renderBanner() : null }
                </View>
                <View style = { styles.eventDetailContainer }>
                    <Text style = { styles.nameText }>{ this.props.name }</Text>
                    <View style = { styles.nameContainer }>
                        <Text>Start Date: <Text style = { styles.sub }>{ DateNiceFormatter(this.props.dateStart) } </Text></Text>
                        <Text>End Date: <Text style = { styles.sub }>{ DateNiceFormatter(this.props.dateEnd) } </Text></Text>
                        <Text>Days Left: <Text style = { styles.sub }>{ this.props.daysLeft.toString() }</Text></Text>
                        <Text>Bib Number: <Text style = { styles.sub }>{ this.props.bibNumber }</Text></Text>
                    </View>
                    <Text style = { styles.totalTitle } >Overall (KM)</Text>
                    <View style = { styles.totalContainer }>
                        <Text>Total Distance: <Text style = { styles.sub }>{ this.props.totalDistance.toString() }</Text></Text>
                        <Text>Total Distance Ran: <Text style = { styles.sub }>{ this.props.overallDistanceTravelled.toString() }</Text></Text>
                        <Text>Total Distance Left: <Text style = { styles.sub }>{ this.props.overallDistanceLeft.toString() }</Text></Text>
                    </View>
                    <Text style = { styles.totalTitle } >Weekly (KM)</Text>
                    <View style = { styles.totalContainer }>
                        <Text>Total Distance: <Text style = { styles.sub }>{ this.props.distanceWeekly.toString() }</Text></Text>
                        <Text>Total Distance Ran: <Text style = { styles.sub }>{ this.props.distanceWeeklyRun.toString() }</Text></Text>
                        <Text>Total Distance Left: <Text style = { styles.sub }>{ this.props.distanceWeeklyLeft.toString() }</Text></Text>
                    </View>
                </View>
                <View style = { styles.startContainer }>
                    <PrimaryButton states={{title: 'Start'  ,onPress: this.startButtonPress.bind(this)}} />
                </View>
                <Text style = { styles.totalTitle } >Runs (KM)</Text>
                <View style = { styles.runList }>
                {
                    this.runs().map(( runs ) => {
                            return (
                                <TouchableOpacity style = {styles.runWrapper} activeOpacity={ 0.8 } onPress={() => this.runDetailsPressed( runs.id )} key= { runs.id }>
                                    <Text>Distance: { mToKM(runs.distance) }</Text>
                                    <Text>Time: { TimeNiceFormatter(runs.time) }</Text>
                                    <Text>Pace: {runs.pace}</Text>
                                    <Text>Date: { DateNiceFormatter(runs.date) }</Text> 
                                </TouchableOpacity>
                            )
                        }) 
                }
                </View>
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    nameContainer: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 15,    
    },
    nameText: {
        marginTop: 10,
        paddingLeft: 5,
        marginBottom: 2,
    },
    totalContainer: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 15,       
    },
    totalTitle:{
        paddingLeft: 5,
        marginBottom: 2,
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
    runWrapper: {
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 5,
    },
    startContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    sub: {
        marginTop: 5,
        fontWeight: 'bold',
    },
    bannerContainer:{
        flex: 1,
    },
    bannerImage:{
        flex: 1,
        height: 150,
    },
})

function mapStateToProps(state){
    return{
        name: state.currentEvent.name,
        eventID: state.currentEvent.eventID,
        totalDistance: state.currentEvent.totalDistance,
        daysLeft: state.currentEvent.daysLeft,
        overallDistanceTravelled: state.currentEvent.overallDistanceTravelled,
        overallDistanceLeft: state.currentEvent.overallDistanceLeft,
        runs: state.currentEvent.runs,
        dateStart: state.currentEvent.dateStart,
        dateEnd: state.currentEvent.dateEnd,
        distanceWeeklyRun: state.currentEvent.distanceWeeklyRun,
        distanceWeeklyLeft: state.currentEvent.distanceWeeklyLeft,
        distanceWeekly: state.currentEvent.distanceWeekly,
        pace: state.currentEvent.pace,
        bibNumber: state.currentEvent.bibNumber,
        bannerSource: state.currentEvent.bannerSource,
    }
}

export default connect(mapStateToProps)(EventDetail)