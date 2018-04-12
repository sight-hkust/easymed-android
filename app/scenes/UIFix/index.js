import React, { Component } from 'react'
import { View, TextInput, Stylesheet, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')
export default class UIFix extends Component {
    constructor(props) {
        super(props)
    }

    
    render() {
        return(
            <KeyboardAvoidingView  style={{
                flex: 1,
                justifyContent: 'flex-start',
              }} behavior={"position"}>
            {/* <HeaderContainer xOffset={this.state.xOffset} stepsLength={this.state.questions.length-1}/> */}
            <View style={{width, height: height/3, backgroundColor:'red'}}>
            </View>

            <View style={{width, height: height/3, backgroundColor:'green'}}>
            </View>

            <View style={{width, height: height/3, backgroundColor:'blue'}}>
            <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
        />
                <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
        />
            </View>
            </KeyboardAvoidingView>
        )
    }
}




