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
import TextField from '../../../components/TextField'
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

const stepList = ['HTN', 'DM', 'TB', 'asthma', 'hepatitisABC', 'malaria', 'HIV','otherPMH',];

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
        <BooleanSelect onSelect={(hypertension) =>
          mutate( ({medicalHistory}) => ({ medicalHistory: { ...medicalHistory, hypertension }}) )
        }/>
      )
    }
    case 'DM': {
      return(
        <BooleanSelect onSelect={(diabetes) =>
          mutate( ({medicalHistory}) => ({ medicalHistory: { ...medicalHistory, diabetes }}) )
        }/>
      )
    }
    case 'TB': {
      return(
        <BooleanSelect onSelect={(tuberculosis) =>
          mutate( ({medicalHistory}) => ({ medicalHistory: { ...medicalHistory, tuberculosis }}) )
        }/>
      )
    }
    case 'asthma': {
      return(
        <BooleanSelect onSelect={(asthma) =>
          mutate( ({medicalHistory}) => ({ medicalHistory: { ...medicalHistory, asthma }}) )
        }/>
      )
    }
    case 'hepatitisABC': {
      return(
        <BooleanSelect onSelect={(hepatitis) =>
          mutate( ({medicalHistory}) => ({ medicalHistory: { ...medicalHistory, hepatitis }}) )
        }/>
      )
    }
    case 'malaria': {
      return(
        <BooleanSelect onSelect={(malaria) =>
          mutate( ({medicalHistory}) => ({ medicalHistory: { ...medicalHistory, malaria }}) )
        }/>
      )
    }
    case 'HIV': {
      return(
        <BooleanSelect onSelect={(HIV) =>
          mutate( ({medicalHistory}) => ({ medicalHistory: { ...medicalHistory, HIV }}) )
        }/>
      )
    }
    case 'otherPMH': {
      return(
        <View style={styles.response}>
          <TextField placeholder="PMH" width="80%" onChangeText={(other) => mutate(
            ({medicalHistory}) => ({medicalHistory: {...medicalHistory, other}})
          )} />
        </View>
      )
    }
  }
}

const BackgroundInfo = ({xOffset}) => (
    <View style={styles.headerContainer}>
      <LinearGradient style={styles.upper} {...gradientLayout} >
        <Header title="Medical History" light="true" to="/triage/patients/:paitentId"/>
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
        other: ''
      }
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
      <KeyboardAvoidingView style={styles.parentContainer}>
        <BackgroundInfo xOffset={this.state.xOffset}/>
        <ScrollList handleScroll={this.handleScroll} mutate={this.setState.bind(this)}/> 
        <Button 
            title="Submit"
            bgColor="#1d9dff" titleColor="#fff" 
            icon="chevron-right"
            width="50%"
            round
          />
      </KeyboardAvoidingView>
    )
  }
}

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
})