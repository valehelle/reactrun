import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import { secondary } from '../lib/colors'
import MapView from 'react-native-maps'
import { mToCurrentUnit, unitText } from '../lib/lib'
const {
    ScrollView,
    View,
    TextInput,
    Image,
    StyleSheet,
    Text,
} = ReactNative

class FinishActivity extends Component{

    componentDidMount() {
        this.props.screenProps.getRunDetails()
    }
    fitToAll(){
        const DEFAULT_PADDING = { top: 30, right: 30, bottom: 30, left: 30 };
        this.map.fitToCoordinates(this.props.gps, {
            edgePadding: DEFAULT_PADDING ,
            animated: false,
        });
    }
    render(){
        return (
            <View style = { styles.container } >
                <View style = {styles.map}>
                    <MapView
                        ref={ref => { this.map = ref }}
                        style = {styles.mapView}
                        initialRegion={{
                            latitude: this.props.startLat,
                            longitude: this.props.startLng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        onLayout={()=> this.fitToAll()}
                        scrollEnabled = {false}
                        zoomEnabled={false}
                        pitchEnabled={false}
                        rotateEnabled={false}
                    >
                        <MapView.Polyline
                            coordinates={ this.props.gps }
                            strokeColor= { secondary }
                            strokeWidth={5}
                            lineCap="round"
                        />
                    
                    </MapView>
                </View>
                <View style = { styles.detailWrapper } >
                    <View style = { styles.detailContainer } >
                        <Text>Distance: { mToCurrentUnit(this.props.unit, this.props.distance) } { unitText(this.props.unit) }</Text>
                        <Text>Time: { this.props.time }</Text>
                        <Text>Pace: {  mToCurrentUnit(this.props.unit, this.props.pace)} { unitText(this.props.unit) }/Minute</Text>
                        <Text>Date: { this.props.date }</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    detailWrapper: {
        flex: 4,
    },
    totalDistanceText: {
        fontSize: 25,
    },
    map:{
        flex: 4,
    },
    mapView: { 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,        
    },
    detailContainer: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 15,
    },
})


function mapStateToProps(state){
    return{
        id: state.runDetail.id,
        distance: state.runDetail.distance,
        time: state.runDetail.time,
        pace: state.runDetail.pace,
        date: state.runDetail.date,
        gps: state.runDetail.gps,
        startLat: state.runDetail.startLat,
        startLng: state.runDetail.startLng,
        unit: state.user.unit,
    }
}

export default connect(mapStateToProps)(FinishActivity)