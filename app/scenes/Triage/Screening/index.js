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
  colors: ['#58DACF','#34D2C5'],
  start: {x: 0.0, y: 1.0},
  end: {x: 1.0, y: 1.0},
  locations: [0, 0.75]
}

const stepList = ['tobacco', 'ETOH', 'drugUse', 'otherSH',];

const Instruction = ({step}) => {
  switch(step) {
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

const SubmitButton = () => (
  <View style={{width:'100%', position:'absolute', top:'100%', zIndex:10}}>
    <Button title="Submit" icon="chevron-right" titleColor="#3c4859" round width="50%"/>
  </View>
)

const Response = ({step, mutate}) => {
  switch(step) {
    case 'tobacco': {
      return(
        <BooleanSelect onSelect={(tobaccoUse) => 
          mutate(
            ({screening}) => ({ screening: { ...screening, tobaccoUse}})
          )
        }/>
      )
    }
    case 'ETOH': {
      return(
        <BooleanSelect onSelect={(alchoholUse) => 
          mutate(
            ({screening}) => ({ screening: { ...screening, alchoholUse}})
          )
        }/>
      )
    }
    case 'drugUse': {
      return(
        <BooleanSelect onSelect={(drugUse) => 
          mutate(
            ({screening}) => ({ screening: { ...screening, drugUse}})
          )
        }/>
      )
    }
    case 'otherSH': {
      return(
        <View style={styles.response}>
          <TextField placeholder="SH" width="80%" onChangeText={
            (other) => mutate(
              ({screening}) => ({ screening: { ...screening, other}})
            )
          }/>
        </View>    
      )
    }
  }
}

const BackgroundInfo = ({xOffset}) => (
    <View style={styles.headerContainer}>
      <LinearGradient style={styles.upper} {...gradientLayout} >
      <Header title="Screening" light="true" to="/triage/patients/:paitentId"/>
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

export default class Screening extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      xOffset:0,
      screening: {
        tobaccoUse: '',
        alchoholUse: '',
        drugUse: '',
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