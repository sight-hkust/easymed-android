import React, { Component } from 'react'
import { 
  View,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Switch
} from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LinearGradient from 'react-native-linear-gradient';
import { IconButton, Button, KeyboardDismissButton } from '../../../components/Button'
import Icon from 'react-native-fontawesome-pro';
import Modal from 'react-native-modal';
import Spinner from 'react-native-spinkit';
import { TextField, TextBox } from '../../../components/TextField'
import Step from '../../../components/Step'
import BooleanSelect from '../../../components/BooleanSelect';
import Header from '../../../components/Header';
import {updateMedicalCondition} from '../../../actions/record'

const screenWidth = Dimensions.get('window').width

const gradientLayout = {
  colors: ['#E9D9AE','#E1CB90'],
  start: {x: 0.0, y: 1.0},
  end: {x: 1.0, y: 1.0},
  locations: [0, 0.75]
}

const stepList = ['drugHistory', 'familyHistory', 'allergies', 'ROS'];

const Instruction = ({step}) => {
  switch(step) {
    case 'drugHistory': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Drug History</Text>
        </View>
      )
    }
    case 'familyHistory': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Family History</Text>
        </View>
      )
    }
    case 'allergies': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Allergies</Text>
        </View>
      )
    }
    case 'ROS': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>ROS</Text>
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
    case 'familyHistory': {
      return(
        <View style={{alignItems:'center'}}>
          <TextBox placeholder="Type the family history details" width="80%" onChangeText={(familyHistory) => mutate(
            ({miscellaneous}) => ({miscellaneous: {...miscellaneous, familyHistory}})
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
    case 'ROS': {
      return(
        <View style={{alignItems:'center'}}>
          <TextBox placeholder="Type the review of system details" width="80%" onChangeText={(ROS) => mutate(
            ({miscellaneous}) => ({miscellaneous: {...miscellaneous, ROS}})
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

class Miscellaneous extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.updateMedicalCondition = this.props.actions.updateMedicalCondition.bind(this)
    this.state = {
      xOffset:0,
      queueId: props.match.params.queueId,
      isKeyboardPresent: false,
      miscellaneous: {
        drugHistory: '',
        familyHistory: '',
        allergies: '',
        ROS: ''
      }
    }
  }

   handleScroll({nativeEvent: { contentOffset: { x }}}){
     this.setState({ xOffset: x})
     this.refs.responseScroll.scrollTo({x: x, animated:false})
   }

   _keyboardWillShow () {
    this.setState(previousState => ({isKeyboardPresent: true}))
  }

  _keyboardWillHide () {
    this.setState(previousState => ({isKeyboardPresent: false}))
  }

  componentWillMount() {
    StatusBar.setBarStyle('light-content')
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow.bind(this))
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide.bind(this))

  }

  submit() {
    this.updateMedicalCondition(this.state.miscellaneous, this.props.patientId)
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
              {this.state.isKeyboardPresent && <KeyboardDismissButton top={-42} left={8}/>}
            </View>
          ))}
        </ScrollView>

        <View style={{height:'8%'}}>
          {
            this.state.miscellaneous.drugHistory.length > 0 &&
            this.state.miscellaneous.familyHistory.length > 0 &&
            this.state.miscellaneous.allergies.length > 0 &&
            this.state.miscellaneous['ROS'].length > 0 &&
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

const mapStateToProps = (state, props) => ({
  loading: state.records.loading.spinner,
  patientId: state.patients.queue[state.patients.queue.findIndex(({queueId}) => props.match.params.queueId)].patient.id
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({updateMedicalCondition}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Miscellaneous)

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