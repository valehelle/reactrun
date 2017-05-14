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

class Home extends Component{

searchPressed(){
    this.props.screenProps.fetchRecipesFeed('bacon,cucumber,banana')
}

recipes(){
    return Object.keys(this.props.searchedRecipes).map( key => this.props.searchedRecipes[key])
}

    render(){
        return <View style = {{marginTop: 20}} >
                <View>
                    <TouchableHighlight onPress={() => this.searchPressed()}>
                        <Text>Touch Feed</Text>
                    </TouchableHighlight>
                </View>
                <View>
                    <ScrollView>
                        {this.recipes().map(( recipe ) => {
                            return <View key={recipe.id}>
                                <Text>Name = { recipe.name }</Text>
                            </View>
                        })}
                        
                    </ScrollView>
                </View>
        </View>
    }
}

function mapStateToProps(state){
    return{
        searchedRecipes: state.searchedRecipes
    }
}

export default connect(mapStateToProps)(Home)