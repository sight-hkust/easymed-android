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

const stepList = [
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
];

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

const YesNoUnknownSelect = () => (
  <View style={{...StyleSheet.flatten(styles.response), height: '40%'}}>
    <BooleanSelect title='Yes' icon='check' bgColor='#7BD2A8' color='blue' width='80%'/>
    <BooleanSelect title='No' icon='times' bgColor='#EF8585' color='blue' width='80%' />
    <BooleanSelect title='Unknown' icon='question' bgColor='#F9E397' color='blue' width='80%' />
  </View>
)

const SubmitButton = () => (
  <View style={{width:'100%', position:'absolute', top:'100%', zIndex:10}}>
    <Button title="Submit" icon="chevron-right" titleColor="#3c4859" round width="50%"/>
  </View>
)

const Response = ({step}) => {
  switch(step) {
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
          <SubmitButton />
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

export default class MedicalHistory extends Component {
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
      <KeyboardAvoidingView style={styles.parentContainer}>
        <BackgroundInfo xOffset={this.state.xOffset}/>
        <ScrollList handleScroll={this.handleScroll}/> 
      </KeyboardAvoidingView>
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