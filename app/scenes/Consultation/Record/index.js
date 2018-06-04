import React, { Component } from 'react'
import { Dimensions ,Image, View, Text, StatusBar, StyleSheet, ScrollView } from 'react-native'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMedicalRecords } from '../../../actions/record';
import Icon from 'react-native-fontawesome-pro';
import Header from '../../../components/Header';
import { IconButton, Button } from '../../../components/Button';

const Appearance = ({sex}) => {
  const style = {
    borderColor: '#fff',
    shadowColor: '#f5f5f5',
    ...StyleSheet.flatten(styles.appearance)
  }
  return (
    <View style={style}>
      <Image 
        source={require('../../../../assets/images/test.jpg')}
        style={{resizeMode: 'cover', height:72, width:72, borderRadius:36}}
      />
    </View>
  )
}

const PatientName = ({name}) => {
  const style = {
    name: {
      marginVertical: 12,
      justifyContent: 'center'
    },
    nameText: {
      fontFamily: 'Nunito-Bold',
      color: '#3c4859',
      fontSize: 20,
      textAlign: 'center'
    }
  }

  return (
    <View style={style.name}>
      <Text style={style.nameText}>{name.toUpperCase()}</Text>
    </View>
  )
}

const vitalsDemo = [
  { 
    icon: require('../../../../assets/images/vitals/pulse.png'),
    unit: 'bpm',
    value: '65'
  },
  {
    icon: require('../../../../assets/images/vitals/pressure.png'),
    unit: '',
    value: '67/120'
  },
  {
    icon: require('../../../../assets/images/vitals/spo2.png'),
    unit: '%',
    value: '98'
  },
  {
    icon: require('../../../../assets/images/vitals/temperature.png'),
    unit: '°C',
    value: '34'
  },
  {
    icon: require('../../../../assets/images/vitals/height.png'),
    unit: 'cm',
    value: '163'
  },
  {
    icon: require('../../../../assets/images/vitals/weight.png'),
    unit: 'kg',
    value: '76'
  }
]

const Vitals = ({vitals}) => (
  <View style={styles.vitals}>
    {vitalsDemo.map(({icon, unit, value}, i) => (
      <View key={i} style={{width: 64, height: 64, marginVertical: 12, flexGrow: 1,width: '30%', alignItems: 'center', justifyContent: 'space-around'}}>
        <Image style={{width: 40, height: 40}} source={icon} />
        <Text style={{fontFamily: 'Nunito-Bold', color: '#3c4859'}}>{value} {unit.toUpperCase()}</Text>
      </View>
    ))}
  </View>
)

class Record extends Component {
  constructor(props) {
    super(props)
    this.fetchMedicalRecords = this.props.actions.fetchMedicalRecords.bind(this)
  }
  componentWillMount() {
    this.fetchMedicalRecords(this.props.patientId)
    StatusBar.setBarStyle('dark-content', true)
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Appearance tag="31" picture=""/>
          <PatientName name="Preah R"/>
          <Vitals/>
        </ScrollView>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({fetchMedicalRecords}, dispatch)
})

const mapStateToProps = (state, props) => ({
  record: state.records.patients[props.patientId]
})

export default connect(mapStateToProps, mapDispatchToProps)(Record)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fb',
  },
  appearance: {
    height: 80,
    width: 80,
    borderRadius: 48,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    elevation: 2,
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 4 },
    shadowRadius: 9,
    borderWidth: 4,
    borderStyle: 'solid',
  },
  vitals: {
    height: 200,
    width: 336,
    borderRadius: 6,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 8,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.7,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 8,
    flexWrap: 'wrap',
    flexDirection: 'row'
  }
})