import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-fontawesome-pro';
import { IconButton } from '../Button'

const Tag = ({tag}) => (
  <View style={styles.tag}>
    <Text style={styles.tagNumberText}>{tag}</Text>
  </View>
)

class PatientQueueItem extends Component {
  constructor(props) {
    super(props)
    this.viewActions = this.viewActions.bind(this)
  }

  viewActions() {
    this.props.navigation.push('Menu', {queueId: this.props.queueId})
  }

  render() {
    const {tag, name, age, sex} = this.props.patient
    return (
      <TouchableOpacity onPress={this.viewActions} style={styles.patient}>
        <Tag tag={tag}/>
        <View style={styles.patientInfoContainer}>
          <Text style={styles.patientName}>{name}</Text>
          <View style={styles.patientPhysicalRemarks}>
            <Text style={styles.patientPhysicalAttributeText}>AGE: {age<1?'<1':age}</Text>
            <View style={styles.patientGender}>
              <Text style={styles.patientPhysicalAttributeText}>SEX: </Text>
              <Icon name={sex==='Female'?'venus':'mars'} color={sex==='Female'?'#ff5273':'#4c79fc'} size={18}/>
            </View>
          </View>
        </View>
        <IconButton name="chevron-circle-right" type="solid" color="#3c4859" size={24}/>
      </TouchableOpacity>
    )
  }
}

export const PatientListItem = ({patient: {age, sex, name}, onPress}) => {
  const gender = {
    height: 56,
    width: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: sex==='Female'?'#ff5273':'#4c79fc',
    elevation: 1,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: sex==='Female'?'#ff718c':'#7c9dfc'
  }

  return (
    <TouchableOpacity style={styles.patient} onPress={onPress}>
      <View style={gender}>
        <Icon name={sex==='Female'?'venus':'mars'} color="white" size={24}/>
      </View>
      <View style={styles.patientInfoContainer}>
        <Text style={styles.patientName}>test</Text>
        <View style={styles.patientPhysicalRemarks}>
          <Text style={styles.patientPhysicalAttributeText}>AGE: {age<1?'<1':age}</Text>
        </View>
      </View>
      <IconButton name="chevron-circle-right" type="solid" color="#3c4859" size={24}/>
    </TouchableOpacity>
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
    fontSize: 15
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
    fontSize: 26,
    color: 'white'
  }
})

export default withNavigation(PatientQueueItem)