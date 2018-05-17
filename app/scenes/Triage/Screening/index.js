import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
import LinearGradient from 'react-native-linear-gradient';
import { IconButton, Button, KeyboardDismissButton } from '../../../components/Button'
import Icon from 'react-native-fontawesome-pro';
import Modal from 'react-native-modal';
import Spinner from 'react-native-spinkit';
import {TextField, TextBox} from '../../../components/TextField'
import Step from '../../../components/Step'
import BooleanSelect from '../../../components/BooleanSelect';
import Header from '../../../components/Header';
import { updateScreeningStatus } from '../../../actions/record'

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
          <Text style={styles.instruction}>Tobacco Use?</Text>
        </View>      
      )
    }
    case 'ETOH': {
      return(
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Alchohol Use?</Text>
        </View>      
      )
    }
    case 'drugUse': {
      return(
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Drug Use?</Text>
        </View>      
      )
    }
    case 'otherSH': {
      return(
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Social History?</Text>
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
        <View style={styles.response}>
          <BooleanSelect onSelect={(tobaccoUse) => 
            mutate(
              ({screening}) => ({ screening: { ...screening, tobaccoUse}})
            )
          }/>
        </View>
      )
    }
    case 'ETOH': {
      return(
        <View style={styles.response}>
          <BooleanSelect onSelect={(alchoholUse) => 
            mutate(
              ({screening}) => ({ screening: { ...screening, alchoholUse}})
            )
          }/>
        </View>
      )
    }
    case 'drugUse': {
      return(
        <View style={styles.response}>
          <BooleanSelect onSelect={(drugUse) => 
            mutate(
              ({screening}) => ({ screening: { ...screening, drugUse}})
            )
          }/>
        </View>
      )
    }
    case 'otherSH': {
      return(
        <View style={{alignItems:'center'}}>
          <TextBox placeholder="Type the social history here" width="80%" onChangeText={
            (other) => mutate(
              ({screening}) => ({ screening: { ...screening, other}})
            )
          }/>
        </View>    
      )
    }
  }
}

const HeaderContainer = ({xOffset, path}) => (
  <View style={styles.headerContainer}>
    <Header title="Screening" light="true" to={`/triage/patients/${path}`}/>
    <Step allSteps={stepList.length-1} step={xOffset/screenWidth} backgroundColor='#fff' highlightColor='#FAEB9A' />
  </View>
)

class Screening extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.updateScreeningStatus = this.props.actions.updateScreeningStatus.bind(this)
    isKeyboardPresent: false,
    this.state = {
      xOffset:0,
      queueId: props.match.params.queueId,
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
    this.updateScreeningStatus(this.state.screening, this.props.patientId)
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
          <Button 
              title="Submit" 
              onPress={this.submit.bind(this)} 
              bgColor="#1d9dff" titleColor="#fff" 
              icon="chevron-right"
              width="50%"
              round
            />
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
  actions: bindActionCreators({updateScreeningStatus}, dispatch)
})

const mapStateToProps = (state, props) => ({
  loading: state.records.loading.spinner,
  patientId: state.patients.queue[state.patients.queue.findIndex(({queueId}) => props.match.params.queueId)].patient.id
})

export default connect(mapStateToProps, mapDispatchToProps)(Screening)

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
    backgroundColor: '#34D2C5',
  },
  questionContainer:{
    height: '24%',
    backgroundColor: '#34D2C5',
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