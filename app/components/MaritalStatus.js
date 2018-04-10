import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  maritalStatus: {
    height: 52,
    width: '80%',
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#3a4252',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  maritalStatusText: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#3c4859',
    marginLeft: 12
  }
})

export default class MaritalStatus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: ''
    }
  }

  render() {
    const highlighted = {
      ...StyleSheet.flatten(styles.maritalStatus),
      borderLeftWidth: 4,
      borderColor: '#1d9dff',
      borderStyle: 'solid',
      paddingRight: 4
    }
    const options = ['single', 'married', 'divorced']
    return (
      <View style={{justifyContent: 'space-between', alignItems: 'center', height: '100%'}}>
        {options.map((status, i) => (
          <TouchableOpacity
            key = {i}
            style={this.state.selected===status?highlighted:styles.maritalStatus}
            onPress={() => {
              this.setState({selected: status})
              this.props.onSelect(status)
            }}
          >
            <Text style={styles.maritalStatusText}>{status.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}