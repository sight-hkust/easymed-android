import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-fontawesome-pro';

const styles = StyleSheet.create({
  gender: {
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
  genderText: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#3c4859'
  }
})

export default class Sex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: ''
    }
  }

  render() {
    const highlighted = {
      ...StyleSheet.flatten(styles.gender),
      borderBottomWidth: 4,
      borderColor: '#1d9dff',
      borderStyle: 'solid',
      paddingTop: 20
    }
    return (
      <View style={{width: '70%', flexDirection: 'row', justifyContent: 'space-around'}}>
        <TouchableOpacity
          style={this.state.selected==='female'?highlighted:styles.gender}
          onPress={() => {
            this.setState({selected: 'female'})
            this.props.onSelect('female')
          }}
        >
          <Icon name="venus" size={44} color="#ff5273"/>
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={this.state.selected==='male'?highlighted:styles.gender}
          onPress={() => {
            this.setState({selected: 'male'})
            this.props.onSelect('male')
          }}
        >
          <Icon name="mars" size={44} color="#4c79fc"/>
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>
      </View>
    )
  }
}