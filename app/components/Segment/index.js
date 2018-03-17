import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, ScrollView, Dimensions } from 'react-native'
import TextField from '../TextField'

const screenWidth = Dimensions.get('window').width

const DOBView = () => (
  <View style={styles.response}>
    <TextField placeholder="Year" width="92%" keyboardType="numeric"/>
    <TextField placeholder="Month" width="92%" keyboardType="numeric"/>
    <TextField placeholder="Day" width="92%" keyboardType="numeric"/>
  </View>
)

const AgeView = () => (
  <View style={{...StyleSheet.flatten(styles.response), height: '80%'}}>
    <TextField placeholder="Age" width="92%" keyboardType="numeric"/>
  </View>
)

class Segment extends Component {
  constructor(props) {
    super(props)
    this.state = { leftButtonPressed: true, rightButtonPressed: false }
  }

  leftOnPress = () => {
    this.setState({
      leftButtonPressed: true,
      rightButtonPressed: false,
    })
    this.refs.scrollView.scrollTo({y:0, x:0, animated:'true'})
  }

  RightOnPress = () => {
    this.setState({
      leftButtonPressed: false,
      rightButtonPressed: true
    })
    this.refs.scrollView.scrollTo({y:0, x:screenWidth, animated:'true'})
  }

 render() {
   return (
    <View style={{height: '56%', paddingHorizontal:'8%', paddingTop:'4%'}}>

      <View style={styles.segmentContainer}>
        <View style={styles.segmentBorder}>
          <TouchableOpacity
            activeOpacity={0}
            style={this.state.leftButtonPressed? styles.leftButtonPressed:styles.leftButtonReleased}
            onPress={this.leftOnPress}
          >
            <Text style={this.state.leftButtonPressed? styles.textPressed:styles.textReleased}>DOB</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0}
            style={this.state.rightButtonPressed? styles.rightButtonPressed:styles.rightButtonReleased}
            onPress={this.RightOnPress}
          >
            <Text style={this.state.rightButtonPressed? styles.textPressed:styles.textReleased}>AGE</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        ref = "scrollView"
        horizontal = {true} 
        pagingEnabled = {true}
        scrollEnabled = {false}
        style = {{height: 800}}
      >
        <View style={{width: screenWidth, height:'80%'}}>
          <DOBView/>
        </View>

        <View style={{width: screenWidth, height:'80%'}}>
          <AgeView/>
        </View>

        </ScrollView>

    </View>
    )
  }
}

export default Segment

const styles = StyleSheet.create({
  segmentContainer:{
    height: 28,
    width: '100%',
  },
  segmentBorder: {
    height: 28,
    flexDirection: 'row',
    borderRadius: 14,
    borderColor: '#6E9CFA',
    borderWidth: 2,
    width: 324,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  leftButtonPressed: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 24,
    backgroundColor: '#6E9CFA',
    borderStyle: 'solid',
    borderColor: '#6E9CFA',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderRightWidth: 1,
  },
  leftButtonReleased: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 24,
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderColor: '#6E9CFA',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderRightWidth: 1,
  },
  rightButtonPressed: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 24,
    backgroundColor: '#6E9CFA',
    borderStyle: 'solid',
    borderColor: '#6E9CFA',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderLeftWidth: 1,
  },
  rightButtonReleased: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 24,
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderColor: '#6E9CFA',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderLeftWidth: 1,
  },
  textPressed: {
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
    color: '#fff'
  },
  textReleased: {
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
    color: '#6E9CFA'
  },
  response: {
    paddingVertical: '4%',
    width: '84%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
})