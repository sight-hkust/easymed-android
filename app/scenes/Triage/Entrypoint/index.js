import React, { Component } from 'react';
import { View, Image, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../../components/Header'

const createGradient = {
  colors: ['#ffe6ad','#fba05e'],
  start: {x: 0.0, y: 0.2},
  end: {x: 0.0, y: 1.0},
  locations: [0, 2.4]
};

const loadGradient = {
  colors: ['#EED8F6','#a866ee'],
  start: {x: 0.0, y: 0.3},
  end: {x: 1.0, y: 1.5},
  locations: [0, 1.1]
};

const CreatePatientProfile = ({navigate}) => (
  <TouchableOpacity style={styles.card} onPress={() => {navigate('Profile')}}>
    <LinearGradient {...createGradient} style={styles.create}>
      <Image style={styles.primaryButtonImage} source={require('../../../../assets/images/triage/create_profiles.png')} />
      <Text style={styles.primaryButtonText}>CREATE PATIENT PROFILE</Text>
    </LinearGradient>
  </TouchableOpacity>
)

const LoadPatientProfile = ({navigate}) => (
  <TouchableOpacity style={styles.card} onPress={() => {navigate('Admission')}}>
    <LinearGradient {...loadGradient} style={styles.load}>
      <Image style={styles.secondaryButtonImage} source={require('../../../../assets/images/triage/archives.png')} />
      <Text style={styles.secondaryButtonText}>CHOOSE EXISTING PATIENT</Text>
    </LinearGradient>
  </TouchableOpacity>
)

export default class Entrypoint extends Component {
  constructor(props) {
    super(props)
    this.navigate = this.props.navigation.navigate.bind(this)
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content', true)
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Triage" />
        <CreatePatientProfile navigate={this.navigate}/>
        <LoadPatientProfile navigate={this.navigate}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fb',
    paddingTop: '6%',
    justifyContent: 'flex-start',
  },

  card: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '85%',
    height: '30%',
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    backgroundColor: 'transparent'
  },

  create: {
    flexDirection: 'column',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginBottom: 8
  },

  primaryButtonImage: {
    width: 132,
    height: 132
  },

  primaryButtonText: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 18,
    color: '#3c4859'
  },

  secondaryButtonImage: {
    width: 100,
    height: 100
  },

  secondaryButtonText: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 18,
    color: '#3c4859',
    marginTop: 12
  },

  load: {
    flexDirection: 'column',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderRadius: 6,
    marginTop: 8,
  }
})