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
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { IconButton, Button, KeyboardDismissButton } from '../../../components/Button'
import Icon from 'react-native-fontawesome-pro';
import Modal from 'react-native-modal';
import Spinner from 'react-native-spinkit';
import { TextField, TextBox } from '../../../components/TextField';
import Step from '../../../components/Step';
import BooleanSelect from '../../../components/BooleanSelect';
import Header from '../../../components/Header';
import { addChiefComplaints } from '../../../actions/record';

const screenWidth = Dimensions.get('window').width

const gradientLayout = {
  colors: ['#E9D9AE','#E1CB90'],
  start: {x: 0.0, y: 1.0},
  end: {x: 1.0, y: 1.0},
  locations: [0, 0.75]
}

const stepList = ['cheifComplaints'];

const Instruction = ({step}) => {
  switch(step) {
    case 'cheifComplaints': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Cheif Complaints</Text>
        </View>
      )
    }
  } 
}

const Response = ({step, mutate}) => {
  switch(step) {
    case 'cheifComplaints': {
      return(
        <View style={{alignItems:'center'}}>
          <TextBox placeholder="Type the chief complaints details" width="80%" onChangeText={(cheifComplaints) => mutate(
            ({cheifComplaints})
          )} />
        </View>
      )
    }
  }
}

const HeaderContainer = ({xOffset, path}) => (
  <View style={styles.headerContainer}>
    <Header title="Cheif Complaints" light="true" to={`/triage/patients/${path}`}/>
    <Step allSteps={stepList.length-1} step={xOffset/screenWidth} backgroundColor='#fff' highlightColor='#FAEB9A' />
  </View>
)

class ChiefComplaints extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.addChiefComplaints = this.props.actions.addChiefComplaints.bind(this)
    this.state = {
      xOffset:0,
      isKeyboardPresent: false,
      queueId: props.match.params.queueId,
      cheifComplaints: ''
    }
  }

  _keyboardWillShow () {
    this.setState(previousState => ({isKeyboardPresent: true}))
  }

  _keyboardWillHide () {
    this.setState(previousState => ({isKeyboardPresent: false}))
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

  submit() {
    this.addChiefComplaints(this.state.cheifComplaints, this.state.queueId)
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
            this.state.cheifComplaints.length > 0 &&
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
  actions: bindActionCreators({ addChiefComplaints }, dispatch)
})

const mapStateToProps = (state) => ({
  loading: state.records.loading.spinner
})

export default connect(mapStateToProps,mapDispatchToProps)(ChiefComplaints)

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