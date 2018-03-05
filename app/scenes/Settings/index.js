import React, { Component } from 'react'
import { View, StatusBar, StyleSheet, Text } from 'react-native'
import { IconButton } from '../../components/Button'

const Header = () => (
  <View style={styles.header}>
    <IconButton color="#3c4859" name='angle-left' size={32} to={'/'}/>
    <Text style={styles.headerTitle}>Settings</Text>
  </View>
)

export default class Settings extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content')
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fb',
    justifyContent: 'flex-start',
    paddingTop: '6%'
  },
  header: {
    flexDirection: 'row',
    height: '8%',
    justifyContent: 'space-between',
    marginVertical: 12,
    alignItems: 'center',
    paddingHorizontal: '7%'
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Nunito-Bold',
    textAlign: 'right',
    backgroundColor: '#fff0',
    color: '#3c4859',
  }
})