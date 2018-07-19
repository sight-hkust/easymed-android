import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { transferPatient, tagQueuedPatientLocation } from '../../../actions/patient';
import Header from '../../../components/Header';
import { Button } from '../../../components/Button'
import Loading from '../../../components/Loading'

const menuItems = [
  {
    icon: 'heartbeat',
    color: '#ef798a',
    title: 'Vitals',
    marker: 'vitals',
    routeName: 'Vitals'
  },
  {
    icon: 'clipboard-list',
    color: '#f99945',
    title: 'Chief Complaints',
    marker: 'cc'
  },
  {
    icon: 'procedures',
    color: '#ffcb2f',
    routeName: 'Previous Medical History',
    marker: 'pmh'
  },
  {
    destination: '/screening',
    icon: 'diagnoses',
    color: '#49e5aa',
    routeName: 'Screening',
    marker: 'screening'
  },
  {
    icon: 'allergies',
    color: '#7d82b8',
    routeName: 'Miscellaneous',
    marker: 'misc'
  }
]


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
      queueId: props.navigation.getParam('queueId', 'NO-ID'),
      location: props.location,
      patient: this.props.patient
    }
    console.log(props)
    this.transferPatient = props.actions.transferPatient.bind(this)
    this.tagQueuedPatientLocation = props.actions.tagQueuedPatientLocation.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if(this.props.isPatientTransferred !== nextProps.isPatientTransferred) {
      this.props.navigation.goBack()
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
    return (
      <View style={styles.container}>
        <Header title="Add Records"/>
        {/* <ScrollView>
          {menuItems
          .filter(({marker}) => { return this.props.checklist.includes(marker) })
          .map(({icon, color, title}, i) => (
            <Metric
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
          />}
        </ScrollView> */}
        <Button 
              title="Checkout"
              bgColor="#1d9dff"
              titleColor="#fff"
              icon="check"
              width="50%"
              onPress={this.transfer.bind(this)}
              round
            />
        <Loading isLoading={this.props.loading.spinner}/>
        </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({transferPatient, tagQueuedPatientLocation}, dispatch)
})

const mapStateToProps = (state, props) => ({
  loading: state.patients.loading,
  isPatientTransferred: state.patients.queue.hasOwnProperty(props.navigation.getParam('queueId', 'NO-ID')) === false,
  location: state.patients.location,
  patient: state.patients.queue[props.navigation.getParam('queueId', 'NO-ID')],
  checklist: state.patients.checklist[props.navigation.getParam('queueId', 'NO-ID')]
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fb',
    paddingVertical: '6%',
    justifyContent: 'space-between',
  }
});