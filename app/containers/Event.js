import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux' 
import { NavigationActions } from 'react-navigation'
import { DateNiceFormatter } from '../lib/lib'
import PrimaryButton from  '../components/PrimaryButton'
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu'

const {
    FlatList,
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Alert,
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
        if(this.props.eventDeleted){
            this.props.screenProps.getEvents()
        }
    }


    deleteEvent(eventID){
        let eventDetail =
        {
            eventID : eventID,
        }
        this.props.screenProps.deleteEvent(eventDetail)
    }

    handleDelete(eventID){
        Alert.alert(
            'Alert',
            'Are you sure you want to delete this event?',
            [
                {text: 'NO', onPress: () => null},
                {text: 'YES', onPress: () => this.deleteEvent(eventID)},
            ],
            { cancelable: false }
        )
    }
    handleMenu(value,eventID){
        if(value === 1){
            this.handleDelete(eventID)
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
                                        <View style = {styles.nameWrapper}>   
                                            <Text style = { styles.nameText } >{ item.name }</Text>
                                        </View>
                                            <Menu style = {styles.eventDetailButtonWrapper} onSelect={(value) => this.handleMenu(value,item.id)}>
                                                <MenuTrigger style = {styles.eventDetailButton}>
                                                    <Text style={{ fontSize: 20 }}>&#8942;</Text>
                                                </MenuTrigger>
                                                <MenuOptions>
                                                    <MenuOption value={1}>
                                                    <Text>Delete</Text>
                                                    </MenuOption>
                                                </MenuOptions>
                                            </Menu>
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameText: {
        fontSize: 14,
        
    },
    distanceText: {
        fontSize: 14,
    },
    nameWrapper: {
        flex: 9,
    },
    eventDetailButtonWrapper:{
        flex: 1,
        alignItems: 'center',
    },
    eventDetailButton:{
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1,
    },

})

function mapStateToProps(state){
    return{
        events: state.event.events,
        goToDetail: state.event.goToDetail,
        eventDeleted: state.event.eventDeleted,
    }
}

export default connect(mapStateToProps)(Event)