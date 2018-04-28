import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-fontawesome-pro';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24
  },
  type: {
    width: 106,
    height: 106,
    borderRadius: 8,
    backgroundColor: '#fff',
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
    color: '#3c4859'
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
      borderColor: '#1d9dff',
      borderStyle: 'solid',
      paddingBottom: 12
    }
    const options = [
      {type: 'yes', icon: 'check', color: '#21fa90'},
      {type: 'no', icon: 'times', color: '#de636f'}
    ]
    return (
      <View style={styles.container}>
        {options.map(({type, icon, color}, i) => (
          <TouchableOpacity
            key = {i}
            style={this.state.selected===type?highlighted:styles.type}
            onPress={() => {
              this.setState({selected: type})
              this.props.onSelect(type)
            }}
          >
          <Icon name={icon} size={44} color={color}/>
          <Text style={styles.typeText}>{type.toUpperCase()}</Text>
        </TouchableOpacity>
        ))}
      </View>
    )
  }
}