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

const stepList = ['drugHistory', 'allergies',];

const Instruction = ({step}) => {
  switch(step) {
    case 'drugHistory': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the </Text>
          <Text style={styles.instruction}>drug history</Text>
          <Text style={styles.instruction}>of the patient</Text>
        </View>
      )
    }
    case 'allergies': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the </Text>
          <Text style={styles.instruction}>allergies</Text>
          <Text style={styles.instruction}>of the patient</Text>
        </View>
      )
    }
  } 
}

const Response = ({step, mutate}) => {
  switch(step) {
    case 'drugHistory': {
      return(
        <View style={{alignItems:'center'}}>
          <TextBox placeholder="Type the drug history details" width="80%" onChangeText={(drugHistory) => mutate(
            ({miscellaneous}) => ({miscellaneous: {...miscellaneous, drugHistory}})
          )} />
        </View>
      )
    }
    case 'allergies': {
      return(
        <View style={{alignItems:'center'}}>
          <TextBox placeholder="Type the allergies details" width="80%" onChangeText={(allergies) => mutate(
            ({miscellaneous}) => ({miscellaneous: {...miscellaneous, allergies}})
          )} />
        </View>
      )
    }
  }
}

const HeaderContainer = ({xOffset, path}) => (
  <View style={styles.headerContainer}>
    <Header title="Miscellaneous" light="true" to={`/triage/patients/${path}`}/>
    <Step allSteps={stepList.length-1} step={xOffset/screenWidth} backgroundColor='#fff' highlightColor='#FAEB9A' />
  </View>
)

export default class Miscellaneous extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      xOffset:0,
      queueId: props.match.params.queueId,
      miscellaneous: {
        drugHistory: '',
        allergies: ''
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
    console.log(this.state.miscellaneous)
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
    backgroundColor: '#FDCA4D',
  },
  questionContainer:{
    height: '24%',
    backgroundColor: '#FDCA4D',
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