import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
  Alert,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native'
import { Redirect } from 'react-router-native';
import { Button } from '../../../components/Button'
import Icon from 'react-native-fontawesome-pro';
import Loading from '../../../components/Loading'
import { TextBox } from '../../../components/TextField'
import Header from '../../../components/Header';
import {updateMedicalHistory} from '../../../actions/record'
import DropdownAlert from 'react-native-dropdownalert'

const { width, height } = Dimensions.get('window')

class Survey extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: ''
    }
  }

  render() {
    const baseStyle = { width: width*.8/3, height: height*.05, alignItems: 'center', justifyContent: 'center'}
    return (
      <View style={styles.surveyContainer}>
        <Text style={{fontFamily: 'Nunito-Bold', fontSize: 16, color:'#3c4859', alignSelf:'flex-start', paddingTop: 16}}>{this.props.title.toUpperCase()}</Text>
        <View style={{flexDirection: 'row'}}>
        <TouchableOpacity 
          style={{...StyleSheet.flatten(baseStyle), backgroundColor: '#06D6A0', borderBottomLeftRadius: 5}}
          onPress={() => {
            this.setState({selected: 'yes'})
            this.props.onSelect('yes')
          }}
        >
          <Icon name={this.state.selected==='yes'?'check-circle':'check'} color="#fff" type="solid"/>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{...StyleSheet.flatten(baseStyle), backgroundColor: '#EF476F'}}
          onPress={() => {
            this.setState({selected: 'no'})
            this.props.onSelect('no')
          }}
        >
          <Icon name={this.state.selected==='no'?'times-circle':'times'} color="#fff" type="solid"/>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{...StyleSheet.flatten(baseStyle), backgroundColor: '#FFD166', borderBottomRightRadius: 5}}
          onPress={() => {
            this.setState({selected: 'unknown'})
            this.props.onSelect('unknown')
          }}
        >
          <Icon name={this.state.selected==='unknown'?'question-circle':'question'} color="#fff" type="solid"/>
        </TouchableOpacity>
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
      medicalHistory: {
        diseases: {
          hypertension: '',
          diabetes: '', 
          tuberculosis: '',
          asthma: '',
          HEPA: '',
          HEPB: '',
          malaria: '',
          HIV: ''
        },
        remarks: ''
      },
      dismiss: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.hasTaskCompleted !== nextProps.hasTaskCompleted) {
      this.dropdown.alertWithType('success', 'Success', `Patient's medical history has been updated.`)
    }
  }

  onClose(data) {
    if(data.type === 'success') {
      this.setState({dismiss: true})
    }
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content')
  }

  submit() {
    this.updateMedicalHistory(this.state.medicalHistory,this.props.patientId, this.props.match.params.queueId)
  }

  render() {
    if(this.state.dismiss) {
      return <Redirect to={`/triage/patients/${this.props.match.params.queueId}`}/>
    }
    else {
      return (
        <View style={styles.container}>
          <Header title="Medical History" warning callback={()=>{this.setState({dismiss: true})}}/>
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
              <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
                <View style={{width: Dimensions.get('window').width, alignItems: 'center'}}>
                  <TextBox placeholder="Remarks" width="90%" onChangeText={(remarks) => {
                    this.setState(({medicalHistory}) => ({medicalHistory: {...medicalHistory, remarks}}))
                  }}/>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
            <View style={{height:'8%'}}>
              {
                this.state.medicalHistory.diseases.hypertension.length > 0 &&
                this.state.medicalHistory.diseases.diabetes.length > 0 &&
                this.state.medicalHistory.diseases.tuberculosis.length > 0 &&
                this.state.medicalHistory.diseases.asthma.length > 0 && 
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
            <Loading isLoading={this.props.loading}/>
            <DropdownAlert ref={ref => this.dropdown = ref} onClose={data => this.onClose(data)} closeInterval={2500}/>
        </View>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({updateMedicalHistory}, dispatch)
})

const mapStateToProps = (state, props) => ({
  loading: state.records.loading.spinner,
  patientId: state.patients.queue[props.match.params.queueId].id,
  hasTaskCompleted: !state.patients.checklist[props.match.params.queueId].includes('pmh'),
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
    height: height*.12,
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
  }
})