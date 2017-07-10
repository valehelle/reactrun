import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux' 
import { NavigationActions } from 'react-navigation'
import { DateNiceFormatter } from '../lib/lib'
import PrimaryButton from  '../components/PrimaryButton'
import { secondary } from '../lib/colors'
const {
    FlatList,
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    Linking,
} = ReactNative

class Event extends Component{

    componentDidMount() {
        this.props.screenProps.getPromoEvents()
    }


    eventPromoDetails(url){
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }

     _keyExtractor = (item, index) => item.id;

    render(){
        return (
            <View style = { styles.container } >

                <FlatList
                    style = { styles.eventListContainer } 
                    data={ this.props.events }
                    keyExtractor={ this._keyExtractor }
                    removeClippedSubviews= { false }
                    renderItem={
                        ({item}) => (
                            <View>
                                <TouchableOpacity activeOpacity={ 0.8 } onPress={() => this.eventPromoDetails(item.url)}>
                                    <View style = { styles.eventList }>
                                        <Image
                                            source={ {'uri': item.image[0]} }
                                            style={ styles.image }
                                        />
                                        <View >
                                            <View style = { styles.eventNameWrapper }>
                                                <Text style = { styles.nameText } >{ item.name }</Text>
                                            </View>
                                            <View style = { styles.eventInfo }>
                                                <Text style = { styles.distanceText } >{ item.distance } KM</Text>
                                                <Text style = { styles.detailText } >{ item.eventStartDate } - { item.eventEndDate }</Text>
                                               
                                            </View>
                                        </View>
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
        marginBottom: 20,
    },
    nameText: {
        fontSize: 20,
        marginBottom: 5,
        color: 'white',
    },
    detailText: {
        fontSize: 15,
    },
    distanceText: {
        fontSize: 20,
        marginBottom: 5,
    },
    image:{
        height: 200,
    },
    eventInfo: {
        paddingTop: 5,
        paddingLeft: 10,
        paddingBottom: 10,
    },
    eventNameWrapper:{
        backgroundColor: secondary,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
})

function mapStateToProps(state){
    return{
        events: state.promo.events,
    }
}

export default connect(mapStateToProps)(Event)