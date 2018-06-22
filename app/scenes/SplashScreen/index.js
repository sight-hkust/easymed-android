import React, { Component } from 'react';
import { Image, Text, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { isSessionValid } from '../../services/api';

const gradientLayout = {
  colors: ['#fdfbfb','#ebedee'],
  start: {x: 0.1, y: 0.1},
  end: {x: 1.0, y: 1.0},
  locations: [0.3, 1]
};

export default class SplashScreen extends Component {
  constructor(props) {
    super(props)
    this.validateSession()
  }

  async validateSession() {
    const isValid = await isSessionValid()
    console.log(isValid)
    this.props.navigation.navigate(isValid?'App':'Auth')
  }

  render() {
    return (
      <LinearGradient {...gradientLayout} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('../../../assets/images/logo.png')} style={{width: 200, height: 200}}/>
        <Text style={{
          color: '#9196F0',
          backgroundColor: 'transparent',
          alignSelf: 'center',
          alignItems: 'center',
          fontSize: 28,
          fontFamily: 'Nunito-Bold',
          marginVertical: 24}}>
          M E D E A S Y
        </Text>
        <ActivityIndicator />
      </LinearGradient>
    )
  }
}