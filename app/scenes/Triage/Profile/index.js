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
import LinearGradient from 'react-native-linear-gradient';
import { IconButton, Button } from '../../../components/Button'
import Icon from 'react-native-fontawesome-pro';
import Header from '../../../components/Header';
import TextField from '../../../components/TextField'
import Step from '../../../components/Step'
import Segment from '../../../components/Segment'

const screenWidth = Dimensions.get('window').width

const gradientLayout = {
  colors: ['#19AEFA','#1D9DFF'],
  start: {x: 0.0, y: 1.0},
  end: {x: 1.0, y: 1.0},
  locations: [0, 0.75]
}

const stepList = [
  {
    step: 'name',
  },
  {
    step: 'gender',
  },
  {
    step: 'dob',
  },
  {
    step: 'married',
  },
  {
    step: 'nationalityOccupation',
  },
  {
    step: 'address'
  },
  {
    step: 'contact',
  }
];

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
          <Text style={styles.instruction}>Enter the nationality</Text>
          <Text style={styles.instruction}>and occupation of</Text>
          <Text style={styles.instruction}>the patient</Text>
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
  }
}

const GenderSelect = () => (
  <View style={{width: '70%', flexDirection: 'row', justifyContent: 'space-around'}}>
    <TouchableOpacity style={styles.gender}>
      <Icon name="venus" size={44} color="#ff5273"/>
      <Text style={styles.genderText}>Female</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.gender}>
      <Icon name="mars" size={44} color="#4c79fc"/>
      <Text style={styles.genderText}>Male</Text>
    </TouchableOpacity>
  </View>
)

const MaritalStatusSelect = () => (
  <View style={{justifyContent: 'space-around', alignItems: 'center', height: '100%'}}>
    <TouchableOpacity style={styles.maritalStatus}>
      <Text style={styles.maritalStatusText}>MARRIED</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.maritalStatus}>
      <Text style={styles.maritalStatusText}>DIVORCED</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.maritalStatus}>
      <Text style={styles.maritalStatusText}>WIDOWED</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.maritalStatus}>
      <Text style={styles.maritalStatusText}>SINGLE</Text>
    </TouchableOpacity>
  </View>
)

const Response = ({step, mutate}) => {
  switch(step) {
    case 'name': {
      return (
        <View style={styles.response}>
          <TextField placeholder="Name" width="80%" onChangeText={(regular) => 
            mutate(
              ({profile}) => ({ profile: { ...profile, name: { ...profile.name, regular } }})
            )
          }/>
          <TextField placeholder="Khmer Name" width="80%" onChangeText={(khmer) =>
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
          <GenderSelect />
        </View>
      )
    }
    case 'dob': {
      return (
        <Segment/>
      )
    }
    case 'married': {
      return (
        <View style={{marginTop: 16, height: '40%'}}>
          <MaritalStatusSelect />
        </View>
      )
    }
    case 'nationalityOccupation': {
      return (
        <View style={styles.response}>
          <TextField placeholder="Nationality" width="80%"/>
          <TextField placeholder="Occupation" width="80%"/>
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
          <TextField placeholder="Contact Number" width="80%" keyboardType="numeric"/>
          <SubmitButton />
        </View>
      )
    }
  }
}

const SubmitButton = () => (
  <View style={{width:'100%', position:'absolute', bottom:'-24%' , zIndex:10}}>
    <Button title="Submit" icon="chevron-right" round width="50%"/>
  </View>
)

const BackgroundInfo = ({xOffset}) => (
    <View style={styles.headerContainer}>
      <LinearGradient style={styles.upper} {...gradientLayout} >
        <Header title="Profile" light to="/triage"/>
        <Step allSteps={6} step={xOffset/screenWidth} backgroundColor='#fff' highlightColor='pink' />
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
      {stepList.map(({step, stepNum}, i) => (
        <ScrollItem key={i} step={step} mutate={mutate}/>
      ))}
    </ScrollView>
  )
};

export default class Profile extends Component {
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
        occuppation: '',
        nationality: '',
        address: '',
        contact: ''
      }
    }
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
  header: {
    flexDirection: 'row',
    height: 44,
    justifyContent: 'space-between',
    marginBottom: 32,
    alignItems: 'center'
  },
  headerText: {
    fontSize: 36,
    fontFamily: 'Nunito-Bold',
    textAlign: 'right',
    backgroundColor: '#fff0',
    color: '#fff',
    marginRight: 20,
    marginTop: 32,
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
  maritalStatus: {
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
  maritalStatusText: {
    fontSize: 22,
    fontFamily: 'Nunito-Bold',
    color: '#3c4859',
    marginLeft: 12
  },
  footer: {
    marginTop: 18
  }
})