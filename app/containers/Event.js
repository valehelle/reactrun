import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux' 
import { NavigationActions } from 'react-navigation'
import { DateNiceFormatter } from '../lib/lib'
import PrimaryButton from  '../components/PrimaryButton'
const {
    FlatList,
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} = ReactNative

class Event extends Component{

    componentDidMount() {
        this.props.screenProps.getEvents()
    }

    createEventPressed(){
        this.props.navigation.navigate('CreateEvent',{})
    }

    eventDetails(ID){
        this.props.screenProps.setCurEventID(ID)
        this.props.screenProps.goToDetail()
    }

    componentDidUpdate() {
        if(this.props.goToDetail){
            //Redirect to another screen
            this.props.navigation.navigate('EventDetailStack',{})

        }
    }

     _keyExtractor = (item, index) => item.id;

    render(){
        return (
            <View style = { styles.container } >

                <FlatList
                ListHeaderComponent={() =>                  
                <View style = {styles.buttonContainer}>
                    <PrimaryButton  states={{title: 'Create Event'  ,onPress: this.createEventPressed.bind(this)}} />
                </View> 
                }
                    style = { styles.eventListContainer } 
                    data={ this.props.events }
                    keyExtractor={ this._keyExtractor }
                    removeClippedSubviews= { false }
                    renderItem={
                        ({item}) => (
                            <View>
                                <TouchableOpacity activeOpacity={ 0.8 } onPress={() => this.eventDetails(item.id)}>
                                    <View style = { styles.eventList }>
                                        <Text style = { styles.nameText } >{ item.name }</Text>
                                     </View>
                                 </TouchableOpacity>
                            </View>
                        )
                    }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    eventListContainer: {
        flex: 1,
        paddingTop: 10,
    },
    infoWrapper: {
        flex: 1,
        flexDirection: 'row'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    eventList:{
        backgroundColor: 'white',
        marginBottom: 2,
        padding: 10,
    },
    nameText: {
        fontSize: 14,
    },
    distanceText: {
        fontSize: 14,
    }
})

function mapStateToProps(state){
    return{
        events: state.event.events,
        goToDetail: state.event.goToDetail,
    }
}

export default connect(mapStateToProps)(Event)