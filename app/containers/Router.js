import { TabNavigator, StackNavigator } from 'react-navigation'
import Home from './Home'
import Event from './Event'
import Activity from './Activity'
import CreateEvent from './CreateEvent'
import EventDetail from './EventDetail'
import FinishActivity from './FinishActivity'
import Setting from './Setting'
import Web from './Web'
import TreadmillActivity from './Treadmill'
import Promo from './Promo'
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
    TreadmillActivity:{
        screen: TreadmillActivity,
        navigationOptions:{
            title: 'Save Run',
            headerStyle: {
                backgroundColor: primary,
            },
            headerTintColor: headerTint,
        }
    },

}, {
    headerMode: 'none',
})

export const PromoStack = StackNavigator({
   Promo:{
        screen: Promo,
        navigationOptions:{
            title: 'Events Available',
            headerStyle: {
                backgroundColor: primary,
            },
            headerTintColor: headerTint,
        }
    },  

})

export const EventStack = StackNavigator({
    Event:{
        screen: Event,
        navigationOptions:{
            title: 'Events',
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
export const SettingStack = StackNavigator({
    Setting:{
        screen: Setting,
        navigationOptions:{
            title: 'Settings',
            headerStyle: {
                backgroundColor: primary,
            },
            headerTintColor: headerTint,
        }
    },
    Web:{
        screen: Web,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.name}`,
            headerStyle: {
                backgroundColor: primary,
            },
            headerTintColor: headerTint,
        }),
    }
})


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
                        source={require('../icons/ic_event_available_black_24dp_2x.png')}
                        style={[styles.icon, {tintColor: tintColor}]}
                    />
            ),
        }
    },
    Promo: {
        screen: PromoStack,
        navigationOptions: {
            tabBarLabel: 'Events Available',
            tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={require('../icons/ic_event_black_24dp_2x.png')}
                        style={[styles.icon, {tintColor: tintColor}]}
                    />
            ),
        }
    },
    Setting: {
        screen: SettingStack,
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={require('../icons/ic_settings_black_24dp_2x.png')}
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
