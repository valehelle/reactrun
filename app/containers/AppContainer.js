import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { TabNavigations } from './TabNavigations'


class AppContainer extends Component {

    render(){
        return <TabNavigations screenProps={{ ...this.props }}/>
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect((state) => { return {} }, mapDispatchToProps)(AppContainer)