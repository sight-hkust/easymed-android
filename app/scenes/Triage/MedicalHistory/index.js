import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
import LinearGradient from 'react-native-linear-gradient';
import { IconButton, Button } from '../../../components/Button'
import Icon from 'react-native-fontawesome-pro';
import { TextField, TextBox } from '../../../components/TextField'
import Step from '../../../components/Step'
import BooleanSelect from '../../../components/BooleanSelect';
import Header from '../../../components/Header';

const { width, height } = Dimensions.get('window')

const gradientLayout = {
  colors: ['#E9D9AE','#E1CB90'],
  start: {x: 0.0, y: 1.0},
  end: {x: 1.0, y: 1.0},
  locations: [0, 0.75]
}

const stepList = ['HTN', 'DM', 'TB', 'asthma', 'hepatitisA', 'hepatitisB', 'malaria', 'HIV', 'vaccination', 'otherPMH',];

class Survey extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.surveyContainer}>
        <Text>{props.title}</Text>
        <View>
          <Button title="YES"/>
          <Button title="NO"/>
          <Button title="UNKNOWN"/>
        </View>
      </View>
    )
  }
}

const HeaderContainer = ({xOffset, path}) => (
  <View style={styles.headerContainer}>
    <Header title="Medical History" light="true" to={`/triage/patients/${path}`}/>
    <Step allSteps={stepList.length-1} step={xOffset/screenWidth} backgroundColor='#fff' highlightColor='#FAEB9A' />
  </View>
)

class MedicalHistory extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      xOffset:0,
      queueId: props.match.params.queueId,
      medicalHistory: {
        hypertension: '',
        diabetes: '',
        tuberculosis: '',
        asthma: '',
        malaria: '',
        hepatitis: '',
        HIV: '',
        vaccination: '',
        other: ''
      }
    }
  }

   handleScroll({nativeEvent: { contentOffset: { x }}}){
     this.setState({ xOffset: x})
     this.refs.responseScroll.scrollTo({x: x, animated:false})
   }

  componentWillMount() {
    StatusBar.setBarStyle('light-content')
  }

  render() {
    return (
      <View style={styles.container}>
        
      </View>
    )
  }
}

const mapStateToProps = (state, props) => ({
  patientId: state.patients.queue[state.patients.queue.findIndex(({queueId}) => props.match.params.queueId)].patient.id
})

export default connect(mapStateToProps)(MedicalHistory)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f6fb',
    paddingBottom: 16
  },
  surveyContainer:{
    flexDirection: 'row',
    height: height*.12,
    width: width*0.8,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    marginVertical: 10,
    borderRadius: 5,
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 5,
    alignSelf: 'center',
    alignItems: 'center'
  }
})