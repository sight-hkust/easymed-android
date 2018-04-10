import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-fontawesome-pro';

const styles = StyleSheet.create({
  type: {
    width: 112,
    height: 112,
    borderRadius: 5,
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
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#3c4859'
  }
})

export default class InfantSelect extends Component {
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
      paddingTop: 20
    }
    const options = [
      {type: 'Infant', icon: 'child'},
      {type: 'Adult', icon: 'male'}
    ]
    return (
      <View style={{width: '70%', flexDirection: 'row', justifyContent: 'space-around'}}>
        {options.map(({type, icon}, i) => (
          <TouchableOpacity
            key = {i}
            style={this.state.selected===type?highlighted:styles.type}
            onPress={() => {
              this.setState({selected: type})
              this.props.onSelect(type)
            }}
          >
          <Icon name={icon} size={44} color="#3c4859"/>
          <Text style={styles.typeText}>{type}</Text>
        </TouchableOpacity>
        ))}
      </View>
    )
  }
}