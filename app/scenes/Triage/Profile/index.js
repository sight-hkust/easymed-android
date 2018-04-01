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
import { IconButton, Button } from '../../../components/Button'
import Icon from 'react-native-fontawesome-pro';
import Header from '../../../components/Header';
import TextField from '../../../components/TextField'
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

const stepList = ['name','gender','dob','married','nationalityOccupation','tag'];

const Instruction = ({step}) => {
  switch(step) {
    case 'name': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter both the</Text>
          <Text style={styles.instruction}>NAME and KHMER variant</Text>
          <Text style={styles.instruction}>of patient</Text>
        </View>
      )
    }
    case 'gender': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Identify the patient's</Text>
          <Text style={styles.instruction}>sex using the indicator</Text>
          <Text style={styles.instruction}>below</Text>
        </View>
      )
    }
    case 'dob': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the date of</Text>
          <Text style={styles.instruction}>birth for the patient</Text>
          <Text style={styles.instruction}>AGE</Text>
        </View>
      )
    }
    case 'married': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Choose the indicator</Text>
          <Text style={styles.instruction}>to represents patient's</Text>
          <Text style={styles.instruction}>Marital Status</Text>
        </View>
      )
    }
    case 'nationalityOccupation': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Indicate the nationality</Text>
          <Text style={styles.instruction}>of the patient</Text>
          <Text style={styles.instruction}>below</Text>
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
          <Text style={styles.instruction}>Enter a tag number</Text>
          <Text style={styles.instruction}>for identifying</Text>
          <Text style={styles.instruction}>the patient</Text>
        </View>
      )
    }
  }
}

const Response = ({step, mutate, dob}) => {
  switch(step) {
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
    case 'dob': {
      return (
        <View style={{height:'48%', justifyContent: 'space-between'}}>
          <Birthday onSelect={(dob) =>
            mutate( ({profile}) => ({ profile: { ...profile, dob }}) )
          }/>
          <View style={{backgroundColor:'#fff', marginTop:24, borderRadius:5, height:52, width:'80%', alignSelf:'center', alignItems:'center', justifyContent:'center', shadowColor: '#e4e4e4', shadowOpacity: 0.5, shadowOffset: { width: 1, height: 3 }, shadowRadius: 5}}>
            <Text style={{fontFamily:'Quicksand-Medium', color:dob?'#3c4859':'#A8B0CE', fontSize:18}}>
              {dob?dob.toDateString():'Date of Birth'}
            </Text>
          </View>
        </View>
      )
    }
    case 'married': {
      return (
        <View style={{height: '92%'}}>
          <MaritalStatus onSelect={(status) => mutate(
            ({profile}) => ({ profile: { ...profile, status }})
          )} />
        </View>
      )
    }
    case 'nationalityOccupation': {
      return (
        <View style={styles.response}>
          <TextField
            placeholder="Nationality"
            width="80%"
            onChangeText={(nationality) =>
              mutate(
                ({profile}) => ({ profile: { ...profile, nationality }})
              )
          }/>
          {/* <TextField
            placeholder="Occupation"
            width="80%"
            onChangeText={(occupation) =>
              mutate(
                ({profile}) => ({ profile: { ...profile, occupation }})
              )
          }/> */}
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
            onChangeText={(tag) => mutate({tag})}
          />
        </View>
      )
    }
  }
}

const HeaderContainer = ({xOffset}) => (
  <View style={styles.headerContainer}>
    <Header title="Profile" light="true" to="/triage"/>
    <Step allSteps={stepList.length-1} step={xOffset/screenWidth} backgroundColor='#fff' highlightColor='#FAEB9A' />
  </View>
)
class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      xOffset:0,
      profile: {
        name: {
          regular: '',
          khmer: ''
        },
        sex: '',
        dob: null,
        status: '',
        nationality: ''
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
        <KeyboardAvoidingView style={styles.parentContainer} behavior="position">
          <HeaderContainer xOffset={this.state.xOffset}/>
          <ScrollView 
            ref = 'questionScroll'
            horizontal
            pagingEnabled
            onScroll={this.handleScroll}
            scrollEventThrottle={1}
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
                <Response step={step} mutate={this.setState.bind(this)} dob={this.state.profile.dob}/>
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
    height: '24%',
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
    justifyContent: 'space-between'
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