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
                    <Text>Distance: { this.props.distance }</Text>
                    <Text>Time: { this.props.time }</Text>
                    <Text>Pace: { this.props.pace }</Text>
                    <Text>Date: { this.props.date }</Text>
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
        date: state.runDetail.date,
    }
}

export default connect(mapStateToProps)(FinishActivity)