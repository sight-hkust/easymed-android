import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-native';
import Modal from 'react-native-modal';
import Spinner from 'react-native-spinkit';
import { transferPatient } from '../../../actions/patient';
import Header from '../../../components/Header';
import Icon from 'react-native-fontawesome-pro';
import { Button } from '../../../components/Button'

const menuItems = [
  {
    destination: '/vitals',
    icon: 'heartbeat',
    color: '#ef798a',
    title: 'Vitals',
    marker: 'vitals'
  },
  {
    destination: '/cheifcomplaints',
    icon: 'clipboard-list',
    color: '#f99945',
    title: 'Chief Complaints',
    marker: 'cc'
  },
  {
    destination: '/history',
    icon: 'procedures',
    color: '#ffcb2f',
    title: 'Previous Medical History',
    marker: 'pmh'
  },
  {
    destination: '/screening',
    icon: 'diagnoses',
    color: '#49e5aa',
    title: 'Screening',
    marker: 'screening'
  },
  {
    destination: '/miscellaneous',
    icon: 'allergies',
    color: '#7d82b8',
    title: 'Miscellaneous',
    marker: 'misc'
  }
]

const Metric = ({to, icon, color, title}) => (
  <Link style={{...StyleSheet.flatten(styles.menuItem), borderLeftColor: color}} to={to} component={TouchableOpacity} activeOpacity={0.25}>
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <Icon name={`${icon}`} size={20} type="solid" color={`${color}`}/>
      <Text style={styles.text}>{title}</Text>
    </View>
  </Link>
)

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      queueId: props.match.params.queueId,
      patient: this.props.patient.patient,
      checklist: this.props.patient.checklist
    }
    this.transferPatient = props.actions.transferPatient.bind(this)
    // this.fetchMedicalRecords = props.actions.fetchMedicalRecords.bind(this)
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content', true)
  }
  componentDidMount() {
    console.log(this.state.checklist)
  }

  transfer() {
    this.transferPatient(this.state.queueId, 'consultation')
  }

  render() {
    if(this.props.isPatientTransferred) {
      return <Redirect to="/triage/patients/admission"/>
    }
    else {
      return (
        <View style={styles.container}>
            <Header title="Add Records" to="/triage/patients/admission"/>
            <ScrollView>
              {menuItems
              .filter(({marker}) => { return this.state.checklist[marker]===false })
              .map(({destination, icon, color, title}, i) => (
                <Metric
                  to={`/triage/patients/${this.state.queueId}${destination}`}
                  title={title}
                  icon={icon}
                  color={color}
                  key={i}
                />
              ))}
              {this.state.patient.sex === 'Female' && <Metric title="Maternal"
                                                              icon="female"
                                                              color="#f4649e"
                                                              to={`/triage/patients/${this.state.queueId}/maternal`}
              />}
            </ScrollView>
            <Button 
                  title="Checkout"
                  bgColor="#1d9dff"
                  titleColor="#fff"
                  icon="check"
                  width="50%"
                  onPress={this.transfer.bind(this)}
                  round
                />
            <Modal
              isVisible={this.props.loading.spinner}
              animationIn="fadeIn"
              backdropOpacity={0}
              style={{justifyContent: 'center'}}
            >
              <View style={styles.loading}>
                <Spinner
                isVisible={this.props.loading.spinner}
                size={44}
                style={{alignSelf: 'center'}}
                type='WanderingCubes' 
                color='#81e2d9'/>
              </View>
            </Modal>
          </View>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({transferPatient}, dispatch)
})

const mapStateToProps = (state, props) => ({
  loading: state.patients.loading,
  queue: state.patients.queue,
  isPatientTransferred: state.patients.queue.findIndex(({queueId}) => props.match.params.queueId) === -1,
  patient: state.patients.queue[state.patients.queue.findIndex(({queueId}) => props.match.params.queueId === queueId)]
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fb',
    paddingVertical: '6%',
    justifyContent: 'space-between',
  },
  menuItem: {
    flexDirection: 'row',
    borderRadius: 6,
    backgroundColor: '#fff',
    height: 56,
    width: '82%',
    alignSelf: 'center',
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.7,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 8,
    marginVertical: 10,
    borderStyle: 'solid',
    borderLeftWidth: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8
  },
  text: {
    fontFamily: 'Nunito-Bold',
    color: '#3c4859',
    fontSize: 16,
    marginLeft: 8
  }
});