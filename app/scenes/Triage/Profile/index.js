import React, { Component } from 'react'
import { View, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { IconButton, Button } from '../../../components/Button'
import Icon from '../../../components/Icon'
import TextField from '../../../components/TextField'
import Step from '../../../components/Step'

const screenWidth = Dimensions.get('window').width

const gradientLayout = {
  colors: ['#19AEFA','#1D9DFF'],
  start: {x: 0.0, y: 1.0},
  end: {x: 1.0, y: 1.0},
  locations: [0, 0.75]
}

const Header = () => (
  <View style={styles.header}>
    <IconButton color="#fff" name='arrow-left' to={'/triage'} back/>
    <Text style={styles.headerText}>Profile</Text>
  </View>
)

const stepList = [
  {
    step: 'name',
    stepNum: 1,
  },
  {
    step: 'gender',
    stepNum: 2,
  },
  {
    step: 'dob',
    stepNum: 3,
  },
  {
    step: 'married',
    stepNum: 4,
  },
];

const Instruction = ({step}) => {
  switch(step) {
    case 'name': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter both the</Text>
          <Text style={styles.instruction}>NAME and KHMER variant</Text>
          <Text style={styles.instruction}>of patient</Text>
        </View>
      )
    }
    case 'gender': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Identify the patient's</Text>
          <Text style={styles.instruction}>sex using the indicator</Text>
          <Text style={styles.instruction}>below</Text>
        </View>
      )
    }
    case 'dob': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the date of</Text>
          <Text style={styles.instruction}>birth for the patient</Text>
          <Text style={styles.instruction}>AGE: </Text>
        </View>
      )
    }
    case 'married': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Choose the indicator</Text>
          <Text style={styles.instruction}>to represents patient's</Text>
          <Text style={styles.instruction}>Marital Status</Text>
        </View>
      )
    }
  }
}

const GenderSelect = () => (
  <View style={{width: '70%', flexDirection: 'row', justifyContent: 'space-around'}}>
    <TouchableOpacity style={styles.gender}>
      <Icon name="venus" size={44} color="#ff5273"/>
      <Text style={styles.genderText}>Female</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.gender}>
      <Icon name="mars" size={44} color="#4c79fc"/>
      <Text style={styles.genderText}>Male</Text>
    </TouchableOpacity>
  </View>
)

const MaritalStatusSelect = () => (
  <View style={{justifyContent: 'space-around', alignItems: 'center', height: '100%'}}>
    <TouchableOpacity style={styles.maritalStatus}>
      <Text style={styles.maritalStatusText}>MARRIED</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.maritalStatus}>
      <Text style={styles.maritalStatusText}>DIVORCED</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.maritalStatus}>
      <Text style={styles.maritalStatusText}>WIDOWED</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.maritalStatus}>
      <Text style={styles.maritalStatusText}>SINGLE</Text>
    </TouchableOpacity>
  </View>
)

const Response = ({step}) => {
  switch(step) {
    case 'name': {
      return (
        <View style={styles.response}>
          <TextField placeholder="Name" width="80%"/>
          <TextField placeholder="Khmer Name" width="80%"/>
        </View>
      )
    }
    case 'gender': {
      return (
        <View style={styles.response}>
          <GenderSelect />
        </View>
      )
    }
    case 'dob': {
      return (
        <View style={{...StyleSheet.flatten(styles.response), height: '32%'}}>
          <TextField placeholder="Year" width="80%"/>
          <TextField placeholder="Month" width="80%"/>
          <TextField placeholder="Day" width="80%"/>
        </View>
      )
    }
    case 'married': {
      return (
        <View style={{marginTop: 16, height: '40%'}}>
          <MaritalStatusSelect />
        </View>
      )
    }
  }
}

const BackgroundInfo = () => (
  <View style={styles.container}>
    <LinearGradient style={styles.upper} {...gradientLayout} >
      <Header/>
      <Step allSteps={10} step={0} backgroundColor='#fff' highlightColor='pink' />
    </LinearGradient>
  </View>
)

const ScrollItem = ({step, stepNum}) => (
  <View style={{width: screenWidth}}>
    <Step allSteps={10} step={stepNum} highlightColor='pink'/>
    <Instruction step={step}/>
    <Response step={step}/>
    <View style={styles.footer}>
      <Button title="next" icon="chevron-right" round width="50%"/>
    </View>
  </View>
)

const ScrollList = () => {
  return (
    <ScrollView horizontal pagingEnabled style={styles.scrollViewContainer}>
      {stepList.map(({step, stepNum}, i) => (
        <ScrollItem key={i} step={step} stepNum={stepNum} />
      ))}
    </ScrollView>
  )
};

export default class Profile extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    StatusBar.setBarStyle('light-content')
  }

  render() {
    return (
      <View style={styles.bigcontainer}>
        <BackgroundInfo />
        <ScrollList />      
      </View>

    )
  }
}

const styles = StyleSheet.create({
  bigcontainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f6fb',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f6fb',
    zIndex: 0,
  },
  scrollViewContainer: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    paddingTop:'30%'
  },
  upper: {
    height: '45%',
    paddingTop: '10%'
  },
  header: {
    flexDirection: 'row',
    height: 44,
    justifyContent: 'space-between',
    marginBottom: 32,
    alignItems: 'center'
  },
  headerText: {
    fontSize: 36,
    fontFamily: 'Nunito-Bold',
    textAlign: 'right',
    backgroundColor: '#fff0',
    color: '#fff',
    marginRight: 20,
    marginTop: 32,
  },
  textWrapper: {
    marginTop: 20,
    paddingHorizontal: 18,
    backgroundColor: 'transparent',
    paddingBottom: '12%'
  },
  instruction: {
    fontSize: 26,
    fontFamily: 'Nunito-Bold',
    textAlign: 'left',
    color: '#fff',
  },
  response: {
    marginTop: 16,
    height: '25%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: '8%'
  },
  gender: {
    width: 112,
    height: 112,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#3a4252',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16
  },
  genderText: {
    fontSize: 26,
    fontFamily: 'Nunito-Bold',
    color: '#3c4859'
  },
  maritalStatus: {
    height: 56,
    width: '80%',
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#3a4252',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  maritalStatusText: {
    fontSize: 22,
    fontFamily: 'Nunito-Bold',
    color: '#3c4859',
    marginLeft: 12
  },
  footer: {
    marginTop: 18
  }
})