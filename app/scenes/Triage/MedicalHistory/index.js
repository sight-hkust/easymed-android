import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
  View,
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
import { IconButton, Button } from '../../../components/Button'
import Icon from 'react-native-fontawesome-pro';
import { TextField, TextBox } from '../../../components/TextField'
import Header from '../../../components/Header';

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
    this.state = {
      queueId: props.match.params.queueId,
      medicalHistory: {
        diseases: ['HTN', 'Diabetes', 'TB', 'Asthma', 'HEP-A', 'HEP-B', 'malaria', 'HIV'],
        remarks: ''
      }
    }
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content')
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
              {this.state.medicalHistory.diseases.map((title, i) => <Survey key={i} title={title}/>)}
            </ScrollView>
          </View>
          <View style={{width: Dimensions.get('window').width, alignItems: 'center'}}>
            <TextBox placeholder="Remarks" width="90%"/>
          </View>
          </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => ({
  patientId: state.patients.queue[state.patients.queue.findIndex(({queueId}) => props.match.params.queueId)].patient.id
})

export default connect(mapStateToProps)(MedicalHistory)

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
  }
})