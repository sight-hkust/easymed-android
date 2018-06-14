import React, { Component } from 'react';
import { Dimensions, View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import Icon from 'react-native-fontawesome-pro';

const device = {
  height: Platform.select({android: Dimensions.get('window').height - StatusBar.currentHeight, ios: Dimensions.get('window').height}),
  width: Dimensions.get('window').width
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24
  },
  type: {
    width: device.height*.14,
    height: device.height*.14,
    borderRadius: 8,
    shadowColor: '#3a4252',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16
  },
  typeText: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#fff'
  }
})

export default class BooleanSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: ''
    }
  }

  render() {
    const highlighted = {
      ...StyleSheet.flatten(styles.type),
      borderBottomWidth: 4,
      borderColor: '#fff',
      borderStyle: 'solid',
      paddingBottom: 12
    }
    const options = [
      {type: 'yes', icon: 'check', color: '#06d6a0'},
      {type: 'no', icon: 'times', color: '#ef476f'}
    ]
    return (
      <View style={styles.container}>
        {options.map(({type, icon, color}, i) => (
          <TouchableOpacity
            key = {i}
            style={{
              ...StyleSheet.flatten(styles.type),
              backgroundColor: color
            }}
            onPress={() => {
              this.setState({selected: type})
              this.props.onSelect(type==='yes'?true:false)
            }}
          >
          <Icon name={icon} size={44} color="#fff"/>
          {
            this.state.selected === type &&
            <Text style={styles.typeText}>{type.toUpperCase()}</Text>
          }
        </TouchableOpacity>
        ))}
      </View>
    )
  }
}