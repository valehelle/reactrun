import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import { TimeFormatter, mToKM } from '../lib/lib.js'

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
        this.navigator = null;

        this.handleBack = (() => {
            this.finishAlert()
            return true; //avoid closing the app
        }).bind(this) //don't forget bind this, you will remenber anyway.
    }



    componentDidMount() {
        this.props.screenProps.startTracking()
        BackAndroid.addEventListener('hardwareBackPress',this.handleBack)
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress',this.handleBack)
        this.props.screenProps.stopJogging()
        this.props.screenProps.stopTracking()
    }

    startStopPressed(){
        if(this.props.isJogging){
            this.props.screenProps.stopJogging()
            this.props.screenProps.pauseTimer()
        }else{
            this.props.screenProps.startJogging()
            this.props.screenProps.startTimer()
        }
    }

    finishPressed(){
        this.props.screenProps.stopJogging()
        this.props.screenProps.pauseTimer()
        this.finishAlert()
    }

    runFinish(){
        this.props.screenProps.saveRun()
        this.props.navigation.navigate('FinishActivity',{})
        this.props.screenProps.stopTracking()
    }

    componentWillUnmount(){
        alert('unmount')
        
    }

    finishAlert(){
        this.runFinish()
        // Alert.alert(
        //     'Hey :)',
        //     'Finish with your running?',
        //     [
        //         {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
        //         {text: 'OK', onPress: () => this.runFinish()},
        //     ],
        //     { cancelable: false }
        //     )
    }
    laps(){
        return Object.keys(this.props.laps).map( key => this.props.laps[key])
    }

    _renderTitle(){
        return (
            <View style = { styles.header }>
                <Text style = { styles.title }>ReRun</Text>
            </View>
        )
    }


    _renderTimers(){
        return (
            <View style = { styles.timerWrapper }>
                <View style = { styles.timerWrapperInner }>

                    <Text style = { styles.mainTimer }>{ TimeFormatter(this.props.mainTimer) }</Text>
                    <Text style = { styles.distance }>{mToKM(this.props.totalDistance)}</Text>
                    <Text style = { styles.meter }>Meter</Text>
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
                <TouchableHighlight underlayColor='#777' onPress={() => this.startStopPressed()}  style={ [styles.buttonStart, this.props.isJogging && styles.buttonStop] }>
                    <Text style={ [styles.startBtn, this.props.isJogging && styles.stopBtn] } >{ this.props.isJogging? 'Stop' : 'Start' }</Text>
                </TouchableHighlight>
            </View>
        )
    }

    render(){
        return (
            <View style={ styles.container }>
                <View style = {styles.top}>
                    { this._renderTitle() }
                    { this._renderTimers() }
                </View>
                <View style = { styles.middle } >
                    { this._renderDistance() }
                    { this._renderLapse() }
                </View>
                <View style = { styles.bottom }>
                    { this._renderButtons() }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container:{
        paddingTop: 20,
        flex: 1,
        backgroundColor: '#000000',
    },
    header: {
        borderBottomWidth: 0.5,
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: '#2B2B2B',
    },
    title: {
        alignSelf: 'center',
        fontWeight: '600',
        color: '#FFFFFF'
    },
    timerWrapper: {
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,
    },
    top: {
        flex: 3,
    },
    middle: {
        flex: 2,
    },
    bottom: {
        flex: 2,
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
        paddingBottom: 30,
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
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
    },
    buttonFinishActive: {
        height: 80,
        width: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 0, 0.2)',
    },
    buttonFinishUnactive: {
        height: 80,
        width: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 0, 0.1)',
    },
    startBtn: {
        color: '#00cc00',
    },
    finishBtnActive: {
        color: 'yellow',
    },
    finishBtnUnactive: {
        color: 'grey',
    },
    stopBtn: {
        color: '#FF0000'
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
    distanceWrapperInner: {

    }
})

function mapStateToProps(state){
    return{
        totalDistance: state.location.totalDistanceTravelled,
        mainTimer: state.timer.mainTimer,
        isPause: state.timer.isPause,
        isActive: state.activity.isActive,
        isJogging: state.activity.isJogging,
        laps: state.activity.laps,
    }
}

export default connect(mapStateToProps)(Home)