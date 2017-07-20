import React, { Component } from 'react'
import ReactNative from 'react-native'
import { connect } from 'react-redux'
import DatePicker from 'react-native-datepicker'
import { NavigationActions } from 'react-navigation'
import { toDate, addMonths } from '../lib/lib'
import { TextField } from 'react-native-material-textfield'
import PrimaryButton from  '../components/PrimaryButton'
import { unitText } from '../lib/lib'

const dismissKeyboard = require('dismissKeyboard')
const ImagePicker = require('react-native-image-picker')

const {
    TextInput,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Image,
} = ReactNative




class Treadmill extends Component{

    constructor(props) {
        super(props);
        this.state = { 
            distance: '0',
            bannerSource: { uri: '' },
            bannerName: 'null',
            hour: '',
            minute: '',
            second: '',
        }
    }

    onTextDistanceChanged(distance) {
        // code to remove non-numeric characters from text
        let pattern = /^[0-9]*(?:\.[0-9]*)?$/
        var res = pattern.test(distance);
        if(res){
            this.setState({distance: distance})
        }else{
            let distance = this.state.distance
            if(distance.length > 1){
                distance.substr(0,(distance.length - 1))
            }else{
                distance = ''
            }
            this.setState({distance: distance})
        }
    }
    onTextHourChanged(time) {
        // code to remove non-numeric characters from text
        let pattern = /^\d+$/
        var res = pattern.test(time);
        if(res){
            this.setState({hour: time})
        }else if(time === ''){
            this.setState({hour: time})
        }
        else{
            let time = this.state.hour
            if(time.length > 1){
                time.substr(0,(time.length - 1))
            }else{
                time = ''
            }
            this.setState({hour: time})
        }
    }
    onTextMinuteChanged(time) {
        // code to remove non-numeric characters from text
        let pattern = /^\d+$/
        var res = pattern.test(time);
        if(res){
            if(parseInt(time) < 60){
                this.setState({minute: time})
            }
        }else if(time === ''){
            this.setState({minute: time})
        }
        else{
            let time = this.state.minute
            if(time.length > 1){
                time.substr(0,(time.length - 1))
            }else{
                time = ''
            }
            this.setState({minute: time})
        }
    }
    onTextSecondChanged(time) {
        // code to remove non-numeric characters from text
        let pattern = /^\d+$/
        var res = pattern.test(time);
        if(res){
            if(parseInt(time) < 60){
                this.setState({second: time})
            }
        }else if(time === ''){
            this.setState({second: time})
        }
        else{
            let time = this.state.second
            if(time.length > 1){
                time.substr(0,(time.length - 1))
            }else{
                time = ''
            }
            this.setState({second: time})
        }
    }

    onTextNameChanged(name) {
        this.setState({name: name})
    }
    

    savePressed(){
        if(this.state.bannerName != null){
            
        }
         this.props.screenProps.saveTreadmill(this.state)
    }
    componentDidUpdate() {
        if(this.props.goToFinish){
            this.props.screenProps.getEventDetails()
            //Redirect to another screen
            this.props.navigation.navigate('FinishActivity',{})
        }
    }

    dismissKeyboardAction() {
        dismissKeyboard();
    }

    photoPressed(){
        let options = {
            title: 'Select Photo',
            storageOptions: {
                skipBackup: true,
            }
        }
        // Open Image Library:
        ImagePicker.showImagePicker(options, (response)  => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                let source = { uri: response.uri }
                this.setState({
                    bannerSource: source,
                    bannerName: response.fileName,
                    bannerData: response.data,
                });
            }

        });
    }

     _renderCameraIcon(){
        return(
            <View style = {styles.cameraWrapper} >
                <Image
                    source={require('../icons/ic_photo_camera_black_24dp_2x.png')}
                    style={styles.bannerIcon}
                />
            </View>
        )
    }

     _renderBannerImage(){
        return(
            <Image source={ this.state.bannerSource } style={styles.uploadBanner} />
        )
    }

    _renderPhoto() {
        return(
            <TouchableWithoutFeedback onPress={ () => this.photoPressed() }>

                {this.state.bannerSource.uri == '' ? this._renderCameraIcon() : this._renderBannerImage() }
            </TouchableWithoutFeedback>
        )
    }


    render(){

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <View style = {styles.container} >
                        <View style = {styles.formContainer}>
                            <TextField 
                                keyboardType = 'numeric'
                                onChangeText = {(text)=> this.onTextDistanceChanged(text)}
                                value = {this.state.distance}
                                label= { 'Distance ('  + unitText(this.props.unit) + ')' }
                                onSubmitEditing={ ()=> this.dismissKeyboardAction()}
                            /> 
                            <View style = {styles.timePickerWrapper}>
                                <View style = {styles.timeWrapper}>
                                    <TextInput 
                                        keyboardType = 'numeric'
                                        onChangeText = {(text)=> this.onTextHourChanged(text)}
                                        value = {this.state.hour}
                                        onSubmitEditing={ ()=> this.dismissKeyboardAction()}
                                        style = {styles.timePicker}
                                        placeholder= '0'
                                    />
                                    <Text style ={styles.timeTitle}>Hour</Text>
                                </View> 
                                <View style = {styles.timeWrapper}>
                                    <TextInput 
                                        keyboardType = 'numeric'
                                        onChangeText = {(text)=> this.onTextMinuteChanged(text)}
                                        value = {this.state.minute}
                                        onSubmitEditing={ ()=> this.dismissKeyboardAction()}
                                        style = {styles.timePicker}
                                        placeholder= '0'
                                    />
                                    <Text style ={styles.timeTitle}>Minute</Text>
                                </View> 
                                <View style = {styles.timeWrapper}>
                                    <TextInput 
                                        keyboardType = 'numeric'
                                        onChangeText = {(text)=> this.onTextSecondChanged(text)}
                                        value = {this.state.second}
                                        onSubmitEditing={ ()=> this.dismissKeyboardAction()}
                                        style = {styles.timePicker}
                                        placeholder= '0'
                                    />
                                    <Text style ={styles.timeTitle}>Second</Text>
                                </View>           
                            </View>
                            <View style = { styles.photoContainer }>
                                { this._renderPhoto() }
                            </View>
                        </View>
                        <View style = { styles.createContainer }>
                            <PrimaryButton states={{title: 'Save'  ,onPress: this.savePressed.bind(this)}} />
                        </View>
                        <Text>{this.props.goToFinish}</Text>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    eventList: {
        backgroundColor: 'white',
        flex: 1,
    },
    sDateText: {
        marginTop: 15,
    },
    eDateText: {
        marginTop: 15,
    },
    createContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom:20,
    },
    photoContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20,
        marginBottom:20,
        height: 150,
        backgroundColor: 'lightgrey',
    },
    formContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
    },
    uploadBanner: {
        flex: 1,
        height: 150,
    },
    bannerIcon: {
        tintColor: 'white',
    },
    cameraWrapper:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timePickerWrapper:{
        flex: 1,
        flexDirection: 'row',

    },
    timePicker:{
        flex: 1,
    },
    timeWrapper:{
        flex: 1,
                justifyContent: 'center',
        alignItems: 'center',
    },
    timeTitle:{
        justifyContent: 'center',
        alignItems: 'center',
    },
})

function mapStateToProps(state){
    return{
        goToFinish: state.runDetail.goToFinish,
        unit: state.user.unit
    }
}

export default connect(mapStateToProps)(Treadmill)