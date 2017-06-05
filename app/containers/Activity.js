import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import { TimeFormatter, mToKM } from '../lib/lib.js'
import { NavigationActions } from 'react-navigation'
import { secondary, primaryTextButton, primary } from '../lib/colors'
import PrimaryButton from '../components/PrimaryButton'

const {
    View,
    TouchableHighlight,
    StyleSheet,
    Text,
    Modal,
    Alert,
    ScrollView,
    BackAndroid,
} = ReactNative



class Home extends Component{

    constructor(props) {
        super(props)

        this.state = {isCountDown: false, countTimer: 5};

        this.navigator = null;

        this.handleBack = (() => {
            this.finishAlert()
            return true; //avoid closing the app
        }).bind(this) //don't forget bind this, you will remenber anyway.
    }


    componentDidMount() {
        this.props.screenProps.startTracking()
        this.props.screenProps.getEventDetails()
        BackAndroid.addEventListener('hardwareBackPress',this.handleBack)
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress',this.handleBack)
        this.props.screenProps.stopJogging()
        this.props.screenProps.stopTracking()
        clearInterval(this.countInterval)
    }

    startStopPressed(){
        if(this.state.countTimer === ''){
            if(this.props.isJogging){
                this.props.screenProps.stopJogging()
                this.props.screenProps.pauseTimer()
            }else{
                this.props.screenProps.startJogging()
                this.props.screenProps.startTimer()
            }
        }else if (!this.state.isCountDown){
            this.setState({isCountDown: true})
            this.startCountDown()
        }
    }


    startCountDown(){
            if(this.state.countTimer === 5){
                this.countInterval = setInterval(() => {
                    countTimer = this.state.countTimer
                    countTimer = countTimer - 1
                    if(countTimer < 1 ){
                        countTimer = ''  
                    }
                    if(countTimer < 1){
                        clearInterval(this.countInterval)
                        this.setState({countTimer: countTimer})
                        this.startStopPressed()
                    }
                    this.setState({countTimer: countTimer})

                },1000)
            }
    }

    finishPressed(){
        this.props.screenProps.stopJogging()
        this.props.screenProps.pauseTimer()
        this.finishAlert()
    }

    runFinish(){
        if(this.props.isActive){
            this.props.screenProps.saveRun()
            this.props.navigation.navigate('FinishActivity',{})
        }else{
            const backAction = NavigationActions.back({
            })
            this.props.navigation.dispatch(backAction)
        }
        this.props.screenProps.stopTracking()
    }

    finishAlert(){
        if(this.props.isActive){
            let title = 'Congrats!'
            let sub = 'Finish with your running?'
            if(this.props.distanceWeekly > mToKM(this.props.totalDistance)){
                title = 'Dont give up yet!'
                sub = 'Are you sure you want to stop?'
            }
            Alert.alert(
                title,
                sub,
                [
                    {text: 'No', onPress: () => console.log('Cancel Pressed')},
                    {text: 'Yes', onPress: () => this.runFinish()},
                ],
                { cancelable: false }
                )
        }else{
            this.runFinish()
        }
    }
    laps(){
        return Object.keys(this.props.laps).map( key => this.props.laps[key])
    }

    _renderTitle(){
        return (
            <View style = { styles.header }>
                <Text style = { styles.title }>{ this.props.name }</Text>
            </View>
        )
    }


    _renderTimers(){
        return (
            <View style = { styles.timerWrapper }>
                <View style = { styles.timerWrapperInner }>

                    <Text style = { styles.mainTimer }>{ TimeFormatter(this.props.mainTimer) }</Text>
                    <Text style = { styles.distance }>{mToKM(this.props.totalDistance)}</Text>
                    <Text style = { styles.meter }>KM</Text>
                </View>
            </View>
        )
    }
    _renderDistance(){
        return (
            <View style = { styles.distanceWrapper }>
                <View style = { styles.distanceWrapperInner }>
                    <Text style = { styles.meter }>KM</Text>
                </View>
            </View>
        )
    }

    _renderLapse(){
        return(
            <View style = { styles.lapsWrapper }>
                <ScrollView>
                    { this.laps().map((laps) => {
                        return (
                            <View key = {laps.id} style = { styles.lapsWrapper }>
                                <Text style = { styles.lapsTime } > {laps.id} </Text>
                                <Text style = { styles.lapsTime } > {TimeFormatter(laps.time)} </Text>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        )    
    }

    _renderButtons(){
        return (
            <View style = { styles.buttonWrapper }>
                <TouchableHighlight underlayColor='#777' disabled= { !this.props.isActive } onPress={() => this.finishPressed()} style={ [styles.buttonFinishUnactive, this.props.isActive && styles.buttonFinishActive] }>
                    <Text style = { [styles.finishBtnUnactive, this.props.isActive && styles.finishBtnActive] }>Finish</Text>
                </TouchableHighlight>
                <Text style={ styles.countTimerText }>{ this.state.countTimer }</Text>
                <TouchableHighlight underlayColor='#777' onPress={() => this.startStopPressed()}  style={ [styles.buttonStart, this.props.isJogging && styles.buttonStop] }>
                    <Text style={ [styles.startBtn, this.props.isJogging && styles.stopBtn] } >{ this.props.isJogging? 'Pause' : 'Start' }</Text>
                </TouchableHighlight>
            </View>
        )
    }

    _renderExitButton(){
        return (
            <View style = { styles.buttonWrapper }>
                <PrimaryButton states={{title: 'Exit'  ,onPress: this.finishPressed.bind(this)}} />
            </View>
        )
    }

    _renderGoal(){
        return (
            <View style = { styles.goalWrapper }>
                <Text style={ styles.meter } >Goal</Text>
                <Text style={ styles.distance } >{ this.props.distanceGoal }</Text>
                <Text style={ styles.meter } >KM </Text>
                { this._renderExitButton() }
            </View>
        )
    }

    render(){
        return (
           
                <View style={ styles.container }>
                    <View style = {styles.content}>
                            <View style = { styles.middle } >
                                { this._renderTimers() }
                                { this._renderButtons() }
                            </View>
                            <View style = { styles.bottom }>
                                { this._renderGoal() }
                            </View>
                    </View>
                </View>
            
        )
    }
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
    },
    content: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 10,
    },
    header: {
        paddingBottom: 10,
    },
    title: {
        alignSelf: 'center',
        fontWeight: '600',
        fontSize: 17,
        color: '#FFFFFF'
    },
    timerWrapper: {
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,
    },
    top: {
        flex: 2,
        backgroundColor: 'black',
        justifyContent: 'center', 
    },
    middle: {
        flex: 1,
    },
    bottom: {
        flex: 1,
    },
    mainTimer: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'HelveticaNeue-Light',
        color: '#FFFFFF'
    },
    distance: {
        fontSize: 80,
        textAlign: 'center',
        fontFamily: 'HelveticaNeue-Light',
        color: '#FFFFFF',
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 15,
    },
    buttonStart: {
        height: 80,
        width: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 204, 0, 0.2)',
    },
    buttonStop: {
        height: 80,
        width: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 0, 0.2)',
    },
    buttonFinishActive: {
        height: 80,
        width: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
    },
    buttonFinishUnactive: {
        height: 80,
        width: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    buttonExit: {        
        height: 80,
        width: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: secondary,
    },
    exitTextBtn: {
        color: primaryTextButton,
    },
    startBtn: {
        color: '#00cc00',
    },
    finishBtnActive: {
        color: '#FF0000',
    },
    finishBtnUnactive: {
        color: 'rgba(255, 255, 255, 0.4)',
    },
    stopBtn: {
        color: 'yellow'
    },
    meter: {
        textAlign: 'center',
        color: '#FFFFFF',
    },
    lapsWrapper: {
        flex: 4,
        flexDirection: 'row',
    },
    lapsTime: {
        flex: 1,
        color: '#FFFFFF'
    },
    distanceWrapper: {
        flex: 1,
    },
    goalWrapper: {
        flex: 1,
    },
    countTimerText: {
        textAlign: 'center',
        color: 'red',
    },
})

function mapStateToProps(state){
    return{
        totalDistance: state.location.totalDistanceTravelled,
        mainTimer: state.timer.mainTimer,
        countTimer: state.timer.countTimer,
        isPause: state.timer.isPause,
        isActive: state.activity.isActive,
        isJogging: state.activity.isJogging,
        laps: state.activity.laps,
        name: state.currentEvent.name,
        distanceWeekly: state.currentEvent.distanceWeekly,
        distanceWeeklyLeft: state.currentEvent.distanceWeeklyLeft,
        distanceGoal: state.currentEvent.distanceGoal,
    }
}

export default connect(mapStateToProps)(Home)