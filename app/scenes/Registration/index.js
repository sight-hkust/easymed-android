import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IconButton } from '../../components/Button';

const gradientLayout = {
  colors: ['#696feb','#662cd2'],
  start: {x: 0.1, y: 0.1},
  end: {x: 1.0, y: 1.0},
  locations: [0.3, 1]
}

const Header = () => (
  <View style={styles.header}>
    <IconButton name='arrow-left' to={'/login'} back/>
    <Text style={styles.headerText}>Registration</Text>
  </View>
)

class Registration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <LinearGradient {...gradientLayout} style={styles.container}>
        <StatusBar barStyle='light-content'/>
        <Header/>
      </LinearGradient>
    )
  }
}

export default Registration

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  header: {
    flexDirection: 'row',
    height: 94,
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center'
  },

  headerText: {
    fontSize: 36,
    fontFamily: 'Nunito-Bold',
    textAlign: 'right',
    backgroundColor: '#fff0',
    color: '#FFF',
    marginRight: 20,
    marginTop: 32,
  }
})