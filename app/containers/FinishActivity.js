import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux' 
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
    render(){
        return (
            <View style = { styles.container } >
                <View style = { styles.detailWrapper } >
                    <Text>You ran <Text style = {styles.totalDistanceText}> {this.props.distance} </Text>KM</Text>
                    <Text>in {this.props.time}</Text>
                    <Text>Your pace is {this.props.pace} meters per minute</Text>
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
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 15,    
    },
    totalDistanceText: {
        fontSize: 25,
    }
})


function mapStateToProps(state){
    return{
        id: state.runDetail.id,
        distance: state.runDetail.distance,
        time: state.runDetail.time,
        pace: state.runDetail.pace,
    }
}

export default connect(mapStateToProps)(FinishActivity)