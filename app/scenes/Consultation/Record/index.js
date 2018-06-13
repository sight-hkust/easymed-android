import React, { Component } from 'react'
import { Dimensions ,Image, View, Text, StatusBar, StyleSheet, ScrollView } from 'react-native'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMedicalRecords } from '../../../actions/record';
import Icon from 'react-native-fontawesome-pro';

const device = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width
}

const Appearance = ({picture}) => {
  const style = {
    borderColor: '#fff',
    shadowColor: '#f5f5f5',
    ...StyleSheet.flatten(styles.appearance)
  }
  return (
    <View style={style}>
      <Image 
        source={picture}
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

const PreviousMedicalHistory = ({diseases}) => (
  <View style={styles.medicalHistory}>
    <View style={{backgroundColor: '#FFCC00', borderTopLeftRadius: 6, borderTopRightRadius: 6, height: device.height*.06, justifyContent: 'center'}}>
      <Text style={{marginLeft: 12, color: '#fff', fontFamily: 'Nunito-Bold', fontSize: 18}}>
      Previous Medical History
      </Text>
    </View>
    <View style={{justifyContent: 'space-around'}}>
      {Object.keys(diseases).map(name =>
        <View key={name} style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
          <Text style={{fontFamily: 'Nunito-Bold', fontSize:16, color: '#3c4859'}}>{name}</Text>
          <Icon name={diseases[name]==='yes'?'check':'times'} size={22} color="#3c4859"/>
        </View>
      )}
    </View>
  </View>
)

const ChiefComplaints = ({cc}) => (
  <View style={styles.chiefComplaints}>
    <View style={{backgroundColor: '#EA526F', borderTopLeftRadius: 6, borderTopRightRadius: 6, height: device.height*.06, justifyContent: 'center'}}>
      <Text style={{marginLeft: 12, color: '#fff', fontFamily: 'Nunito-Bold', fontSize: 18}}>
      Chief Complaints
      </Text>
    </View>
    <View style={{justifyContent: 'space-around'}}>
      <Text style={{fontFamily: 'Nunito-Bold', fontSize:16, color: '#3c4859', paddingHorizontal: 8, paddingVertical: 4}}>{cc}</Text>
    </View>
  </View>
)

const Screening = ({screeningResult}) => (
  <View style={styles.screening}>
    <View style={{backgroundColor: '#23B5D3', borderTopLeftRadius: 6, borderTopRightRadius: 6, height: device.height*.06, justifyContent: 'center'}}>
      <Text style={{marginLeft: 12, color: '#fff', fontFamily: 'Nunito-Bold', fontSize: 18}}>
      Screening
      </Text>
    </View>
    <View style={{justifyContent: 'space-around'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
        <Text style={{fontFamily: 'Nunito-Bold', fontSize:16, color: '#3c4859'}}>Alchohol Use</Text>
        <Icon name={screeningResult.alchoholUse==='yes'?'check':'times'} size={22} color="#3c4859"/>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
        <Text style={{fontFamily: 'Nunito-Bold', fontSize:16, color: '#3c4859'}}>Drug Use</Text>
        <Icon name={screeningResult.drugUse==='yes'?'check':'times'} size={22} color="#3c4859"/>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
        <Text style={{fontFamily: 'Nunito-Bold', fontSize:16, color: '#3c4859'}}>Tobacco Use</Text>
        <Icon name={screeningResult.tobaccoUse==='yes'?'check':'times'} size={22} color="#3c4859"/>
      </View>
    </View>
  </View>
)

const Miscellaneous = ({conditions}) => (
  <View style={styles.misc}>
    <View style={{backgroundColor: '#7C6BA0', borderTopLeftRadius: 6, borderTopRightRadius: 6, height: device.height*.06, justifyContent: 'center'}}>
      <Text style={{marginLeft: 12, color: '#fff', fontFamily: 'Nunito-Bold', fontSize: 18}}>
      Miscellaneous
      </Text>
    </View>
    <View style={{justifyContent: 'space-around'}}>
      <View>
        <Text style={{fontFamily: 'Nunito-Bold', fontSize:16, color: '#3c4859', paddingHorizontal: 8, paddingVertical: 4}}>Drug History:</Text>
        <Text style={{fontFamily: 'Nunito-Bold', fontSize:14, color: '#3c4859', paddingHorizontal: 8, paddingVertical: 4}}>{conditions.drugHistory}</Text>
      </View>
      <View>
        <Text style={{fontFamily: 'Nunito-Bold', fontSize:16, color: '#3c4859', paddingHorizontal: 8, paddingVertical: 4}}>Allergies:</Text>
        <Text style={{fontFamily: 'Nunito-Bold', fontSize:14, color: '#3c4859', paddingHorizontal: 8, paddingVertical: 4}}>{conditions.allergies}</Text>
      </View>
      <View>
        <Text style={{fontFamily: 'Nunito-Bold', fontSize:16, color: '#3c4859', paddingHorizontal: 8, paddingVertical: 4}}>Family History:</Text>
        <Text style={{fontFamily: 'Nunito-Bold', fontSize:14, color: '#3c4859', paddingHorizontal: 8, paddingVertical: 4}}>{conditions.familyHistory}</Text>
      </View>
      <View>
      <Text style={{fontFamily: 'Nunito-Bold', fontSize:16, color: '#3c4859', paddingHorizontal: 8, paddingVertical: 4}}>Review of System:</Text>
        <Text style={{fontFamily: 'Nunito-Bold', fontSize:14, color: '#3c4859', paddingHorizontal: 8, paddingVertical: 4}}>{conditions.ROS}</Text>
      </View>
    </View>
  </View>
)

const vitalStub = {
  pulseRate: '--',
  bloodPressure: '--/--',
  bloodOxygenSaturation: '--',
  temperature: '--',
  height: '---',
  weight: '--'
}

const vitalsDemo = [
  { 
    key: 'pulseRate',
    icon: require('../../../../assets/images/vitals/pulse.png'),
    unit: 'bpm',
  },
  {
    key: 'bloodPressure',
    icon: require('../../../../assets/images/vitals/pressure.png'),
    unit: '',
  },
  {
    key: 'bloodOxygenSaturation',
    icon: require('../../../../assets/images/vitals/spo2.png'),
    unit: '%',
  },
  {
    key: 'temperature',
    icon: require('../../../../assets/images/vitals/temperature.png'),
    unit: '°C',
  },
  {
    key: 'height',
    icon: require('../../../../assets/images/vitals/height.png'),
    unit: 'cm',
  },
  {
    key: 'weight',
    icon: require('../../../../assets/images/vitals/weight.png'),
    unit: 'kg',
  }
]

const Vitals = ({vitals}) => (
  <View style={styles.vitals}>
    {vitalsDemo.map(({icon, unit, key}, i) => (
      <View key={i} style={{width: 64, height: 64, marginVertical: 12, flexGrow: 1, width: '30%', alignItems: 'center', justifyContent: 'space-around'}}>
        <Image style={{width: 40, height: 40}} source={icon} />
        <Text style={{fontFamily: 'Nunito-Bold', color: '#3c4859'}}>{vitals[key]} {unit.toUpperCase()}</Text>
      </View>
    ))}
  </View>
)

export default class Record extends Component {
  constructor(props) {
    super(props)
    this.state = {
      record: props.record
    }
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content', true)
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Appearance picture={this.props.record?{uri: this.props.record.picture}:require('../../../../assets/images/test.jpg')}/>
          <PatientName name={this.props.record?this.props.record.name:'Patient Name'}/>
          <Vitals vitals={this.props.record?this.props.record.vitals:vitalStub}/>
          <ChiefComplaints cc={this.props.record?this.props.record.cc:'---'}/>
          <PreviousMedicalHistory diseases={this.props.record?this.props.record.pmh:{}}/>
          <Screening screeningResult={this.props.record?this.props.record.screening:{alchoholUse: '', drugUse: '', tobaccoUse: ''}}/>
          <Miscellaneous conditions={this.props.record?this.props.record.conditions:{drugHistory: '---', allergies: '---', familyHistory: '---', ROS: '---'}}/>
        </ScrollView>
      </View>
    )
  }
}

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
    height: device.height/3.2,
    width: device.width*.85,
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
  },
  medicalHistory: {
    justifyContent: 'space-between',
    height: device.height*.35,
    width: device.width*.85,
    borderRadius: 6,
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.7,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 8,
    marginVertical: 16
  },
  screening: {
    height: device.height*.22,
    width: device.width*.85,
    borderRadius: 6,
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.7,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 8,
    marginVertical: 16
  },
  chiefComplaints: {
    height: device.height*.25,
    width: device.width*.85,
    borderRadius: 6,
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.7,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 8,
    marginVertical: 16
  },
  misc: {
    height: device.height*.5,
    width: device.width*.85,
    borderRadius: 6,
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.7,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 8,
    marginVertical: 16
  }
})