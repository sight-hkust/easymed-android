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
  Switch,
  Platform
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { IconButton, Button, KeyboardDismissButton } from '../../../components/Button'
import { addVitalsRecord } from '../../../actions/record';
import Icon from 'react-native-fontawesome-pro';
import Modal from 'react-native-modal';
import Spinner from 'react-native-spinkit';
import TextField from '../../../components/TextField'
import Step from '../../../components/Step'
import Header from '../../../components/Header';
import DatePicker from '../../../components/DatePicker';

const {width, height} = Dimensions.get('window')

const Instruction = ({step}) => {
  switch(step) {
    case 'deworming': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Last Deworming Date</Text>
        </View>
      )
    }
    case 'bloodPressure': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Upper and Lower</Text>
          <Text style={styles.instruction}>Blood Pressure</Text>
        </View>
      )
    }
    case 'pulseRateRespirationRate': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Pulse Rate</Text>
          <Text style={styles.instruction}>and Respiration rate</Text>
        </View>
      )
    }
    case 'weightHeight': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Weight</Text>
          <Text style={styles.instruction}>and Height</Text>
        </View>
      )
    }
    case 'temperature': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Body Temperature</Text>
        </View>
      )
    }
    case 'SpO2bloodSugar': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>SpO2</Text>
          <Text style={styles.instruction}>and Glucose level</Text>
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

const HeaderContainer = ({xOffset, path, stepsLength}) => (
  <View style={styles.headerContainer}>
    <Header title="Vitals" light="true" to={`/triage/patients/${path}`}/>
    <Step allSteps={stepsLength} step={xOffset/width} backgroundColor='#fff' highlightColor='#FAEB9A' />
  </View>
)

class Vitals extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      questions: props.patient.age < 2 ? ['weightHeight', 'temperature', 'bloodPressure', 'pulseRateRespirationRate', 'SpO2bloodSugar']: ['weightHeight', 'temperature', 'bloodPressure', 'pulseRateRespirationRate', 'SpO2bloodSugar', 'deworming'],
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
    this.addVitalsRecord = this.props.actions.addVitalsRecord.bind(this)
  }

  handleScroll({nativeEvent: { contentOffset: { x }}}){
    this.setState({ xOffset: x})
    this.refs.responseScroll.scrollTo({x: x, animated:false})
  }

  componentWillMount() {
    const adult = ['weightHeight', 'temperature', 'bloodPressure', 'pulseRateRespirationRate', 'SpO2bloodSugar', 'deworming'];
    const child = ['weightHeight', 'temperature', 'bloodPressure', 'pulseRateRespirationRate', 'SpO2bloodSugar'];
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
    this.addVitalsRecord(this.state.vitals, this.state.queueId)
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.parentContainer} behavior= {(Platform.OS === 'ios')? "padding" : null}>
        <HeaderContainer xOffset={this.state.xOffset} path={this.state.queueId} stepsLength={this.state.questions.length-1}/>
        <ScrollView 
          ref = 'questionScroll'
          horizontal = {true} 
          pagingEnabled = {true}
          onScroll = {this.handleScroll}
          scrollEventThrottle = {1}
          showsHorizontalScrollIndicator = {false}
          style={styles.questionContainer}
          >
          {this.state.questions.map((step, i) => (
            <View style={{width}} key={i}>
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
          {this.state.questions.map((step, i) => (
            <View style={{width, justifyContent:'flex-start'}} key={i}>
              <Response step={step} mutate={this.setState.bind(this)} ldw={this.state.vitals.lastDewormingDate}/>
              {this.state.isKeyboardPresent && <KeyboardDismissButton top={-42} left={8}/>}
            </View>
          ))}
        </ScrollView>

        <View style={{height:'8%'}}>
          {
            this.state.vitals.pulseRate.length > 0 &&
            this.state.vitals.bloodPressure.length > 0 &&
            this.state.vitals.respiratoryRate.length > 0 &&
            this.state.vitals.temperature.length > 0 && 
            this.state.vitals.bloodOxygenSaturation.length > 0 &&
            this.state.vitals.height.length > 0 &&
            this.state.vitals.weight.length > 0 &&
            <Button 
              title="Submit" 
              onPress={this.submit.bind(this)} 
              bgColor="#1d9dff" titleColor="#fff" 
              icon="chevron-right"
              width="50%"
              round
            />
          }
        </View>
        <Modal
          isVisible={this.props.loading}
          animationIn="fadeIn"
          backdropOpacity={0}
          style={{justifyContent: 'center'}}
        >
          <View style={styles.loading}>
            <Spinner
            isVisible={this.props.loading}
            size={44}
            style={{alignSelf: 'center'}}
            type='Bounce' 
            color='#81e2d9'/>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({addVitalsRecord}, dispatch)
})

const mapStateToProps = (state, props) => ({
  loading: state.records.loading.spinner,
  patient: state.patients.queue[state.patients.queue.findIndex(({queueId}) => props.match.params.queueId === queueId)].patient
})

export default connect(mapStateToProps, mapDispatchToProps)(Vitals)

const styles = StyleSheet.create({
  parentContainer: {
    height: Platform.select({ios: Dimensions.get('window').height, android: Dimensions.get('window').height-StatusBar.currentHeight}),
    width: Dimensions.get('window').width,
    backgroundColor: '#f5f6fb',
    paddingBottom: 16
  },
  headerContainer: {
    height: height*.2,
    justifyContent: 'space-around',
    backgroundColor: '#f0788a',
  },
  questionContainer:{
    height: height*.24,
    backgroundColor: '#f0788a',
  },
  responseContainer:{
    height: height*.48,
    backgroundColor: '#f5f6fb',
    paddingTop: 40
  },
  textWrapper: {
    marginTop: 20,
    paddingHorizontal: 18,
    backgroundColor: 'transparent',
    paddingBottom: height*.12
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
  },
  loading: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 88,
    width: 88,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 8
  }
})