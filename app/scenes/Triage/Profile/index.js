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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createPatient } from '../../../actions/patient';
import LinearGradient from 'react-native-linear-gradient';
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

const Response = ({step, mutate, submit, profile}) => {
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
        <Birthday onSelect={(dob) =>
          mutate( ({profile}) => ({ profile: { ...profile, dob }}) )
        }/>
      )
    }
    case 'married': {
      return (
        <View style={{marginTop: 16, height: '40%'}}>
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
          <SubmitButton onPress={submit(profile)}/>
        </View>
      )
    }
  }
}

const SubmitButton = (onPress) => (
  <View style={{width:'100%', position:'absolute', bottom:'-24%' , zIndex:10}}>
    <Button title="Submit" onPress={onPress} bgColor="#1d9dff" titleColor="#fff" icon="chevron-right" round width="50%"/>
  </View>
)

const BackgroundInfo = ({xOffset}) => (
    <View style={styles.headerContainer}>
      <LinearGradient style={styles.upper} {...gradientLayout} >
        <Header title="Profile" light to="/triage"/>
        <Step allSteps={stepList.length-1} step={xOffset/width} backgroundColor='#fff' highlightColor='pink' />
      </LinearGradient>
    </View>
)

const ScrollItem = ({step, mutate, submit, profile}) => (
  <View style={{width}}>
    <Instruction step={step}/>
    <Response step={step} mutate={mutate} submit={submit} profile={profile}/>
  </View>
)

const ScrollList = ({handleScroll, scrollViewDidChange, mutate, submit, profile}) => {
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
        <ScrollItem key={i} step={step} mutate={mutate} submit={submit} profile={profile}/>
      ))}
    </ScrollView>
  )
};

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
      tag: ''
    }
    this.createPatient = props.createPatient.bind(this)
  }

  handleScroll({nativeEvent: { contentOffset: { x }}}){
    this.setState({ xOffset: x})
  }

  componentWillMount() {
    StatusBar.setBarStyle('light-content', true)
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.parentContainer}>
        <BackgroundInfo xOffset={this.state.xOffset}/>
        <ScrollList handleScroll={this.handleScroll} mutate={this.setState.bind(this)} submit={this.createPatient} profile={this.state.profile}/> 
      </KeyboardAvoidingView>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({createPatient}, dispatch)
})

const mapStateToProps = (state) => ({
  loading: state.patient.loading,
  success: state.patient.success
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

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
    top: height*.2,
    height,
    paddingTop: 16,
  },
  upper: {
    height: height*.45,
    paddingTop: height*.06,
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
  footer: {
    marginTop: 18
  }
})