import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import { TimeFormatter, mToCurrentUnit, unitText } from '../lib/lib.js'
import { NavigationActions } from 'react-navigation'
import { secondary, primaryTextButton, primary } from '../lib/colors'
import PrimaryButton from '../components/PrimaryButton'
import MapView from 'react-native-maps' 

const {
    View,
    StyleSheet,
    Text,
    Modal,
    Alert,
    ScrollView,
    BackAndroid,
    TouchableOpacity,
} = ReactNative



class Activity extends Component{

    constructor(props) {
        super(props)

        this.state = {isCountDown: false, countTimer: 3};

        this.navigator = null;

        this.handleBack = (() => {
            this.finishPressed()
            return true; //avoid closing the app
        }).bind(this) //don't forget bind this, you will remenber anyway.
    }


    componentDidMount() {
        this.props.screenProps.getEventDetails()
        BackAndroid.addEventListener('hardwareBackPress',this.handleBack)
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress',this.handleBack)
        this.props.screenProps.stopJogging()
        clearInterval(this.countInterval)
    }

    startStopPressed(){
        if(this.props.accuracy <= 0 && !this.props.isActive){
            alert('We are still finding your location')
        }else{
            if(this.props.isJogging){
                this.props.screenProps.stopJogging()
                this.props.screenProps.pauseTimer()
            }else{
                this.props.screenProps.startJogging()
                this.props.screenProps.startTimer()
            }
        }

        // if(this.state.countTimer === ''){
        //     if(this.props.isJogging){
        //         this.props.screenProps.stopJogging()
        //         this.props.screenProps.pauseTimer()
        //     }else{
        //         this.props.screenProps.startJogging()
        //         this.props.screenProps.startTimer()
        //     }
        // }else if (!this.state.isCountDown){
        //     if(this.props.accuracy <= 0){
        //         alert('We are still finding your location')
        //     }else{
        //         this.props.screenProps.startJogging()
        //         this.props.screenProps.startTimer()
        //         //Remove countdown for now
        //         this.setState({isCountDown: true})
        //         this.startCountDown()
        //     }
            
        // }
    }


    startCountDown(){
            if(this.state.countTimer === 3){
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

    componentDidUpdate() {
        if(this.props.runSaved){
            this.props.navigation.navigate('FinishActivity',{})
        }
    }


    runFinish(){
        if(this.props.isActive && this.props.totalDistance > 0){
            this.props.screenProps.saveRun()
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
            if(this.props.distanceWeekly > this.props.totalDistance){
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
                    <Text style = { styles.mainTimer }>{ TimeFormatter(this.props.mainTimer) }</Text>
                    <Text style = { styles.distance }>{ mToCurrentUnit(this.props.unit,this.props.totalDistance) }</Text>
                    <Text style = { styles.meter }>{ unitText(this.props.unit) }</Text>
            </View>
        )
    }
    _renderDistance(){
        return (
            <View style = { styles.distanceWrapper }>
                <View style = { styles.distanceWrapperInner }>
                    <Text style = { styles.meter }>{ unitText(this.props.unit) }</Text>
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
            <View>
                <Text style={ [styles.gpsred, this.props.accuracy > 0 && styles.gpsgreen] } >GPS { this._renderGPSText(this.props.accuracy) }</Text>
                <View style = { styles.buttonWrapper }>
                    <TouchableOpacity activeOpacity={ 0.8 } disabled= { !this.props.isActive } onPress={() => this.finishPressed()} style={ [styles.buttonFinishUnactive, this.props.isActive && styles.buttonFinishActive] }>
                        <Text style = { [styles.finishBtnUnactive, this.props.isActive && styles.finishBtnActive] }>Finish</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={ 0.8 }  onPress={() => this.startStopPressed()}  style={ [styles.buttonStart, this.props.isJogging && styles.buttonStop] }>
                        <Text style={ [styles.startBtn, this.props.isJogging && styles.stopBtn] } >{ this.props.isJogging? 'Pause' : 'Start' }</Text>
                    </TouchableOpacity>
                </View>
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

    _renderGPSText(accuracy){
        GPSText = 'Finding Location'
        if(accuracy <= 0){
            GPSText = 'Finding Location'
        }else if(accuracy < 50 ){
            GPSText = 'Excellent'
        }else if(accuracy < 100){
            GPSText = 'Good'
        }else if (accuracy < 200){
            GPSText = 'Bad'
        }else{
            GPSText = 'Terrible'
        }
        return GPSText
    }

    _renderGoal(){
        return (
            <View style = { styles.goalWrapper }>
                <Text style={ styles.meter } ></Text>
                <Text style={ styles.meter } >Goal { mToCurrentUnit(this.props.unit,this.props.distanceGoal) } { unitText(this.props.unit) }</Text>
            </View>
        )
    }



  componentWillReceiveProps(){
      this.moveUserCenter()
  }
    moveUserCenter(){
        this.map.animateToCoordinate(this.props.prevLatLng,100);
    }

    render(){
        return (
                <ScrollView >
                <View style={ styles.container }>
                    <View style = {styles.content}>
                        <View style = {styles.map}>
                            <MapView
                                ref={ref => { this.map = ref }}
                                style = {styles.mapView}
                                initialRegion={{
                                    latitude: this.props.startLat,
                                    longitude: this.props.startLng,
                                    latitudeDelta: 0.0020,
                                    longitudeDelta: 0.0020,
                                }}
                                showsUserLocation= {true}
                                showsMyLocationButton={false}
                                onLayout={()=> this.moveUserCenter()}
                                >
                                { this._renderPath}
                                <MapView.Polyline
                                    coordinates={ this.props.gps }
                                    strokeColor= { secondary }
                                    strokeWidth={5}
                                />
                            </MapView>
                        </View>
                        <View style = { styles.middle } >
                            { this._renderTimers() }
                             { this._renderGoal() }
                        </View>
                        { this._renderButtons() }
                        <View style = { styles.bottom }>
                             { this._renderExitButton() }
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
    },
    content: {
        flex: 1,
    },
    header: {
        paddingBottom: 10,
    },
    title: {
        alignSelf: 'center',
        fontWeight: '600',
        fontSize: 17,
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
        backgroundColor: 'white',
    },
    bottom: {
        flex: 1,
        paddingBottom: 10,
    },
    map:{
      flex: 6,  
    },
    mainTimer: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'HelveticaNeue-Light',

    },
    distance: {
        fontSize: 80,
        textAlign: 'center',
        fontFamily: 'HelveticaNeue-Light',

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
        backgroundColor: secondary,
    },
    buttonStop: {
        height: 80,
        width: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: secondary,
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
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
        color: 'white',
    },
    finishBtnActive: {
        color: '#FF0000',
    },
    finishBtnUnactive: {
        color: 'white',
    },
    stopBtn: {
        color: 'white',
    },
    meter: {
        textAlign: 'center',
        marginBottom: 10,
    },
    gpsred: {
        textAlign: 'center',
        marginBottom: 10,
        color: 'red',
        marginTop: 15,
    },
    gpsgreen: {
        textAlign: 'center',
        marginBottom: 10,
        color: 'green',
        marginTop: 15,
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
        fontSize: 30,
    },
    mapView: {
        flex:1,
        height: 200,
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
        startLat: state.location.startLat,
        startLng: state.location.startLng,
        prevLatLng: state.location.prevLatLng,
        gps: state.location.allLatLng,
        unit: state.user.unit,
        accuracy: state.location.accuracy,
        runSaved: state.location.runSaved,
    }
}

export default connect(mapStateToProps)(Activity)