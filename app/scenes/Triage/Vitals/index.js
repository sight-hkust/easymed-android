import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
  View,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Switch
} from 'react-native'
import { createVitals } from '../../../actions/vitals';
import LinearGradient from 'react-native-linear-gradient';
import { IconButton, Button } from '../../../components/Button'
import Icon from 'react-native-fontawesome-pro';
import TextField from '../../../components/TextField'
import Step from '../../../components/Step'
import BooleanSelect from '../../../components/BooleanSelect';
import Header from '../../../components/Header';
import Deworming from '../../../components/Deworming';

const screenWidth = Dimensions.get('window').width

const gradientLayout = {
  colors: ['#f0788a','#ef546a'],
  start: {x: 0.0, y: 1.0},
  end: {x: 1.0, y: 1.0},
  locations: [0, 0.75]
}

const stepList = ['pulseRateRespirationRate', 'bloodPressure', 'SpO2bloodSugar', 'temperature', 'weightHeight', 'deworming'];

const Instruction = ({step}) => {
  switch(step) {
    case 'deworming': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Identify the patient's</Text>
          <Text style={styles.instruction}>last deworming date</Text>
          <Text style={styles.instruction}>from below</Text>
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
  } 
}

const AllergySelect = () => (
  <View style={{justifyContent: 'space-around', alignItems: 'center', height: '100%'}}>
    <BooleanSelect title='No' icon='times' bgColor='#EF8585' color='blue' width='80%' />
    <BooleanSelect title='Yes' icon='check' bgColor='#7BD2A8' color='blue' width='80%' />
    <TextField placeholder="Allergy Info" width="80%"/>
  </View>
)

const SubmitButton = () => (
  <View style={{width:'100%', position:'absolute', top:'120%', zIndex:10}}>
    <Button title="Submit" icon="chevron-right" titleColor="#3c4859" round width="50%"/>
  </View>
)

const Response = ({step, mutate}) => {
  switch(step) {
    case 'bloodPressure': {
      return (
        <View style={styles.response}>
          <TextField 
            placeholder="Upper BP" 
            width="80%" 
            keyboardType="numeric" 
            unit="mmHg"
            onChangeText={(bloodPressure) => mutate(
              ({vitals}) => ({ vitals: { ...vitals, bloodPressure }})
            )}
          />
          <TextField 
            placeholder="Lower BP" 
            width="80%" 
            keyboardType="numeric" 
            unit="mmHg"
            onChangeText={(bloodPressure) => mutate(
              ({vitals}) => ({ vitals: { ...vitals, bloodPressure: `${vitals.bloodPressure.split('/')[0]}/${bloodPressure}` }})
            )}
          />
        </View>
      )
    }
    case 'pulseRateRespirationRate': {
      return (
        <View style={styles.response}>
          <TextField 
            placeholder="Pulse" 
            width="80%" 
            keyboardType="numeric" 
            unit="bpm"
            onChangeText={(pulseRate) => mutate(
              ({vitals}) => ({ vitals: { ...vitals, pulseRate }})
            )}
          />
          <TextField 
            placeholder="Respiration" 
            width="80%" 
            keyboardType="numeric" 
            unit="bpm"
            onChangeText={(respiratoryRate) => mutate(
              ({vitals}) => ({ vitals: { ...vitals, respiratoryRate }})
            )}
          />
        </View>
      )
    }
    case 'weightHeight': {
      return(
        <View style={styles.response}>
          <TextField 
            placeholder="Weight" 
            width="80%" 
            keyboardType="numeric" 
            unit="kg"
            onChangeText={(weight) => mutate(
              ({vitals}) => ({ vitals: { ...vitals, weight }})
            )}
          />
          <TextField 
            placeholder="Height" 
            width="80%" 
            keyboardType="numeric" 
            unit="cm"
            onChangeText={(height) => mutate(
              ({vitals}) => ({ vitals: { ...vitals, height }})
            )}
          />
        </View>
      )
    }
    case 'temperature': {
      return(
        <View style={styles.response}>
          <TextField 
            placeholder="Temperature" 
            width="80%" 
            keyboardType="numeric" 
            unit="℃"
            onChangeText={(temperature) => mutate(
              ({vitals}) => ({ vitals: { ...vitals, temperature }})
            )}
          />
        </View>
      )
    }
    case 'SpO2bloodSugar': {
      return(
        <View style={styles.response}>
          <TextField 
            placeholder="SpO2" 
            width="80%" 
            keyboardType="numeric" 
            unit="%"
            onChangeText={(bloodOxygenSaturation) => mutate(
              ({vitals}) => ({ vitals: { ...vitals, bloodOxygenSaturation }})
            )}
          />
          <TextField 
            placeholder="Blood Sugar" 
            width="80%" 
            keyboardType="numeric" 
            unit="mmol/L"
            onChangeText={(glucoseLevel) => mutate(
              ({vitals}) => ({ vitals: { ...vitals, glucoseLevel }})
            )}
          />
        </View>
      )
    }
    case 'deworming': {
      return (
        <View style={{marginTop: 16, height: '40%'}}>
          <Deworming onSelect={(lastDewormingDate) =>
          mutate( ({vitals}) => ({ vitals: { ...vitals, lastDewormingDate }}) )
        }/>
        </View>
      )
    }
  }
}

const BackgroundInfo = ({xOffset}) => (
    <View style={styles.headerContainer}>
      <LinearGradient style={styles.upper} {...gradientLayout} >
        <Header title="Vitals" light="true" to="/triage/patients/:paitentId"/>
        <Step allSteps={stepList.length-1} step={xOffset/screenWidth} backgroundColor='#fff' highlightColor='pink' />
      </LinearGradient>
    </View>
)

const ScrollItem = ({step, mutate}) => (
  <View style={{width: screenWidth}}>
    <Instruction step={step}/>
    <Response step={step} mutate={mutate}/>
  </View>
)

const ScrollList = ({handleScroll, scrollViewDidChange, mutate}) => {
  return (
    <ScrollView 
      horizontal = {true} 
      pagingEnabled ={true}
      onScroll = {handleScroll}
      scrollEventThrottle = {1}
      style={styles.scrollViewContainer}
      onContentSizeChange={scrollViewDidChange}
      >
      {stepList.map((step, i) => (
        <ScrollItem key={i} step={step} mutate={mutate}/>
      ))}
    </ScrollView>
  )
};

class Vitals extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      xOffset:0,
      vitals: {
        pulseRate: '',
        bloodPressure: '',
        respiratoryRate: '',
        temperature: '',
        glucoseLevel: '',
        bloodOxygenSaturation: '',
        weight: '',
        height: '',
        lastDewormingDate: null
      }
    }
  }

   handleScroll({nativeEvent: { contentOffset: { x }}}){
     this.setState({ xOffset: x})
   }

  componentWillMount() {
    StatusBar.setBarStyle('light-content')
  }

  submit() {
    console.log(this.state.vitals)
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.parentContainer}>
        <BackgroundInfo xOffset={this.state.xOffset}/>
        <ScrollList handleScroll={this.handleScroll} mutate={this.setState.bind(this)}/>
        <Button 
            title="Submit" 
            onPress={this.submit.bind(this)} 
            bgColor="#1d9dff" titleColor="#fff" 
            icon="chevron-right"
            width="50%"
            round
          />
      </KeyboardAvoidingView>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({createVitals}, dispatch)
})

const mapStateToProps = (state) => ({
  vitalsId: state.vitals.id
})

export default connect(mapStateToProps, mapDispatchToProps)(Vitals)

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f6fb',
    paddingBottom: 12
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