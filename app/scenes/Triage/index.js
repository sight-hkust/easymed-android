import React, { Component } from 'react';
import { View, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IconButton } from '../../components/Button'
import Icon from '../../components/Icon'
import LinearGradient from 'react-native-linear-gradient';
import { Redirect, Link } from 'react-router-native';

const Header = () => (
  <View style={styles.header}>
    <IconButton color="#3c4859" name='arrow-left' to={'/'} back/>
    <Text style={styles.headerText}>Triage</Text>
  </View>
)

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

const CreatePatientProfile = () => (
  <Link style={styles.card} to='/profile' component={TouchableOpacity} activeOpacity={0.25}>
    <LinearGradient {...createGradient} style={styles.create}>
      <Image style={styles.primaryButtonImage} source={require('../../../assets/images/triage/create_profiles.png')} />
      <Text style={styles.primaryButtonText}>CREATE PATIENT PROFILE</Text>
    </LinearGradient>
  </Link>
)

const LoadPatientProfile = () => (
  <Link style={styles.card} to='/vitals' component={TouchableOpacity} activeOpacity={0.25}>
    <LinearGradient {...loadGradient} style={styles.load}>
      <Image style={styles.secondaryButtonImage} source={require('../../../assets/images/triage/archives.png')} />
      <Text style={styles.secondaryButtonText}>CHOOSE EXISTING PATIENT</Text>
    </LinearGradient>
  </Link>
)

class Triage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <CreatePatientProfile />
        <LoadPatientProfile />
      </View>
    )
  }
}

export default Triage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fb',
    paddingHorizontal: 8,
    paddingTop: '12%',
    justifyContent: 'flex-start',
  },

  header: {
    flexDirection: 'row',
    height: 56,
    justifyContent: 'space-between',
    marginBottom: 48,
    alignItems: 'center'
  },

  headerText: {
    fontSize: 36,
    fontFamily: 'Nunito-Bold',
    textAlign: 'right',
    backgroundColor: '#fff0',
    color: '#3c4859',
    marginRight: 20,
    marginTop: 32,
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