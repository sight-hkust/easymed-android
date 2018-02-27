import React, { Component } from 'react';
import { View, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IconButton } from '../../components/Button'
import Icon from '../../components/Icon'

class Triage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
      </View>
    )
  }
}

export default Triage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f6fb',
    paddingHorizontal: 8,
    paddingTop: '12%'
  }
})