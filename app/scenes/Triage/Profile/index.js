import React, { Component } from 'react'
import { 
  View,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native'
import { Redirect } from 'react-router-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DropdownAlert from 'react-native-dropdownalert'
import { createPatient, instantiate, queuePatient } from '../../../actions/patient';
import ImagePicker from 'react-native-image-picker';
import Loading from '../../../components/Loading';
import Header from '../../../components/Header';
import { Button } from '../../../components/Button'
import TextField from '../../../components/TextField'
import InfantSelect from '../../../components/InfantSelect';
import Sex from '../../../components/Sex';
import MaritalStatus from '../../../components/MaritalStatus';

const { width, height } = Dimensions.get('window')
const screenWidth = Dimensions.get('window').width

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
          <Text style={styles.instruction}>Is patient an adult?</Text>
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
          <Text style={styles.instruction}>Phone</Text>
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
        <View style={{justifyContent:'flex-start', alignItems:'center', zIndex:0}}>
          <Button 
              title='From camera' 
              bgColor='#19AEFA' titleColor='#fff' 
              icon='camera'
              width='64%'
              onPress= {handleCameraPress}
            />
          <Image
              source={pictureSource?pictureSource:require('../../../../assets/images/imagePlaceHolder.png')}
              style={{resizeMode: 'cover', marginTop:'6%', height:height*.25, width:height*.25, borderRadius:(height*.25)/2, borderColor: '#f5f5f5', borderWidth: 3}}
            />
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
        <View style={styles.response}>
          <TextField 
            placeholder="Days"
            width="80%"
            keyboardType="numeric"
            onChangeText={(day) => {
              mutate(({idob}) => ({idob: {...idob, day}}))
            }}
          />
          <TextField 
            placeholder="Weeks"
            width="80%"
            keyboardType="numeric"
            onChangeText={(week) => {
              mutate(({idob}) => ({idob: {...idob, week:week*7}}))
            }}
          />
          <TextField 
            placeholder="Months"
            width="80%"
            keyboardType="numeric"
            onChangeText={(month) => {
              mutate(({idob}) => ({idob: {...idob, month}}))
            }}
            />
        </View>
      )
    }
    case 'doba': {
      return (
        <View style={styles.response}>
          <TextField 
            placeholder="Age"
            width="80%"
            keyboardType="numeric"
            onChangeText={(age) => {
              mutate( ({profile}) => ({ profile: { ...profile, dob: new Date(`${new Date().getFullYear() - age}-01-01`) }}) )
            }}
          />
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
            }}
          />
        </View>
      )
    }
  }
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      questions: ['photo','tag','name','gender','infant','doba','married','nationality'],
      xOffset: 0,
      idob: { day: 0, week: 0, month: 0 },
      showSubmit: false,
      profile: {
        name: {
          regular: '',
          khmer: ''
        },
        sex: '',
        dob: null,
        status: 'inapplicable',
        nationality: 'Khmer',
      },
      tag: '',
      picture: null,
      picturePath: null,
      options: {
        title: 'Select Picture',
        quality: 1,
        maxWidth: 500,
        maxHeight: 500,
        mediaType: 'photo'
      },
      queueStatus: false,
      dismiss: false
    }
    this.createPatient = props.actions.createPatient
    this.reset = props.actions.instantiate
  }

  handleScroll({nativeEvent: { contentOffset: { x }}}){
    this.setState({ xOffset: x})
    if(x === screenWidth*6 && (this.state.idob.day || this.state.idob.week || this.state.idob.month)){
      let birthday = new Date()
      birthday.setDate(birthday.getDate()-this.state.idob.day?this.state.idob.day:0)
      birthday.setDate(birthday.getDate()-this.state.idob.week?this.state.idob.week:0)
      birthday.setMonth(birthday.getMonth()-this.state.idob.month?this.state.idob.month:0)
      this.setState( ({profile}) => ({ profile: {...profile, dob: birthday} }))
    }
    this.refs.responseScroll.scrollTo({x: x, animated:false})
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.queueId !== nextProps.queueId) {
      console.log(nextProps.queueId)
      this.dropdown.alertWithType('success', 'Success', `New patient's profile has been successfully saved.`)
    }
    if(this.props.error !== nextProps.error) {
      this.dropdown.alertWithType('error', 'Error', `${nextProps.error}`)
    }
  }

  onClose(data) {
    if(data.type === 'success') {
      this.setState({dismiss: true})
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
      if (!response.didCancel && !response.error) {
        const {data, uri} = response
        this.setState(({picture, picturePath}) => ({ picture: data, picturePath: { uri }}))
      }
    })
  }

  submit() {
    const { profile, tag, picture } = this.state
    this.createPatient(profile, tag, picture)
  }

  render() {
    if(this.state.dismiss) {
      console.log(this.props.queueId)
      return <Redirect to={`/triage/patients/${this.props.queueId}`}/>
    }
    else {
      return (
        <KeyboardAvoidingView style={styles.parentContainer}>
          <View style={styles.headerContainer}>
            <Header title="Profile" light="true" to="/triage"/>
          </View>
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
              <View style={{width: screenWidth, justifyContent:'flex-start', paddingHorizontal: 24}} key={i}>
                <Response step={step} mutate={this.setState.bind(this)} pictureSource={this.state.picturePath} handleCameraPress={this.handleCameraPress.bind(this)}/>
              </View>
            ))}
          </ScrollView>

          <View style={{height:'8%'}}>
            {
              this.state.profile.sex.length > 0 &&
              this.state.profile.dob !== null &&
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
          <Loading isLoading={this.props.loading} />
          <DropdownAlert ref={ref => this.dropdown = ref} onClose={data => this.onClose(data)} closeInterval={2500}/>
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-StatusBar.currentHeight,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f6fb',
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
    height: '60%',
    backgroundColor: '#f5f6fb',
    paddingTop: 40,
  },
  textWrapper: {
    paddingHorizontal: 18,
    backgroundColor: 'transparent',
  },
  instruction: {
    fontSize: 26,
    fontFamily: 'Nunito-Bold',
    textAlign: 'left',
    color: '#fff',
  },
  response: {
    alignSelf: 'stretch',
    alignItems: 'center',
  }
})
