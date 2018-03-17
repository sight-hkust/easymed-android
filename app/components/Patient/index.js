import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Link } from 'react-router-native'
import Icon from '../Icon'
import { IconButton } from '../Button'

const Tag = ({tag}) => (
  <View style={styles.tag}>
    <Text style={styles.tagNumberText}>{tag}</Text>
  </View>
)

const nameFormatter = (name) => {
  return name.split(' ').map((part, i) => { if(i == 0) { return part } else if (i == 1) { return part.substring(0,1) } else return ''}).join(' ').toUpperCase()
}

const PatientListItem = ({patient: {age, gender, name, tag}, to}) => (
  <Link component={TouchableOpacity} to={to} style={styles.patient} activeOpacity={0.4}>
    <Tag tag={tag}/>
    <View style={styles.patientInfoContainer}>
      <Text style={styles.patientName}>{nameFormatter(name)}</Text>
      <View style={styles.patientPhysicalRemarks}>
        <Text style={styles.patientPhysicalAttributeText}>AGE: {age}</Text>
        <View style={styles.patientGender}>
          <Text style={styles.patientPhysicalAttributeText}>SEX: </Text>
          <Icon name={gender==='F'?'venus':'mars'} color={gender==='F'?'#ff5273':'#4c79fc'} size={18}/>
        </View>
      </View>
    </View>
    <IconButton name="chevron-circle-right" color="#3c4859" size={24}/>
  </Link>
)

const PatientProfile = ({patient: {age, gender, name}}) => {
  const style = {

  }
  return (
    <View>
      
    </View>
  )
}

const styles = StyleSheet.create({
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
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 5,
    alignSelf: 'center'
  },
  patientInfoContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    width: '60%',
    height: '70%'
  },
  patientName: {
    fontFamily: 'Nunito-Bold',
    color: '#3c4859',
    fontSize: 16
  },
  patientPhysicalRemarks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%'
  },
  patientPhysicalAttributeText: {
    fontFamily: 'Nunito-Bold',
    color: '#828a95',
    fontSize: 14
  },
  patientGender: {
    flexDirection: 'row',
    alignItems: 'center'
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
  },
  tagNumberText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 28,
    color: 'white'
  }
})

export { PatientListItem }