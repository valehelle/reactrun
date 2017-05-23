import { TabNavigator, StackNavigator } from 'react-navigation'
import Home from './Home'
import Event from './Event'
import Activity from './Activity'

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

export const TabNavigations = TabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarLabel: 'Home',
        },
    },
    Event: {
        screen: Event,
        navigationOptions: {
            tabBarLabel: 'Event'
        }
    }
},{
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
