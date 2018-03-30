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
    return (
      <View style={{justifyContent: 'space-between', alignItems: 'center', height: '100%'}}>
        <TouchableOpacity
          style={this.state.selected==='married'?highlighted:styles.maritalStatus}
          onPress={() => {
            this.setState({selected: 'married'})
            this.props.onSelect('married')
          }}
        >
          <Text style={styles.maritalStatusText}>MARRIED</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={this.state.selected==='divorced'?highlighted:styles.maritalStatus}
          onPress={() => {
            this.setState({selected: 'divorced'})
            this.props.onSelect('divorced')
          }}
        >
          <Text style={styles.maritalStatusText}>DIVORCED</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={this.state.selected==='widowed'?highlighted:styles.maritalStatus}
          onPress={() => {
            this.setState({selected: 'widowed'})
            this.props.onSelect('widowed')
          }}
        >
          <Text style={styles.maritalStatusText}>WIDOWED</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={this.state.selected==='single'?highlighted:styles.maritalStatus}
          onPress={() => {
            this.setState({selected: 'single'})
            this.props.onSelect('single')
          }}
        >
          <Text style={styles.maritalStatusText}>SINGLE</Text>
        </TouchableOpacity>
      </View>
    )
  }
}