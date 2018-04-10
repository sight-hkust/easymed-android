import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
  View,
  KeyboardAvoidingView,
  Image,
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Switch
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { IconButton, Button, KeyboardDismissButton } from '../../../components/Button'
import { attachMetadata } from '../../../actions/record';
import Icon from 'react-native-fontawesome-pro';
import TextField from '../../../components/TextField'
import Step from '../../../components/Step'
import Header from '../../../components/Header';
import DatePicker from '../../../components/DatePicker';

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

const Response = ({step, mutate, ldw}) => {
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
        <View style={{height:'48%', justifyContent: 'space-between', marginTop:8}}>
          <DatePicker onSelect={(lastDewormingDate) =>
          mutate( ({vitals}) => ({ vitals: { ...vitals, lastDewormingDate }}) )
          }/>
          <View style={{backgroundColor:'#fff', borderRadius:5, height:52, width:'80%', alignSelf:'center' ,alignItems:'center', justifyContent:'center', shadowColor: '#e4e4e4', shadowOpacity: 0.5, shadowOffset: { width: 1, height: 3 }, shadowRadius: 5}}>
            <Text style={{fontFamily:'Quicksand-Medium', color:ldw?'#3c4859':'#A8B0CE', fontSize:18}}>
              {ldw?ldw.toDateString():'Last deworming date'}
            </Text>
          </View>
        </View>
      )
    }
  }
}

const HeaderContainer = ({xOffset, path}) => (
  <View style={styles.headerContainer}>
    <Header title="Vitals" light="true" to={`/triage/patients/${path}`}/>
    <Step allSteps={stepList.length-1} step={xOffset/screenWidth} backgroundColor='#fff' highlightColor='#FAEB9A' />
  </View>
)

class Vitals extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      xOffset:0,
      isKeyboardPresent: false,
      queueId: props.match.params.queueId,
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
    this.attachMetadata = props.actions.attachMetadata
  }

  handleScroll({nativeEvent: { contentOffset: { x }}}){
    this.setState({ xOffset: x})
    this.refs.responseScroll.scrollTo({x: x, animated:false})
  }

  componentWillMount() {
    StatusBar.setBarStyle('light-content')
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow.bind(this))
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide.bind(this))
  }

  _keyboardWillShow () {
    this.setState(previousState => ({isKeyboardPresent: true}))
  }

  _keyboardWillHide () {
    this.setState(previousState => ({isKeyboardPresent: false}))
  }

  submit() {
    this.attachMetadata(this.state.vitals, this.state.queueId)
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.parentContainer} behavior="position">
        <HeaderContainer xOffset={this.state.xOffset} path={this.state.queueId}/>
        <ScrollView 
          ref = 'questionScroll'
          horizontal = {true} 
          pagingEnabled = {true}
          onScroll = {this.handleScroll}
          scrollEventThrottle = {1}
          showsHorizontalScrollIndicator = {false}
          style={styles.questionContainer}
          >
          {stepList.map((step, i) => (
            <View style={{width: screenWidth}} key={i}>
              <Instruction step={step}/>
            </View>
          ))}
        </ScrollView>
        
        <ScrollView 
          ref = 'responseScroll'
          horizontal = {true} 
          pagingEnabled ={true}
          scrollEnabled = {false}
          showsHorizontalScrollIndicator = {false}
          style={styles.responseContainer}
          >
          {stepList.map((step, i) => (
            <View style={{width: screenWidth, justifyContent:'flex-start'}} key={i}>
              <Response step={step} mutate={this.setState.bind(this)} ldw={this.state.vitals.lastDewormingDate}/>
            </View>
          ))}
        </ScrollView>

        <View style={{height:'8%'}}>
          <Button 
              title="Submit" 
              onPress={this.submit.bind(this)} 
              bgColor="#1d9dff" titleColor="#fff" 
              icon="chevron-right"
              width="50%"
              round
            />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({attachMetadata}, dispatch)
})

export default connect(null, mapDispatchToProps)(Vitals)

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f6fb',
    paddingBottom: 16
  },
  headerContainer: {
    height: '20%',
    justifyContent: 'space-around',
    backgroundColor: '#f0788a',
  },
  questionContainer:{
    height: '24%',
    backgroundColor: '#f0788a',
  },
  responseContainer:{
    height: '48%',
    backgroundColor: '#f5f6fb',
    paddingTop: 40
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
    height: '52%',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})