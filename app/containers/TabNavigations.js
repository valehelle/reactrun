import { TabNavigator, StackNavigator } from 'react-navigation'
import Home from './Home'
import Feed from './Feed'

export const TabNavigations = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Home',
        },
    },
    Feed: {
        screen: Feed,
        navigationOptions: {
            tabBarLabel: 'Feed'
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
