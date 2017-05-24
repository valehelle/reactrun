import { TabNavigator, StackNavigator } from 'react-navigation'
import Home from './Home'
import Event from './Event'
import Activity from './Activity'
import CreateEvent from './CreateEvent'
import EventDetail from './EventDetail'

export const HomeStack = StackNavigator({
    Home:{
        screen: Home,
        navigationOptions:{
            title: 'Recharge',
        }
    },
},{
    headerMode: 'none',
})

export const EventStack = StackNavigator({
    Event:{
        screen: Event,
        navigationOptions:{
            title: 'Event',
        }
    },
    CreateEvent:{
        screen: CreateEvent,
        navigationOptions:{
            title: 'Create Event',
        }
    },
   EventDetail:{
        screen: EventDetail,
        navigationOptions:{
            title: 'Event Detail',
        }
    },
})


export const TabNavigations = TabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarLabel: 'Home',
        },
    },
    Event: {
        screen: EventStack,
        navigationOptions: {
            tabBarLabel: 'Event'
        }
    }
},{
    tabBarPosition: 'bottom',
    tabBarOptions: {
        style: {
            backgroundColor: '#2B2B2B',
        },
        activeTintColor: 'yellow',
    }
})

export const Root = StackNavigator({
    Tabs: {
        screen: TabNavigations,
    },
    Activity: {
        screen: Activity,
        navigationOptions:{
            title: 'Activity',
        }
    },
}, {
    mode: 'modal',
    headerMode: 'none',
})
