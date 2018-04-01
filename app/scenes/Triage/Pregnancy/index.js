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
import Header from '../../../components/Header';
import TextField from '../../../components/TextField';
import Step from '../../../components/Step';
import DatePicker from '../../../components/DatePicker';
import BooleanSelect from '../../../components/BooleanSelect';

const screenWidth = Dimensions.get('window').width

const gradientLayout = {
  colors: ['#A594F9','#9687E3'],
  start: {x: 0.0, y: 1.0},
  end: {x: 1.0, y: 1.0},
  locations: [0, 0.75]
}

const stepList = ['lmp', 'gestation', 'breastFeeding', 'contraceptiveUse', 'liveBirth', 'miscarriage', 'abortion', 'stillBorn'];

const Instruction = ({step}) => {
  switch(step) {
    case 'lmp': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Please indicate patient's</Text>
          <Text style={styles.instruction}>Last Menstrual Period</Text>
          <Text style={styles.instruction}>date</Text>
        </View>
      )
    }
    case 'gestation': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Please indicate the</Text>
          <Text style={styles.instruction}>gestational age</Text>
          <Text style={styles.instruction}>of the patient</Text>
        </View>
      )
    }
    case 'breastFeeding': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Please indicate whether</Text>
          <Text style={styles.instruction}>patient is breastfeeding</Text>
          <Text style={styles.instruction}>below</Text>
        </View>
      )
    }
    case 'contraceptiveUse': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Please indicate whether</Text>
          <Text style={styles.instruction}>patient uses contraceptive</Text>
          <Text style={styles.instruction}>below</Text>
        </View>
      )
    }
    case 'liveBirth': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the number of</Text>
          <Text style={styles.instruction}>live birth of</Text>
          <Text style={styles.instruction}>the patient</Text>
        </View>
      )
    }
    case 'miscarriage': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the number of</Text>
          <Text style={styles.instruction}>miscarriage of</Text>
          <Text style={styles.instruction}>the patient</Text>
        </View>
      )
    }
    case 'abortion': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the number of</Text>
          <Text style={styles.instruction}>abortion the</Text>
          <Text style={styles.instruction}>patient had</Text>
        </View>
      )
    }
    case 'stillBorn': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the number of</Text>
          <Text style={styles.instruction}>still born</Text>
          <Text style={styles.instruction}>of the patient</Text>
        </View>
      )
    }
  } 
}

const Response = ({step, mutate, lmp}) => {
  switch(step) {
    case 'lmp': {
      return (
        <View style={{height:'48%', justifyContent: 'space-between', marginTop:8}}>
          <DatePicker onSelect={(lastMenstrualPeriodDate) =>
          mutate( ({pregnancy}) => ({ pregnancy: { ...pregnancy, lastMenstrualPeriodDate }}) )
          }/>
          <View style={{backgroundColor:'#fff', borderRadius:5, height:52, width:'80%', alignSelf:'center' ,alignItems:'center', justifyContent:'center', shadowColor: '#e4e4e4', shadowOpacity: 0.5, shadowOffset: { width: 1, height: 3 }, shadowRadius: 5}}>
            <Text style={{fontFamily:'Quicksand-Medium', color:lmp?'#3c4859':'#A8B0CE', fontSize:18}}>
              {lmp?lmp.toDateString():'Last menstrual period date'}
            </Text>
          </View>
        </View>
      )
    }
    case 'gestation': {
      return (
        <View style={styles.response}>
          <TextField placeholder="Weeks" width="80%" onChangeText={(gestationalAge) => mutate(
            ({pregnancy}) => ({pregnancy: {...pregnancy, gestationalAge}})
          )}/>
        </View>
      )
    }
    case 'breastFeeding': {
      return(
        <View style={{height:'56%'}}>
          <BooleanSelect onSelect={(breastFeeding) =>
            mutate( ({pregnancy}) => ({ pregnancy: { ...pregnancy, breastFeeding }}) )
          }/>
        </View>
      )
    }
    case 'contraceptiveUse': {
      return(
        <View style={{height:'56%'}}>
          <BooleanSelect  onSelect={(contraceptiveUse) =>
            mutate( ({pregnancy}) => ({ pregnancy: { ...pregnancy, contraceptiveUse }}) )
          }/>
        </View>
      )
    }
    case 'liveBirth': {
      return (
        <View style={styles.response}>
          <TextField placeholder="Live Birth" width="80%" onChangeText={(liveBirth) => mutate(
            ({pregnancy}) => ({pregnancy: {...pregnancy, liveBirth}})
          )}/>
        </View>
      )
    }
    case 'miscarriage': {
      return (
        <View style={styles.response}>
          <TextField placeholder="Miscarriage" width="80%" onChangeText={(miscarriage) => mutate(
            ({pregnancy}) => ({pregnancy: {...pregnancy, miscarriage}})
          )}/>
        </View>
      )
    }
    case 'abortion': {
      return (
        <View style={styles.response}>
          <TextField placeholder="Abortion" width="80%" onChangeText={(abortion) => mutate(
            ({pregnancy}) => ({pregnancy: {...pregnancy, abortion}})
          )}/>
        </View>
      )
    }
    case 'stillBorn': {
      return (
        <View style={styles.response}>
          <TextField placeholder="Still Born" width="80%" onChangeText={(stillBorn) => mutate(
            ({pregnancy}) => ({pregnancy: {...pregnancy, stillBorn}})
          )}/>
        </View>
      )
    }
  }
}

const HeaderContainer = ({xOffset}) => (
  <View style={styles.headerContainer}>
    <Header title="Pregnancy" light="true" to="/triage/patients/:paitentId"/>
    <Step allSteps={stepList.length-1} step={xOffset/screenWidth} backgroundColor='#fff' highlightColor='#FAEB9A' />
  </View>
)

export default class Pregnancy extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      xOffset:0,
      pregnancy: {
        lastMenstrualPeriodDate: null,
        gestationalAge: '',
        breastFeeding: '',
        contraceptiveUse: '',
        liveBirth: '',
        miscarriage: '',
        abortion: '',
        stillBorn: ''
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
    console.log(this.state.vitals)
  }

  componentDidUpdate() {
    console.log(this.state.pregnancy)
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
              <Response step={step} mutate={this.setState.bind(this)} lmp={this.state.pregnancy.lastMenstrualPeriodDate}/>
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
    backgroundColor: '#9687E3',
  },
  questionContainer:{
    height: '24%',
    backgroundColor: '#9687E3',
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
    height: '52%',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})