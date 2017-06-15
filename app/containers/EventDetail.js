import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import { DateFormatter, mToKM, TimeNiceFormatter, DateNiceFormatter } from '../lib/lib'
import PrimaryButton from  '../components/PrimaryButton'
import { secondary } from '../lib/colors'

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
    _renderStart(){
        return(
            <PrimaryButton states={{title: 'Start'  ,onPress: this.startButtonPress.bind(this)}} />
        )
    }

    _renderRunComplete(){
        return(
            <View style = { styles.iconCompleteContainer } >
                <Image source={require('../icons/ic_run_done_black_24dp_2x.png')} style={ styles.iconCompleteImage } />
                <Text style={ styles.textCompleteImage }  >Run Completed</Text>  
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
                    {this.props.isRunComplete === true ? this._renderRunComplete() : null }
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
                </View>
                <View style = { styles.startContainer }>
                     {this.props.daysLeft != '0' ? this._renderStart() : null }
                    
                </View>
                <Text style = { styles.totalTitle } >Runs </Text>
                <View style = { styles.runList }>
                {
                    this.runs().map(( runs ) => {
                            return (
                                <View style = { styles.runContainer } key= { runs.id }>
                                    <Text style = { styles.runDate }> { DateNiceFormatter(runs.date) }</Text> 
                                    <TouchableOpacity style = {styles.runWrapper} activeOpacity={ 0.8 } onPress={() => this.runDetailsPressed( runs.id )} >
                                        <View style = {styles.runImageWrapper}>
                                            <Image
                                                source={require('../icons/ic_directions_run_black_24dp_2x.png')}
                                                style={[styles.icon, {tintColor: secondary}]}
                                            />
                                        </View>
                                        <View style = {styles.runDetailWrapper}>
                                            <Text>{ mToKM(runs.distance) } KM</Text>
                                            <Text style = { styles.runTime }>{ TimeNiceFormatter(runs.time) }</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
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
        flexDirection: 'row'
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
    runContainer: {
        marginTop: 10,
    },
    runDate: {
        marginBottom: 5,
    },
    icon: {
        width: 26,
        height: 26,
    },
    runDetailWrapper:{
        flex: 8,
    },
    runImageWrapper:{
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    runTime:{
        fontSize: 12,
    },
    iconCompleteContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },
    iconCompleteImage: {
        width: 50,
        height: 50,
        tintColor: secondary,
    },
    textCompleteImage: {
        color: secondary,
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
        isRunComplete: state.currentEvent.isRunComplete,
    }
}

export default connect(mapStateToProps)(EventDetail)