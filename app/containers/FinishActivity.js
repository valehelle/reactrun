import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux' 
const {
    ScrollView,
    View,
    TextInput,
    Image,
    TouchableHighlight,
    Stylesheet,
    Text,
} = ReactNative

class FinishActivity extends Component{

    render(){
        return <View style = {{marginTop: 20}} >
                <Text>Finish Activity</Text>
                </View>
    }
}

function mapStateToProps(state){
    return{
        searchedRecipes: state.searchedRecipes
    }
}

export default connect(mapStateToProps)(FinishActivity)