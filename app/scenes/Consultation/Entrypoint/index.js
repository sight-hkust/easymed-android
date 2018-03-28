import React, { Component } from 'react';
import { View, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IconButton } from '../../../components/Button'
import Icon from 'react-native-fontawesome-pro';
import Header from '../../../components/Header'
import { PatientListItem as Patient } from '../../../components/Patient'

const demoPatient1 = {
  sex: 'female',
  name: {
    regular: 'Preah Reachanachâk Kampuchea'
  },
  age: '34',
  tag: 18,
  id: 1234
}

const demoPatient2 = {
  sex: 'male',
  name: {
    regular: 'Sanskrit Kambujadeśa'
  },
  age: '26',
  tag: 24,
  id: 1234
}

const Toolbar = () => (
  <View style={styles.toolbar}>
    <IconButton name="sort" color="#3c4859" />
    <IconButton name="search" color="#3c4859" size={22}/>
  </View>
)

const EmptyStub = () => (
  <View style={{justifyContent: 'space-around', alignItems: 'center', width: '80%', alignSelf: 'center'}}>
    <Image style={{width: 160, height: 160}} source={require('../../../../assets/images/empty/consultation.png')}/>
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
      <Patient patient={demoPatient1} to={`/consultation/patients/${demoPatient1.id}`} />
      <Patient patient={demoPatient2} tto={`/consultation/patients/${demoPatient2.id}`} />
      <Patient patient={demoPatient1} to={`/consultation/patients/${demoPatient1.id}`} />
      <Patient patient={demoPatient2} to={`/consultation/patients/${demoPatient2.id}`} />
      <Patient patient={demoPatient2} to={`/consultation/patients/${demoPatient2.id}`} />
    </ScrollView>
  )
}

export default class Entrypoint extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content', true)
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Consultation" />
        <Toolbar />
        <ServiceQueue/>
      </View>
    )
  }
}


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
    alignSelf: 'flex-end'
  },
  queue: {
    alignItems: 'center'
  },
})