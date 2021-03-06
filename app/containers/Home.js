import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import { mToCurrentUnit, NiceDistance, unitText } from '../lib/lib'
import { secondary, primaryTextButton, primaryDark } from '../lib/colors'
import PrimaryButton from  '../components/PrimaryButton'
import ProgressBarMini from '../components/ProgressBarMini'

const {
    View,
    StyleSheet,
    Text,
    ScrollView,
    StatusBar,
    Image,
    TouchableOpacity,
} = ReactNative

class Home extends Component{

    componentDidMount() {
        this.props.screenProps.getLatestEvent()
        this.props.screenProps.startTracking()
    }
    componentDidUpdate() {
        if(this.props.eventDeleted || this.props.runSaved || this.props.runDeleted){
            this.props.screenProps.getLatestEvent()
        }
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
    _renderStart(){
        if(new Date() < this.props.dateStart){
            return(
                <Text>This event have not started.</Text>
            )
        }else if(this.props.daysLeft == '0'){
            return(
                <Text>This event has ended.</Text>
            )
        }else{
            return(
                <PrimaryButton states={{title: 'Start'  ,onPress: this.startButtonPress.bind(this)}} />
            )
        }
    }

    _renderRunComplete(){
        return(
            <View style = { styles.iconCompleteContainer } >
                <Image source={require('../icons/ic_run_done_black_24dp_2x.png')} style={ styles.iconCompleteImage } />
                <Text style={ styles.textCompleteImage }  >Run Completed</Text>  
            </View>
        ) 
    }


    eventDetailsPressed(ID){
        this.props.screenProps.setCurEventID(ID)
        this.props.navigation.navigate('EventDetailStack',{})
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
                    <TouchableOpacity activeOpacity={ 0.8 } onPress={() => this.eventDetailsPressed(this.props.eventID)} >
                        <View style = { styles.eventDetailContainer }>
                            {this.props.bannerSource != 'null' && this.props.bannerSource != ''  ? this._renderBanner() : null }
                            <View style = { styles.contentContainer } >
                                <View style = { styles.totalDistanceContainer } >
                                    <Text style = { styles.totalDistance }>{ NiceDistance(mToCurrentUnit(this.props.unit,this.props.totalDistance)).toString() }<Text style = { styles.distanceWeekSmallText }>{ unitText(this.props.unit) }</Text></Text>
                                    <ProgressBarMini reachedBarColor={ secondary } value={Number(mToCurrentUnit(this.props.unit,this.props.overallDistanceTravelled))} total={Number(mToCurrentUnit(this.props.unit,this.props.totalDistance))}/>
                                </View>
                                <View style = { styles.distanceContainer }>
                                    <View style = { styles.daysLeftContainer }>
                                        <Text style = { styles.daysLeftText }>{this.props.daysLeft}</Text>
                                        <Text style = { styles.distanceWeekSmallText }>Days Left</Text>
                                    </View>
                                    <View style = { styles.totalDistanceCurrentContainer }>
                                        <View style = { styles.totalDistanceRunContainer }>
                                            <Text style = { styles.distanceWeekText }>{ mToCurrentUnit(this.props.unit,this.props.overallDistanceLeft)} <Text style = { styles.distanceWeekSmallText }>{ unitText(this.props.unit) }</Text></Text>
                                            <Text style = { styles.distanceWeekSmallText }>Left</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style = { styles.bibContainer }>
                                    <Text style = { styles.distanceWeekSmallText }>{ this.props.bibNumber }</Text>
                                </View>
                                {this.props.isRunComplete === true ? this._renderRunComplete() : null }
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style = { styles.startContainer }>
                        { this._renderStart() }
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
        marginBottom: 30,
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
        marginTop: 10,
        marginBottom: 10,
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
        marginBottom: 20,
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
        height: 200,
    },
    contentContainer: {
        padding: 10,
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
        name: state.latestEvent.name,
        eventID: state.latestEvent.eventID,
        totalDistance: state.latestEvent.totalDistance,
        daysLeft: state.latestEvent.daysLeft,
        overallDistanceTravelled: state.latestEvent.overallDistanceTravelled,
        overallDistanceLeft: state.latestEvent.overallDistanceLeft,
        eventCreated: state.event.eventCreated,
        isEventIDUpdated: state.event.isEventIDUpdated,
        isEventNew: state.event.isEventNew,
        bibNumber: state.latestEvent.bibNumber,
        bannerSource: state.latestEvent.bannerSource,
        isRunComplete: state.latestEvent.isRunComplete,
        dateStart: state.latestEvent.dateStart,
        unit: state.user.unit,
        eventDeleted: state.event.eventDeleted,
        runDeleted: state.latestEvent.runDeleted,
        runSaved: state.latestEvent.runSaved,
    }
}

export default connect(mapStateToProps)(Home)