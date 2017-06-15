import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import { DateFormatter, mToKM, TimeNiceFormatter, DateNiceFormatter } from '../lib/lib'
import PrimaryButton from  '../components/PrimaryButton'
import { secondary } from '../lib/colors'

const {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ScrollView,
} = ReactNative

class WebView extends Component{

    componentDidMount() {
      
    }

    aboutPressed(){

    }

    render(){
        return (
            <ScrollView>
                <View style = {styles.container} >
                    <Text>About</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: 10,
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

export default connect(mapStateToProps)(WebView)