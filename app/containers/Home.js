import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux' 
const Realm = require('realm')

const {
    ScrollView,
    View,
    TextInput,
    Image,
    TouchableHighlight,
    Stylesheet,
    Text,
} = ReactNative

class Home extends Component{
    render(){
        let realm = new Realm({
            schema: [{name: 'Dog', properties: {name: 'string'}}]
        })


        return (
            <View>
            <Text style={{marginTop:15,}}>
                Count of Dogs in Realm: {realm.objects('Dog').length}
            </Text>
            </View>
        )
    }
}

function mapStateToProps(state){
    return{
        searchedRecipes: state.searchedRecipes
    }
}

export default connect(mapStateToProps)(Home)