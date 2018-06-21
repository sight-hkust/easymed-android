import React, { Component } from 'react'
import { Dimensions, ScrollView, Text, TouchableOpacity } from 'react-native'

const device = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width
}
export default class HorizontalListPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: ''
    }
  }

  render() {
    const outlineButtonBaseStyle = {
      borderRadius: device.height*.025, 
      borderWidth: 2, 
      borderColor: '#5F70A2', 
      marginHorizontal: 6, 
      justifyContent: 'center', 
      alignItems: 'center', 
      width: device.width*.2, 
      height: device.height*.05
    }
    const selectedButtonStyle = {
      ...outlineButtonBaseStyle,
      backgroundColor: '#5F70A2',
    }
    const textStyle = {
      fontFamily: 'Nunito-Regular',
      fontSize: 14
    }
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center', height: 56}}
      >
        {
          this.props.items.map((item, i) =>
          <TouchableOpacity 
            key={i} 
            style={this.state.selected === item?{...selectedButtonStyle}:{...outlineButtonBaseStyle}}
            onPress={() => {
              this.props.onSelect(item)
              this.setState({selected: item})
            }}
          >
            <Text style={{...textStyle, color: this.state.selected===item?'#fff':'#5F70A2'}}>{item}</Text>
          </TouchableOpacity>)
        }
      </ScrollView>
    )
  }
}