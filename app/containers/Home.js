import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import { secondary, primaryTextButton, primaryDark } from '../lib/colors'
import PrimaryButton from  '../components/PrimaryButton'
import ProgressBarMini from '../components/ProgressBarMini'

const {
    View,
    TouchableHighlight,
    StyleSheet,
    Text,
    Modal,
    Alert,
    ScrollView,
    StatusBar,
    Image,
} = ReactNative

class Home extends Component{

    componentDidMount() {
        this.props.screenProps.getLatestEvent()
    }
    componentDidUpdate() {
        this.props.screenProps.getLatestEvent()
    }

    startButtonPress(){
        if(this.props.eventID != ''){
            this.props.screenProps.setCurEventID(this.props.eventID)
            this.props.navigation.navigate('Activity',{ name: this.props.name })
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
    _renderBanner(){
        return(
            <View style = { styles.bannerContainer } >
                <Image source={ { uri: this.props.bannerSource } }  style={ styles.bannerImage } />  
            </View>
        )
    }
    _renderEvent(){
        return(
                <ScrollView style={ styles.container }>
                    <StatusBar
                        backgroundColor = {primaryDark}
                        barStyle="light-content"
                    />
                    <View style = { styles.titleContainer }>
                        <Text style = { styles.title }>{this.props.name}</Text>                  
                    </View>
                    <View style = { styles.eventDetailContainer }>
                        {this.props.bannerSource != '' ? this._renderBanner() : null }
                        <View style = { styles.contentContainer } >
                            <View style = { styles.totalDistanceContainer } >
                                <Text style = { styles.totalDistance }>{this.props.totalDistance.toString()}<Text style = { styles.distanceWeekSmallText }>KM</Text></Text>
                                <ProgressBarMini reachedBarColor={ secondary } value={Number(this.props.overallDistanceTravelled)} total={Number(this.props.totalDistance)}/>
                            </View>
                            <View style = { styles.distanceContainer }>
                                <View style = { styles.daysLeftContainer }>
                                    <Text style = { styles.daysLeftText }>{this.props.daysLeft}</Text>
                                    <Text style = { styles.distanceWeekSmallText }>Days Left</Text>
                                </View>
                                <View style = { styles.totalDistanceCurrentContainer }>
                                    <View style = { styles.totalDistanceRunContainer }>
                                        <Text style = { styles.distanceWeekText }>{this.props.distanceWeeklyLeft.toString()} <Text style = { styles.distanceWeekSmallText }>KM</Text></Text>
                                        <Text style = { styles.distanceWeekSmallText }>Left</Text>
                                    </View>
                                </View>
                            </View>
                            <View style = { styles.bibContainer }>
                                <Text style = { styles.distanceWeekSmallText }>{ this.props.bibNumber }</Text>
                            </View>
                        </View>
                    </View>
                    <View style = { styles.startContainer }>
                        <PrimaryButton states={{title: 'Start'  ,onPress: this.startButtonPress.bind(this)}} />
                    </View>
                </ScrollView>
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
    },
    container: {
        flex: 1,

    },
    titleContainer: {
        flex: 2,
        justifyContent: 'center',
        padding: 10,
    },
    totalDistanceContainer: {
        flex: 2,
    },
    bannerContainer:{
        flex: 1,
    },
    distanceContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    bibContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    distanceWeekContainer: {
        flex: 1,
    },
    startContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 25,
    },
    eventDetailContainer:{
        flex: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        

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
    bannerImage:{
        flex: 1,
        height: 150,
    },
    contentContainer: {
        padding: 10,
    }
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
        isEventNew: state.event.isEventNew,
        bibNumber: state.latestEvent.bibNumber,
        bannerSource: state.latestEvent.bannerSource,
    }
}

export default connect(mapStateToProps)(Home)