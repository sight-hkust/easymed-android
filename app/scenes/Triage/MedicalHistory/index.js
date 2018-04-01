import React, { Component } from 'react'
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

const screenWidth = Dimensions.get('window').width

const gradientLayout = {
  colors: ['#E9D9AE','#E1CB90'],
  start: {x: 0.0, y: 1.0},
  end: {x: 1.0, y: 1.0},
  locations: [0, 0.75]
}

const stepList = ['HTN', 'DM', 'TB', 'asthma', 'hepatitisABC', 'malaria', 'HIV', 'vaccination', 'otherPMH',];

const Instruction = ({step}) => {
  switch(step) {
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
    case 'vaccination': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the </Text>
          <Text style={styles.instruction}>vaccination details</Text>
          <Text style={styles.instruction}>of the patient</Text>
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
  } 
}

const Response = ({step, mutate}) => {
  switch(step) {
    case 'HTN': {
      return(
        <View style={styles.response}>
          <BooleanSelect onSelect={(hypertension) =>
            mutate( ({medicalHistory}) => ({ medicalHistory: { ...medicalHistory, hypertension }}) )
          }/>
        </View>
      )
    }
    case 'DM': {
      return(
        <View style={styles.response}>
          <BooleanSelect onSelect={(diabetes) =>
            mutate( ({medicalHistory}) => ({ medicalHistory: { ...medicalHistory, diabetes }}) )
          }/>
        </View>
      )
    }
    case 'TB': {
      return(
        <View style={styles.response}>
          <BooleanSelect onSelect={(tuberculosis) =>
            mutate( ({medicalHistory}) => ({ medicalHistory: { ...medicalHistory, tuberculosis }}) )
          }/>
        </View>
      )
    }
    case 'asthma': {
      return(
        <View style={styles.response}>
          <BooleanSelect onSelect={(asthma) =>
            mutate( ({medicalHistory}) => ({ medicalHistory: { ...medicalHistory, asthma }}) )
          }/>
        </View>
      )
    }
    case 'hepatitisABC': {
      return(
        <View style={styles.response}>
          <BooleanSelect onSelect={(hepatitis) =>
            mutate( ({medicalHistory}) => ({ medicalHistory: { ...medicalHistory, hepatitis }}) )
          }/>
        </View>
      )
    }
    case 'malaria': {
      return(
        <View style={styles.response}>
          <BooleanSelect onSelect={(malaria) =>
            mutate( ({medicalHistory}) => ({ medicalHistory: { ...medicalHistory, malaria }}) )
          }/>
        </View>
      )
    }
    case 'HIV': {
      return(
        <View style={styles.response}>
          <BooleanSelect onSelect={(HIV) =>
            mutate( ({medicalHistory}) => ({ medicalHistory: { ...medicalHistory, HIV }}) )
          }/>
        </View>
      )
    }
    case 'vaccination': {
      return(
        <View style={{alignItems:'center'}}>
          <TextBox placeholder="Type the vaccination details" width="80%" onChangeText={(vaccination) => mutate(
            ({medicalHistory}) => ({medicalHistory: {...medicalHistory, vaccination}})
          )} />
        </View>
      )
    }
    case 'otherPMH': {
      return(
        <View style={{alignItems:'center'}}>
          <TextBox placeholder="Type the past medical history" width="80%" onChangeText={(other) => mutate(
            ({medicalHistory}) => ({medicalHistory: {...medicalHistory, other}})
          )} />
        </View>
      )
    }
  }
}

const HeaderContainer = ({xOffset}) => (
  <View style={styles.headerContainer}>
    <Header title="Medical History" light="true" to="/triage/patients/:paitentId"/>
    <Step allSteps={stepList.length-1} step={xOffset/screenWidth} backgroundColor='#fff' highlightColor='#FAEB9A' />
  </View>
)

export default class MedicalHistory extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      xOffset:0,
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

  submit() {
    console.log(this.state.medicalHistory)
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.parentContainer} behavior="position">
        <HeaderContainer xOffset={this.state.xOffset}/>

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
              <Response step={step} mutate={this.setState.bind(this)}/>
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
    backgroundColor: '#E9D9AE',
  },
  questionContainer:{
    height: '24%',
    backgroundColor: '#E9D9AE',
  },
  responseContainer:{
    height: '48%',
    backgroundColor: '#f5f6fb',
    paddingTop: 40,
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
    height: '56%',
    width: '100%',
  }
})