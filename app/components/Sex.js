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
  gender: {
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
  genderText: {
    fontSize: 18,
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
      paddingBottom: 12
    }
    const options = [
      {gender: 'Male', color: '#4c79fc', icon: 'mars'},
      {gender: 'Female', color:'#ff5273', icon: 'venus'}
    ]
    return (
      <View style={styles.container}>
        {options.map(({gender, color, icon}, i) => (
          <TouchableOpacity
            key = {i}
            style={this.state.selected===gender?highlighted:styles.gender}
            onPress={() => {
              this.setState({selected: gender})
              this.props.onSelect(gender)
            }}
          >
          <Icon name={icon} size={44} color={color}/>
          <Text style={styles.genderText}>{gender}</Text>
        </TouchableOpacity>
        ))}
      </View>
    )
  }
}