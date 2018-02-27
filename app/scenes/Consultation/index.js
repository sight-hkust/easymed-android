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

const Header = () => (
  <View style={styles.header}>
    <IconButton color="#3c4859" name='arrow-left' to={'/'} back/>
    <Text style={styles.headerText}>Consultation</Text>
  </View>
)

const Toolbar = () => (
  <View style={styles.toolbar}>
    <IconButton name="sort" color="#3c4859" />
    <IconButton name="search" color="#3c4859" size={22}/>
  </View>
)

const Tag = ({tag}) => (
  <View style={styles.tag}>
    <Text style={{fontFamily: 'Nunito-Bold', fontSize: 28, color: 'white'}}>{tag}</Text>
  </View>
)

const Patient = ({patient: {age, gender, name, tag}}) => (
  <View style={styles.patient}>
    <Tag tag={tag}/>
    <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-around', width: '60%', height: '70%'}}>
      <Text style={{fontFamily: 'Nunito-Bold', color: '#3c4859', fontSize: 16}}>{nameFormatter(name)}</Text>
      <View style={{flexDirection: 'row' ,justifyContent: 'space-between', width: '80%'}}>
        <Text style={{fontFamily: 'Nunito-Bold', color: '#828a95', fontSize: 14}}>AGE: {age}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#828a95', fontSize: 14}}>SEX: </Text>
          <Icon name={gender==='F'?'venus':'mars'} color={gender==='F'?'#ff5273':'#4c79fc'} size={18}/>
        </View>
      </View>
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

class Consultation extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <Toolbar />
        <ServiceQueue/>
      </View>
    )
  }
}

export default Consultation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f6fb',
    paddingHorizontal: 8,
    paddingTop: '6%'
  },
  header: {
    flexDirection: 'row',
    height: 56,
    justifyContent: 'space-between',
    marginBottom: 32,
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
    backgroundColor: '#6d73fd',
    elevation: 1,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#bcbffe'
  }
})