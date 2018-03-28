import React, { Component }from 'react'
import { Keyboard, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Link } from 'react-router-native';
import Icon from 'react-native-fontawesome-pro';

export default class BooleanSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: ''
    }
  }

  render() {
    const highlighted = {
      ...StyleSheet.flatten(styles.default),
      borderRightWidth: 6,
      borderStyle: 'solid',
      borderColor: '#1d9dff'
    }
    return (
      <View style={{...StyleSheet.flatten(styles.response), height: '28%'}}>
        <TouchableOpacity style={this.state.selected==='yes'?highlighted:styles.default} onPress={() => {
          this.setState({selected: 'yes'})
          this.props.onSelect('yes')
        }}>
          <View style={{width:72, height:56, backgroundColor:'#7BD2A8', alignItems:'flex-start', justifyContent:'center', paddingLeft:12, borderTopLeftRadius:5, borderBottomLeftRadius:5, marginRight:24 }}>
            <Icon name="check" color='#fff' size={40}/>
          </View>
          <Text style={{fontFamily: 'Nunito-Bold', color:'#3c4859', fontSize:24 }}>{'yes'.toUpperCase()}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={this.state.selected==='no'?highlighted:styles.default} onPress={() => {
          this.setState({selected: 'no'})
          this.props.onSelect('no')
        }}>
          <View style={{width:72, height:56, backgroundColor:'#EF8585', alignItems:'flex-start', justifyContent:'center', paddingLeft:12, borderTopLeftRadius:5, borderBottomLeftRadius:5, marginRight:24 }}>
            <Icon name="times" color='#fff' size={40}/>
          </View>
          <Text style={{fontFamily: 'Nunito-Bold', color:'#3c4859', fontSize:24 }}>{'no'.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  default: {
    alignSelf: 'center',
    flexDirection: 'row',
    elevation: 1,
    shadowRadius: 20,
    height: 56,
    width: '80%',
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#3a4252',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  response: {
    marginTop: 16,
    height: '28%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: '8%'
  }
}