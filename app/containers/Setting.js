import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import { DateFormatter, mToKM, TimeNiceFormatter, DateNiceFormatter } from '../lib/lib'
import PrimaryButton from  '../components/PrimaryButton'
import { secondary } from '../lib/colors'

const {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ScrollView,
} = ReactNative

class Setting extends Component{

    componentDidMount() {
      
    }

    aboutPressed(){
        this.props.navigation.navigate('Web',{ name: 'About', url: 'https://valehelle.github.io/venv/about.html'})
    }

    termsPressed(){
        this.props.navigation.navigate('Web',{ name: 'Terms & Condition', url: 'https://valehelle.github.io/venv/terms.html'})
    }

    privacyPressed(){
        this.props.navigation.navigate('Web',{ name: 'Privacy', url: 'https://valehelle.github.io/venv/privacy.html'})
    }

    render(){
        return (
            <ScrollView>
                <View style = {styles.container} >
                    <View style = {styles.about}>
                        <TouchableOpacity activeOpacity={ 0.8 } onPress={() => this.aboutPressed()}>
                            <Text>About</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.about}>
                        <TouchableOpacity activeOpacity={ 0.8 } onPress={() => this.termsPressed()}>
                            <Text>Terms & Condition</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.about}>
                        <TouchableOpacity activeOpacity={ 0.8 } onPress={() => this.privacyPressed()}>
                            <Text>Privacy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: 10,
    },
    about:{
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 5,
    }
})

function mapStateToProps(state){
    return{
        name: state.latestEvent.name,
    }
}

export default connect(mapStateToProps)(Setting)