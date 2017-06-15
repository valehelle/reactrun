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
        return (
                <View style = {styles.container} >
                    <WebView
                        source={{uri: 'https://sites.google.com/view/reactrun/home'}}
                    />
                </View>        
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
    return{
        name: state.latestEvent.name,
    }
}

export default connect(mapStateToProps)(Web)