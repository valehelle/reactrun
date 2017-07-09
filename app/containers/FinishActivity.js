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
                <View style = { styles.titleWrapper } >
                    <View style = { styles.titleContainer } >
                        <Text style = { styles.titleText } >{ this.props.title } - Day { this.props.day }</Text>
                    </View>
                </View>
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
                        lineJoin= {'miter'}
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
                        <View  style = { styles.detailInfoContainer } >
                            <Text style = { styles.detailText } >{ mToCurrentUnit(this.props.unit, this.props.distance) }</Text>
                            <Text>Distance</Text>
                        </View>
                        <View  style = { styles.detailInfoContainer } >
                            <Text style = { styles.detailText } >{ this.props.time }</Text>
                            <Text>Duration</Text>
                        </View>
                        <View  style = { styles.detailInfoContainer } >
                            <Text style = { styles.detailText } >{  mToCurrentUnit(this.props.unit, this.props.pace)}</Text>
                            <Text>Pace</Text>
                        </View>
                    </View>
                    <View style = {styles.detailDateContainer}>
                        <Text>{ this.props.date }</Text>
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
        flex: 2,
        backgroundColor: 'white',
        marginBottom: 5,
    },
    titleWrapper: {
        flex: 1,
        
    },
    totalDistanceText: {
        fontSize: 25,
    },
    map:{
        flex: 8,
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
        marginTop: 15,
        margin: 5,
        flexDirection: 'row',
    },
    detailDateContainer:{
        alignItems: 'center',
    },
    detailInfoContainer: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
    },
    titleContainer: {
        backgroundColor: 'white',
        padding: 10,
    },
    titleText: {
        fontSize: 20,
    },
    detailText:{
        fontSize: 30,
        color: 'black',
    }
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
        title: state.runDetail.title,
        day: state.runDetail.day
    }
}

export default connect(mapStateToProps)(FinishActivity)