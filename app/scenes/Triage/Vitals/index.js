import React, { Component } from 'react'
import { View, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, Dimensions, Switch } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { IconButton, Button } from '../../../components/Button'
import Icon from '../../../components/Icon'
import TextField from '../../../components/TextField'
import Step from '../../../components/Step'
import BooleanSelect from '../../../components/BooleanSelect';

const screenWidth = Dimensions.get('window').width

const gradientLayout = {
  colors: ['#F0788A','#EF546A'],
  start: {x: 0.0, y: 1.0},
  end: {x: 1.0, y: 1.0},
  locations: [0, 0.75]
}

const Header = () => (
  <View style={styles.header}>
    <IconButton color="#fff" name='arrow-left' to={'/triage'} back/>
    <Text style={styles.headerText}>Vitals</Text>
  </View>
)

const stepList = [
  {
    step: 'vaccination',
  },
  {
    step: 'deworming',
  },
  {
    step: 'allergy',
  },
  {
    step: 'bloodPressure',
  },
  {
    step: 'pulseRateRespirationRate',
  },
  {
    step: 'weightHeight',
  },
  {
    step: 'temperature',
  },
  {
    step: 'SpO2bloodSugar',
  },
  {
    step: 'HTN',
  },
  {
    step: 'DM',
  },
  {
    step: 'TB',
  },
  {
    step: 'asthma',
  },
  {
    step: 'hepatitisABC',
  },
  {
    step: 'malaria',
  },
  {
    step: 'HIV',
  },
  {
    step: 'otherPMH',
  },
  {
    step: 'tobacco',
  },
  {
    step: 'ETOH',
  },
  {
    step: 'drugUse',
  },
  {
    step: 'otherSH',
  },
];

const Instruction = ({step}) => {
  switch(step) {
    case 'vaccination': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Select the vaccination</Text>
          <Text style={styles.instruction}>that the patient</Text>
          <Text style={styles.instruction}>had before</Text>
        </View>
      )
    }
    case 'deworming': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Identify the patient's</Text>
          <Text style={styles.instruction}>deworming history using</Text>
          <Text style={styles.instruction}>the indicator below</Text>
        </View>
      )
    }
    case 'allergy': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Choose and enter</Text>
          <Text style={styles.instruction}>the allergy information</Text>
          <Text style={styles.instruction}>of the patient</Text>
        </View>
      )
    }
    case 'bloodPressure': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the upper and</Text>
          <Text style={styles.instruction}>lower blood pressure</Text>
          <Text style={styles.instruction}>of the patient</Text>
        </View>
      )
    }
    case 'pulseRateRespirationRate': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the pulse rate</Text>
          <Text style={styles.instruction}>and respiration rate</Text>
          <Text style={styles.instruction}>of the patient</Text>
        </View>
      )
    }
    case 'weightHeight': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the</Text>
          <Text style={styles.instruction}>weight and height</Text>
          <Text style={styles.instruction}>of the patient</Text>
        </View>
      )
    }
    case 'temperature': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the body</Text>
          <Text style={styles.instruction}>temperature</Text>
          <Text style={styles.instruction}>of the patient</Text>
        </View>
      )
    }
    case 'SpO2bloodSugar': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the SpO2</Text>
          <Text style={styles.instruction}>and blood sugar</Text>
          <Text style={styles.instruction}>of the patient</Text>
        </View>
      )
    }
    case 'HTN': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Identify if the patient</Text>
          <Text style={styles.instruction}>has hypertension using</Text>
          <Text style={styles.instruction}>the indicator below</Text>
        </View>
      )
    }
    case 'DM': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Identify if the patient</Text>
          <Text style={styles.instruction}>has diabetes mellitus</Text>
          <Text style={styles.instruction}>using the indicator below</Text>
        </View>
      )
    }
    case 'TB': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Identify if the patient</Text>
          <Text style={styles.instruction}>has tuberculosis disease</Text>
          <Text style={styles.instruction}>using the indicator below</Text>
        </View>
      )
    }
    case 'asthma': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Identify if the patient</Text>
          <Text style={styles.instruction}>has asthma using</Text>
          <Text style={styles.instruction}>the indicator below</Text>
        </View>
      )
    }
    case 'hepatitisABC': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Identify if the patient</Text>
          <Text style={styles.instruction}>has hepatitis A/B/C using</Text>
          <Text style={styles.instruction}>the indicator below</Text>
        </View>
      )
    }
    case 'malaria': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Identify if the patient</Text>
          <Text style={styles.instruction}>has malaria using</Text>
          <Text style={styles.instruction}>the indicator below</Text>
        </View>
      )
    }
    case 'HIV': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Identify if the patient</Text>
          <Text style={styles.instruction}>has HIV using</Text>
          <Text style={styles.instruction}>the indicator below</Text>
        </View>
      )
    }
    case 'otherPMH': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the other</Text>
          <Text style={styles.instruction}>past medical history</Text>
          <Text style={styles.instruction}>of the patient</Text>
        </View>
      )
    }
    case 'tobacco': {
      return(
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Identify if the patient</Text>
          <Text style={styles.instruction}>uses tobacco using</Text>
          <Text style={styles.instruction}>the indicator below</Text>
        </View>      
      )
    }
    case 'ETOH': {
      return(
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Identify if the patient shows</Text>
          <Text style={styles.instruction}>effects of alcohol usage</Text>
          <Text style={styles.instruction}>using the indicator below</Text>
        </View>      
      )
    }
    case 'drugUse': {
      return(
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Identify if the patient</Text>
          <Text style={styles.instruction}>uses drug using</Text>
          <Text style={styles.instruction}>the indicator below</Text>
        </View>      
      )
    }
    case 'otherSH': {
      return(
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the other</Text>
          <Text style={styles.instruction}>social history</Text>
          <Text style={styles.instruction}>of the patient</Text>
        </View>      
      )
    }
  } 
}

const DewormingSelect = () => (
  <View style={{justifyContent: 'space-around', alignItems: 'center', height: '100%'}}>
    <TouchableOpacity style={styles.selectStatus}>
      <Text style={styles.selectStatusText}>UNKNOWN</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.selectStatus}>
      <Text style={styles.selectStatusText}>WITHIN 3 MONTHS</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.selectStatus}>
      <Text style={styles.selectStatusText}>WITHIN 6 MONTHS</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.selectStatus}>
      <Text style={styles.selectStatusText}>NO</Text>
    </TouchableOpacity>
  </View>
)

const AllergySelect = () => (
  <View style={{justifyContent: 'space-around', alignItems: 'center', height: '100%'}}>
    <BooleanSelect title='No' icon='times' bgColor='#EF8585' color='blue' width='80%' />
    <BooleanSelect title='Yes' icon='check' bgColor='#7BD2A8' color='blue' width='80%' />
    <TextField placeholder="Allergy Info" width="80%"/>
  </View>
)

const YesNoUnknownSelect = () => (
  <View style={{...StyleSheet.flatten(styles.response), height: '40%'}}>
    <BooleanSelect title='Yes' icon='check' bgColor='#7BD2A8' color='blue' width='80%'/>
    <BooleanSelect title='No' icon='times' bgColor='#EF8585' color='blue' width='80%' />
    <BooleanSelect title='Unknown' icon='question' bgColor='#F9E397' color='blue' width='80%' />
  </View>
)

const YesNoSelect = () => (
  <View style={{...StyleSheet.flatten(styles.response), height: '28%'}}>
    <BooleanSelect title='Yes' icon='check' bgColor='#7BD2A8' color='blue' width='80%'/>
    <BooleanSelect title='No' icon='times' bgColor='#EF8585' color='blue' width='80%' />
  </View>
)

const SubmitButton = () => (
  <View style={{width:'100%', position:'absolute', top:'36%', zIndex:10}}>
    <Button title="Submit" icon="chevron-right" round width="50%"/>
  </View>
)

const Response = ({step}) => {
  switch(step) {
    case 'vaccination': {
      return (
        <View style={styles.response}>
          <TextField placeholder="vaccination1" width="80%"/>
          <TextField placeholder="vaccination2" width="80%"/>
        </View>
      )
    }
    case 'deworming': {
      return (
        <View style={{marginTop: 16, height: '40%'}}>
          <DewormingSelect />
        </View>
      )
    }
    case 'allergy': {
      return (
        <View style={{marginTop: 16, height: '32%'}}>
          <AllergySelect />
        </View>
      )
    }
    case 'bloodPressure': {
      return (
        <View style={styles.response}>
          <TextField placeholder="Upper BP" width="80%" keyboardType="numeric" unit="mmHg"/>
          <TextField placeholder="Lower BP" width="80%" keyboardType="numeric" unit="mmHg"/>
        </View>
      )
    }
    case 'pulseRateRespirationRate': {
      return (
        <View style={styles.response}>
          <TextField placeholder="Pulse" width="80%" keyboardType="numeric" unit="bpm"/>
          <TextField placeholder="Respiration" width="80%" keyboardType="numeric" unit="bpm"/>
        </View>
      )
    }
    case 'weightHeight': {
      return(
        <View style={styles.response}>
          <TextField placeholder="Weight" width="80%" keyboardType="numeric" unit="kg"/>
          <TextField placeholder="Height" width="80%" keyboardType="numeric" unit="cm"/>
        </View>
      )
    }
    case 'temperature': {
      return(
        <View style={styles.response}>
          <TextField placeholder="Temperature" width="80%" keyboardType="numeric" unit="℃"/>
        </View>
      )
    }
    case 'SpO2bloodSugar': {
      return(
        <View style={styles.response}>
          <TextField placeholder="SpO2" width="80%" keyboardType="numeric" unit="%"/>
          <TextField placeholder="Blood Sugar" width="80%" keyboardType="numeric" unit="mmol/L"/>
        </View>
      )
    }
    case 'HTN': {
      return(
        <YesNoUnknownSelect />
      )
    }
    case 'DM': {
      return(
        <YesNoUnknownSelect />
      )
    }
    case 'TB': {
      return(
        <YesNoUnknownSelect />
      )
    }
    case 'asthma': {
      return(
        <YesNoUnknownSelect />
      )
    }
    case 'hepatitisABC': {
      return(
        <YesNoUnknownSelect />
      )
    }
    case 'malaria': {
      return(
        <YesNoUnknownSelect />
      )
    }
    case 'HIV': {
      return(
        <YesNoUnknownSelect />
      )
    }
    case 'otherPMH': {
      return(
        <View style={styles.response}>
          <TextField placeholder="PMH" width="80%"/>
        </View>
      )
    }
    case 'tobacco': {
      return(
        <YesNoSelect />
      )
    }
    case 'ETOH': {
      return(
        <YesNoSelect />
      )
    }
    case 'drugUse': {
      return(
        <YesNoSelect />
      )
    }
    case 'otherSH': {
      return(
        <View style={styles.response}>
          <TextField placeholder="SH" width="80%"/>
        </View>    
      )
    }
  }
}

const BackgroundInfo = ({xOffset}) => (
    <View style={styles.headerContainer}>
      <LinearGradient style={styles.upper} {...gradientLayout} >
        <Header/>
        <Step allSteps={19} step={xOffset/screenWidth} backgroundColor='#fff' highlightColor='pink' />
      </LinearGradient>
    </View>
)

const ScrollItem = ({step}) => (
  <View style={{width: screenWidth}}>
    <Instruction step={step}/>
    <Response step={step}/>
  </View>
)

const ScrollList = ({handleScroll, scrollViewDidChange}) => {
  return (
    <ScrollView 
      horizontal = {true} 
      pagingEnabled ={true}
      onScroll = {handleScroll}
      scrollEventThrottle = {1}
      style={styles.scrollViewContainer}
      onContentSizeChange={scrollViewDidChange}
      >
      {stepList.map(({step, stepNum}, i) => (
        <ScrollItem key={i} step={step}/>
      ))}
    </ScrollView>
  )
};

export default class Vitals extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      xOffset:0,
    }
  }

   handleScroll({nativeEvent: { contentOffset: { x }}}){
     this.setState({ xOffset: x})
   }

  componentWillMount() {
    StatusBar.setBarStyle('light-content')
  }

  render() {
    return (
      <View style={styles.parentContainer}>
        <BackgroundInfo xOffset={this.state.xOffset}/>
        <ScrollList handleScroll={this.handleScroll}/> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f6fb',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f6fb',
    zIndex: 0,
  },
  scrollViewContainer: {
    flex: 1,
    position: 'absolute',
    top: '20%',
    height: '100%',
    paddingTop: 16,
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
    height: '28%',
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
  selectStatus: {
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
  selectStatusText: {
    fontSize: 22,
    fontFamily: 'Nunito-Bold',
    color: '#3c4859',
    marginLeft: 12
  },
  footer: {
    marginTop: 18
  }
})