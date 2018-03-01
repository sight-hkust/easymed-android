import React, { Component } from 'react';
import { View, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IconButton } from '../../components/Button'
import Icon from '../../components/Icon'

const Header = () => (
  <View style={styles.header}>
    <IconButton color="#3c4859" name='arrow-left' to={'/'} back/>
    <Text style={styles.headerText}>Triage</Text>
  </View>
)

const CreatePatientProfile = () => (
  <View style={styles.create}>
    <Image style={styles.primaryButtonImage} source={require('../../../assets/images/triage/create_profiles.png')} />
    <Text style={styles.primaryButtonText}>CREATE PATIENT PROFILE</Text>
  </View>
)

const LoadPatientProfile = () => (
  <View style={styles.load}>
    <Image style={styles.secondaryButtonImage} source={require('../../../assets/images/triage/archives.png')} />
    <Text style={styles.secondaryButtonText}>CHOOSE EXISTING PATIENT</Text>
  </View>
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
  create: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    width: '85%',
    height: '30%',
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    backgroundColor: '#fff',
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
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    width: '85%',
    height: '30%',
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 5,
    backgroundColor: '#fff',
    marginTop: 8
  }
})