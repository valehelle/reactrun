import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import { DateFormatter, mToKM, TimeNiceFormatter, DateNiceFormatter } from '../lib/lib'
import PrimaryButton from  '../components/PrimaryButton'
import { secondary } from '../lib/colors'

const {
    View,
    WebView,
    Text,
    StyleSheet,
    ScrollView,
} = ReactNative

class Web extends Component{

    componentDidMount() {
      
    }

    aboutPressed(){

    }

    render(){
        const {state} = this.props.navigation

        return ( 
                    <WebView
                        source={{uri: state.params.url}}
                    />     
                )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    about:{
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 5,
    }
})

function mapStateToProps(state){
    return{}
}

export default connect(mapStateToProps)(Web)