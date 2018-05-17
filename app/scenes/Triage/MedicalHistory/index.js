import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
  View,
  Keyboard,
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
import { IconButton, Button, KeyboardDismissButton } from '../../../components/Button'
import Icon from 'react-native-fontawesome-pro';
import Modal from 'react-native-modal';
import Spinner from 'react-native-spinkit';
import { TextField, TextBox } from '../../../components/TextField'
import Header from '../../../components/Header';
import {updateMedicalHistory} from '../../../actions/record'

const { width, height } = Dimensions.get('window')

class Survey extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: ''
    }
  }

  render() {
    const answers = [
      { value: 'yes', icon: 'check', color: '#40fd65'},
      { value: 'no', icon: 'times', color: '#ff4260'},
      { value: 'unknown', icon: 'question', color: '#ffbd65'}
    ]
    const highlighted = { borderBottomWidth: 2, borderColor: '#1d9dff', borderStyle: 'solid'}
    return (
      <View style={styles.surveyContainer}>
        <Text style={{fontFamily: 'Nunito-Bold', color:'#3c4859'}}>{this.props.title.toUpperCase()}</Text>
        <View style={{flexDirection: 'row', width: '50%', justifyContent:'space-around'}}>
          {answers.map((answer, i) => (<TouchableOpacity 
                                        style={this.state.selected === answer.value?highlighted:{}}
                                        onPress={() => {
                                          this.setState({selected: answer.value})
                                          this.props.onSelect(answer.value)
                                        }}
                                        key={i}
                                       >
                                          <Icon 
                                            name={answer.icon}
                                            color={answer.color}
                                          />
                                       </TouchableOpacity>))}
        </View>
      </View>
    )
  }
}

class MedicalHistory extends Component {
  constructor(props) {
    super(props);
    this.updateMedicalHistory = this.props.actions.updateMedicalHistory.bind(this)
    this.state = {
      queueId: props.match.params.queueId,
      isKeyboardPresent: false,
      medicalHistory: {
        diseases: {
          HTN: '',
          Diabetes: '', 
          TB: '',
          Asthma: '',
          HEPA: '',
          HEPB: '',
          malaria: '',
          HIV: ''
        },
        remarks: ''
      }
    }
  }

  _keyboardWillShow () {
    this.setState(previousState => ({isKeyboardPresent: true}))
  }

  _keyboardWillHide () {
    this.setState(previousState => ({isKeyboardPresent: false}))
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content')
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow.bind(this))
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide.bind(this))
  }

  submit() {
    // console.log(this.state.medicalHistory, this.props.patientId)
    this.updateMedicalHistory(this.state.medicalHistory,this.props.patientId)
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Medical History" to={`/triage/patients/${this.props.match.params.queueId}`}/>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator = {false}
            scrollEventThrottle = {1}
          >
            <View style={{width: Dimensions.get('window').width}}>
              <ScrollView>
                {Object.keys(this.state.medicalHistory.diseases).map((title, i) => <Survey key={i} onSelect={(answer) => {
                  this.setState(({medicalHistory}) => ({medicalHistory: {...medicalHistory, diseases: {...medicalHistory.diseases, [title]: answer}}}))
                }} title={title}/>)}
              </ScrollView>
            </View>
            <View style={{width: Dimensions.get('window').width, alignItems: 'center'}}>
              <TextBox placeholder="Remarks" width="90%" onChangeText={(remarks) => {
                this.setState(({medicalHistory}) => ({medicalHistory: {...medicalHistory, remarks}}))
              }}/>
              {this.state.isKeyboardPresent && <KeyboardDismissButton />}
            </View>
          </ScrollView>
          <View style={{height:'8%'}}>
            {
              this.state.medicalHistory.diseases.HTN.length > 0 &&
              this.state.medicalHistory.diseases.Diabetes.length > 0 &&
              this.state.medicalHistory.diseases.TB.length > 0 &&
              this.state.medicalHistory.diseases.Asthma.length > 0 && 
              this.state.medicalHistory.diseases.HEPA.length > 0 &&
              this.state.medicalHistory.diseases.HEPB.length > 0 &&
              this.state.medicalHistory.diseases.malaria.length > 0 &&
              this.state.medicalHistory.diseases.HIV.length > 0 &&
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
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({updateMedicalHistory}, dispatch)
})

const mapStateToProps = (state, props) => ({
  loading: state.records.loading.spinner,
  patientId: state.patients.queue[state.patients.queue.findIndex(({queueId}) => props.match.params.queueId)].patient.id
})

export default connect(mapStateToProps, mapDispatchToProps)(MedicalHistory)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f6fb',
    paddingTop: '6%',
  },
  surveyContainer:{
    flexDirection: 'row',
    height: height*.08,
    width: width*0.8,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    marginVertical: 10,
    borderRadius: 5,
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 5,
    alignSelf: 'center',
    alignItems: 'center'
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