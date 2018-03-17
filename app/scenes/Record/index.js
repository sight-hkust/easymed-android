import React, { Component } from 'react'
import { View, Text, StatusBar, StyleSheet } from 'react-native'
import { PatientProfile as Patient } from '../../components/Patient'

class Record extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content', true)
  }

  render() {
    return (
      <View style={styles.container}>
        <Patient/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: '6%',
    backgroundColor: '#f5f6fb'
  }
})