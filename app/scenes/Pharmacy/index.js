import React, { Component } from 'react';
import { View, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IconButton } from '../../components/Button'
import Icon from '../../components/Icon'
import Header from '../../components/Header'
import { PatientListItem as Patient } from '../../components/Patient'

const nameFormatter = (name) => {
  return name.split(' ').map((part, i) => { if(i == 0) { return part } else if (i == 1) { return part.substring(0,1) } else return ''}).join(' ').toUpperCase()
}

const demoPatient1 = {
  gender: 'F',
  name: 'Preah Reachanachâk Kampuchea',
  age: '34',
  tag: 18
}

const demoPatient2 = {
  gender: 'M',
  name: 'Sanskrit Kambujadeśa',
  age: '26',
  tag: 24
}

const Toolbar = () => (
  <View style={styles.toolbar}>
    <IconButton name="medkit" color="#3c4859" />
    <IconButton name="clipboard-list" color="#3c4859"/>
    <IconButton name="bell" color="#3c4859" />
  </View>
)

const Tag = ({tag}) => (
  <View style={styles.tag}>
    <Text style={{fontFamily: 'Nunito-Bold', fontSize: 28, color: 'white'}}>{tag}</Text>
  </View>
)

const EmptyStub = () => (
  <View style={{justifyContent: 'space-around', alignItems: 'center', width: '80%', alignSelf: 'center'}}>
    <Image style={{width: 160, height: 160}} source={require('../../../assets/images/empty/consultation.png')}/>
    <View>
      <Text style={{fontFamily: 'Quicksand-Bold',fontSize: 20, textAlign: 'center', marginBottom: 12}}>{'no patients found'.toUpperCase()}</Text>
      <Text style={{fontFamily: 'Nunito-Medium', textAlign: 'center', color:'#848c9f'}}>There are currently no patient waiting in line, add a patient to this queue to get started.</Text>
    </View>
  </View>
)

const ServiceQueue = () => {
  return (
    <ScrollView>
      {/* <EmptyStub /> */}
      <Patient patient={demoPatient1} to="/" />
      <Patient patient={demoPatient2} to="/" />
      <Patient patient={demoPatient1} to="/" />
      <Patient patient={demoPatient2} to="/" />
      <Patient patient={demoPatient2} to="/" />
    </ScrollView>
  )
}

class Pharmacy extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Pharmacy" />
        <Toolbar />
        <ServiceQueue/>
      </View>
    )
  }
}

export default Pharmacy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f6fb',
    paddingTop: '6%'
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '40%',
    height: 56,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 20
  },
  queue: {
    alignItems: 'center'
  }
})