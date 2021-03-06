import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-native';
import Modal from 'react-native-modal';
import Spinner from 'react-native-spinkit';
import { transferPatient, tagQueuedPatientLocation } from '../../../actions/patient';
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

const EmptyStub = () => (
  <View style={{justifyContent: 'space-around', alignItems: 'center', width: '80%', alignSelf: 'center'}}>
    <Image style={{width: 160, height: 160}} source={require('../../../../assets/images/empty/completed.png')}/>
    <View>
      <Text style={{fontFamily: 'Quicksand-Bold',fontSize: 20, textAlign: 'center', marginBottom: 12}}>{'All Triage procedures went through'.toUpperCase()}</Text>
      <Text style={{fontFamily: 'Nunito-Medium', textAlign: 'center', color:'#848c9f'}}>You can now check out this patient to the consultation station.</Text>
    </View>
  </View>
)

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      queueId: props.match.params.queueId,
      location: props.location,
      patient: this.props.patient
    }
    this.transferPatient = props.actions.transferPatient.bind(this)
    this.tagQueuedPatientLocation = props.actions.tagQueuedPatientLocation.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.isPatientTransferred !== nextProps.isPatientTransferred) {
      this.setState({dismiss: true})
    }
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content', true)
    this.tagQueuedPatientLocation(this.state.queueId, this.state.location)
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
              .filter(({marker}) => { return this.props.checklist.includes(marker) })
              .map(({destination, icon, color, title}, i) => (
                <Metric
                  to={`/triage/patients/${this.state.queueId}${destination}`}
                  title={title}
                  icon={icon}
                  color={color}
                  key={i}
                />
              ))}
              {
                menuItems.filter(({marker}) => { return this.props.checklist.includes(marker) }).length === 0 &&
                !this.props.checklist.includes('gynaecology') &&
                <EmptyStub />
              }
              {this.state.patient.sex === 'Female' &&
               this.props.checklist.includes('gynaecology') &&
              <Metric title="Maternal"
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
  actions: bindActionCreators({transferPatient, tagQueuedPatientLocation}, dispatch)
})

const mapStateToProps = (state, props) => ({
  loading: state.patients.loading,
  isPatientTransferred: state.patients.queue.hasOwnProperty(props.match.params.queueId) === false,
  location: state.patients.location,
  patient: state.patients.queue[props.match.params.queueId],
  checklist: state.patients.checklist[props.match.params.queueId]
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