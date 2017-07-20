import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../actions'
import { Root } from './Router'
import { MenuContext } from 'react-native-menu'

class AppContainer extends Component {

    render(){
        return (
             <MenuContext style={{ flex: 1 }}>
                 <Root screenProps={{ ...this.props }}/>
            </MenuContext>
        )
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect((state) => { return {} }, mapDispatchToProps)(AppContainer)