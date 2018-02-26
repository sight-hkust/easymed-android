import React, { Component } from 'react';
import { View, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IconButton } from '../../components/Button'
import Icon from '../../components/Icon'

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
    <IconButton name="sort" color="#3c4859" />
    <IconButton name="search" color="#3c4859" size={22}/>
    <IconButton name="user-plus" color="#3c4859" />
  </View>
)

const Tag = ({tag}) => {
  const style = { backgroundColor: '#6D73FD', ...StyleSheet.flatten(styles.tag)};

  return (
    <View style={style}>
      <Text style={{fontFamily: 'Nunito-Bold', fontSize: 28, color: 'white'}}>{tag}</Text>
    </View>
  )
}

const Patient = ({patient: {age, gender, name, tag}}) => (
  <View style={styles.patient}>
    <Tag tag={tag}/>
    <View style={{flexDirection: 'column', alignItems: 'flex-start', width: '55%'}}>
      <Text style={{fontFamily: 'Nunito-Bold', color: '#3c4859', fontSize: 16}}>{nameFormatter(name)}</Text>
      <Text style={{fontFamily: 'Nunito-Bold', color: '#828a95', fontSize: 13}}>AGE: {age} SEX: {gender}</Text>
    </View>
    <IconButton name="stethoscope" color="#3c4859" size={24}/>
  </View>
)

const ServiceQueue = () => {
  return (
    <ScrollView>
      <Patient patient={demoPatient1}/>
      <Patient patient={demoPatient2}/>
      <Patient patient={demoPatient1}/>
      <Patient patient={demoPatient2}/>
      <Patient patient={demoPatient2}/>
    </ScrollView>
  )
}

class Triage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar />
        <ServiceQueue/>
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
  patient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    width: '85%',
    height: 72,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 6,
    alignSelf: 'center'
  },
  tag: {
    height: 56,
    width: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#eee'
  }
})