import { TabNavigator, StackNavigator } from 'react-navigation'
import Home from './Home'
import Event from './Event'
import Activity from './Activity'
import CreateEvent from './CreateEvent'
import EventDetail from './EventDetail'
import FinishActivity from './FinishActivity'
import { primary, headerTint } from '../lib/colors'
import React from 'react'
import ReactNative from 'react-native'
import { _renderHeaderButton } from '../components/header'

const {
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
} = ReactNative


export const HomeStack = StackNavigator({
    Home:{
        screen: Home,
        navigationOptions:{
            title: 'Home',
            headerStyle: {
                backgroundColor: primary,
            },
            headerTintColor: headerTint,
        }
    },
})

export const EventDetailStack = StackNavigator({
   EventDetail:{
        screen: EventDetail,
        navigationOptions:{
            title: 'Event Detail',
            headerStyle: {
                backgroundColor: primary,
            },
            headerTintColor: headerTint,
        }
    },   
    FinishActivity:{
        screen: FinishActivity,
        navigationOptions:{
            title: 'Run Detail',
            headerStyle: {
                backgroundColor: primary,
            },
            headerTintColor: headerTint,
        }
    },

}, {
    headerMode: 'none',
})

export const EventStack = StackNavigator({
    Event:{
        screen: Event,
        navigationOptions:{
            title: 'Event',
            headerStyle: {
                backgroundColor: primary,
            },
            headerTintColor: headerTint,
        }
    },
    CreateEvent:{
        screen: CreateEvent,
        navigationOptions:{
            title: 'Create Event',
            headerStyle: {
                backgroundColor: primary,
            },
            headerTintColor: headerTint,
        }
    },
    EventDetailStack:{
        screen: EventDetailStack,
        navigationOptions:{
            title: 'Event',
            headerStyle: {
                backgroundColor: primary,
            },
            headerTintColor: headerTint,
        }
    },
},{
    initialRouteName: 'Event',
}
)



export const TabNavigations = TabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={require('../icons/ic_home_black_24dp_2x.png')}
                        style={[styles.icon, {tintColor: tintColor}]}
                    />
                ),
        },
    },
    Event: {
        screen: EventStack,
        navigationOptions: {
            tabBarLabel: 'Event',
            tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={require('../icons/ic_directions_run_black_24dp_2x.png')}
                        style={[styles.icon, {tintColor: tintColor}]}
                    />
            ),
        }
    }
},{
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: primary,
        showIcon : true,
        showLabel: false,
        inactiveTintColor: 'grey',
        style: {
                backgroundColor: 'white',
        },
        indicatorStyle:{
            backgroundColor: primary,
        }
    }
})

export const ActivityStack = StackNavigator({
    Activity: {
        screen: Activity,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.name}`,
            headerLeft: null,
            headerStyle: {
                backgroundColor: primary,
            },
            headerTintColor: headerTint,
        }),

    },
})

export const Root = StackNavigator({
    Tabs: {
        screen: TabNavigations,
    },
    Activity: {
        screen: ActivityStack,
    },

}, {
    mode: 'modal',
    headerMode: 'none',
})


const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});
