import React, { Component } from 'react'
import { 
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Switch 
} from 'react-native'
import { Redirect } from 'react-router-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPatient, instantiate, queuePatient } from '../../../actions/patient';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import Spinner from 'react-native-spinkit';
import Icon from 'react-native-fontawesome-pro';
import ImagePicker from 'react-native-image-picker';
import Header from '../../../components/Header';
import { IconButton, Button } from '../../../components/Button'
import TextField from '../../../components/TextField'
import InfantSelect from '../../../components/InfantSelect';
import Step from '../../../components/Step'
import Segment from '../../../components/Segment'
import Sex from '../../../components/Sex';
import MaritalStatus from '../../../components/MaritalStatus';
import Birthday from '../../../components/Birthday';

const { width, height } = Dimensions.get('window')
const screenWidth = Dimensions.get('window').width

const gradientLayout = {
  colors: ['#19AEFA','#1D9DFF'],
  start: {x: 0.0, y: 1.0},
  end: {x: 1.0, y: 1.0},
  locations: [0, 0.75]
}

const Instruction = ({step}) => {
  switch(step) {
    case 'photo': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Take a picture of patient</Text>
        </View>
      )
    }
    case 'name': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Patient Name</Text>
        </View>
      )
    }
    case 'gender': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Sex</Text>
        </View>
      )
    }
    case 'infant': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Is patient an infant?</Text>
          <Text style={styles.instruction}>{'(< 24 months old)'}</Text>
        </View>
      )
    }
    case 'doba': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Age</Text>
        </View>
      )
    }
    case 'dobi': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Age</Text>
        </View>
      )
    }
    case 'married': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Marital Status</Text>
        </View>
      )
    }
    case 'nationality': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Nationality</Text>
        </View>
      )
    }
    case 'address': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the address</Text>
          <Text style={styles.instruction}>of the patient</Text>
          <Text style={styles.instruction}>Village and Province </Text>
        </View>
      )
    }
    case 'contact': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the</Text>
          <Text style={styles.instruction}>Contact number</Text>
          <Text style={styles.instruction}>of the patient</Text>
        </View>
      )
    }
    case 'tag': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Tag number</Text>
        </View>
      )
    }
  }
}

const Response = ({step, mutate, handleCameraPress, pictureSource}) => {
  switch(step) {
    case 'photo': {
      return (
        <View style={{width:screenWidth, justifyContent:'flex-start'}}>
          <View style={{width:screenWidth, justifyContent:'flex-start', alignItems:'center', zIndex:0}}>
            <Button 
                title='From camera' 
                bgColor='#19AEFA' titleColor='#fff' 
                icon='camera'
                width='64%'
                onPress= {handleCameraPress}
              />
            <Image
                source={pictureSource?pictureSource:require('../../../../assets/images/imagePlaceHolder.png')}
                style={{marginTop:'6%', height:height*.25, width:height*.25, borderRadius:(height*.25)/2, borderColor: '#f5f5f5', borderWidth: 3}}
              />
          </View>
        </View>
      )
    }
    case 'name': {
      return (
        <View style={styles.response}>
          <TextField
            placeholder="Name"
            width="80%"
            onChangeText={(regular) => 
              mutate(
                ({profile}) => ({ profile: { ...profile, name: { ...profile.name, regular } }})
              )
          }/>
          <TextField
            placeholder="Khmer Name"
            width="80%"
            onChangeText={(khmer) =>
              mutate(
                ({profile}) => ({ profile: { ...profile, name: {...profile.name, khmer} }})
              )
          }/>
        </View>
      )
    }
    case 'gender': {
      return (
        <View style={styles.response}>
          <Sex onSelect={(sex) => mutate(
            ({profile}) => ({ profile: { ...profile, sex }})
          )}/>
        </View>
      )
    }
    case 'infant': {
      return (
        <View style={styles.response}>
          <InfantSelect onSelect={(answer) => mutate({questions: answer==='Infant'?
          ['photo','tag','name','gender','infant','dobi','nationality']:
          ['photo','tag','name','gender','infant','doba','married','nationality']
          })} />
        </View>
      )
    }
    case 'dobi': {
      return (
        <View style={{...StyleSheet.flatten(styles.response), height: '36%'}}>
          <TextField placeholder="Days" width="80%"/>
          <TextField placeholder="Weeks" width="80%"/>
          <TextField placeholder="Months" width="80%"/>
        </View>
      )
    }
    case 'doba': {
      return (
        <View style={{height:'48%', justifyContent: 'space-between'}}>
          <Birthday onSelect={(dob) =>
            mutate( ({profile}) => ({ profile: { ...profile, dob }}) )
          }/>
        </View>
      )
    }
    case 'married': {
      return (
        <View style={{height: height*.28}}>
          <MaritalStatus onSelect={(status) => mutate(
            ({profile}) => ({ profile: { ...profile, status }})
          )} />
        </View>
      )
    }
    case 'nationality': {
      return (
        <View style={styles.response}>
          <TextField
            placeholder="Nationality"
            width="80%"
            value="Khmer"
            onChangeText={(nationality) =>
              mutate(
                ({profile}) => ({ profile: { ...profile, nationality }})
              )
          }/>
        </View>
      )
    }
    case 'address': {
      return (
        <View style={{...StyleSheet.flatten(styles.response), height: '36%'}}>
          <TextField placeholder="Village name" width="80%"/>
          <TextField placeholder="Province name" width="80%"/>
          <TextField placeholder="Postcode" width="80%"/>
        </View>
      )
    }
    case 'contact': {
      return(
        <View style={styles.response}>
          <TextField
            placeholder="Contact Number"
            width="80%"
            keyboardType="numeric"
          />
        </View>
      )
    }
    case 'tag': {
      return(
        <View style={styles.response}>
          <TextField
            placeholder="Tag Number"
            width="80%"
            keyboardType="numeric"
            onChangeText={(tag) => {
              mutate({tag})
              mutate({showSubmit: true})
            }}
          />
        </View>
      )
    }
  }
}

const HeaderContainer = ({xOffset, stepsLength}) => (
  <View style={styles.headerContainer}>
    <Header title="Profile" light="true" to="/triage"/>
    <Step allSteps={stepsLength} step={xOffset/screenWidth} backgroundColor='#fff' highlightColor='#FAEB9A' />
  </View>
)
class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      questions: ['photo','tag','name','gender','infant','doba','married','nationality'],
      xOffset:0,
      showSubmit: false,
      profile: {
        name: {
          regular: '',
          khmer: ''
        },
        sex: '',
        dob: null,
        status: 'inapplicable',
        nationality: 'Khmer'
      },
      tag: '',
      queueStatus: false
    }
    this.createPatient = props.actions.createPatient
    this.queuePatient = props.actions.queuePatient
    this.reset = props.actions.instantiate
  }

  handleScroll({nativeEvent: { contentOffset: { x }}}){
    this.setState({ xOffset: x})
    this.refs.responseScroll.scrollTo({x: x, animated:false})
  }

  componentDidUpdate() {
    if(this.props.patientId && !this.state.queueStatus) {
      this.setState({queueStatus: true})
      this.queuePatient(this.state.tag, this.props.patientId, 'triage')
    }
  }

  componentWillUnmount() {
    this.reset()
  }

  componentWillMount() {
    StatusBar.setBarStyle('light-content', true)
  }

  handleCameraPress(){
    ImagePicker.showImagePicker(this.state.options, (response) => {
      console.log('Response = ', response)
    
      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      }
      else {
        let source = { uri: response.uri }
        this.setState({pictureSource: source})
      }
    })
  }

  submit() {
    const { profile, tag } = this.state
    this.createPatient(profile, tag)
  }

  render() {
    if(this.props.queueId) {
      return <Redirect to={`/triage/patients/${this.props.queueId}`}/>
    }
    else {
      return (
        <KeyboardAvoidingView style={styles.parentContainer}>
          <HeaderContainer xOffset={this.state.xOffset} stepsLength={this.state.questions.length-1}/>
          <ScrollView 
            ref = 'questionScroll'
            horizontal
            pagingEnabled
            onScroll={this.handleScroll}
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator = {false}
            style={styles.questionContainer}
            >
            {this.state.questions.map((step, i) => (
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
            {this.state.questions.map((step, i) => (
              <View style={{width: screenWidth, justifyContent:'flex-start'}} key={i}>
                <Response step={step} mutate={this.setState.bind(this)} dob={this.state.profile.dob}/>
              </View>
            ))}
          </ScrollView>

          <View style={{height:'8%'}}>
            {this.state.showSubmit && <Button 
                  title="Submit" 
                  onPress={this.submit.bind(this)} 
                  bgColor="#1d9dff" titleColor="#fff" 
                  icon="chevron-right"
                  width="50%"
                  round
                />}
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
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({createPatient, queuePatient, instantiate}, dispatch)
})

const mapStateToProps = (state) => ({
  loading: state.profile.loading,
  patientId: state.profile.patientId,
  queueId: state.profile.queueId
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

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
    backgroundColor: '#1D9DFF',
  },
  questionContainer:{
    height: '10%',
    backgroundColor: '#1D9DFF',
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
    alignItems: 'center',
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