import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-native-modal';
import { fetchPatientList, fetchPatientInQueue } from '../../../actions/patient';
import Header from '../../../components/Header';
import { Button } from '../../../components/Button';
import { PatientListItem, PatientQueueItem } from '../../../components/Patient';

const SelectOperation = ({toggle, addPatient, viewRecord}) => (
  <View style={styles.operations}>
    <Button title="Add patient to queue" titleColor="#3c4859" width="95%" onPress={() => {
      toggle()
    }}/>
    <Button title="View medical records" titleColor="#3c4859" width="95%" onPress={
      () => {
        toggle()
      }
    }/>
    <Button title="Cancel" titleColor="#fff" bgColor="#d27787" onPress={toggle}/>
  </View>
)

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      filter: '',
      isModalPresent: false,
      patientTBA: null
    }
    this.fetchPatientList = props.actions.fetchPatientList
    // this.fetchPatientsInQueue = props.actions.fetchPatientInQueue
  }

  componentWillMount() {
    this.fetchPatientList()
    // this.fetchPatientInQueue()
  }

  toggleOperationSelection() {
    // if(this.state.isModalPresent) {
    //   this.setState({patientTBA: null})
    // }
    this.setState({isModalPresent: !this.state.isModalPresent})
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Search" to="/triage" />
        <ScrollView
          horizontal = {true} 
          pagingEnabled ={true}
        >
          <View style={{width: Dimensions.get('window').width}}>
            <View>
              <Text>Visiting Queue</Text>
            </View>
            {/* <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                />}
            >
              {this.props.patients && this.props.patients.map((patient, i) => (
                <PatientListItem patient={patient} key={i} />
              ))}
            </ScrollView> */}
            <ScrollView>
              {this.props.patients && this.props.patients.map((patient, i) => (
                <PatientQueueItem patient={patient} key={i} to="/triage/patients/test"/>
              ))}
            </ScrollView>
          </View>
          <View style={{width: Dimensions.get('window').width}}>
            <Text>All</Text>
            <ScrollView>
              {this.props.patients && this.props.patients.map((patient, i) => (
                <PatientListItem patient={patient} key={i} onPress={this.toggleOperationSelection.bind(this)} />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
        <Modal isVisible={this.state.isModalPresent}
          backdropOpacity={0}
          style={{height: Dimensions.get('window').height*.5, justifyContent: 'flex-end'}}>
          <SelectOperation
            toggle={this.toggleOperationSelection.bind(this)}
          />
        </Modal>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({fetchPatientList}, dispatch)
})

const mapStateToProps = (state) => ({
  patients: state.patients.patients
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fb',
    paddingTop: '6%',
    justifyContent: 'flex-start',
  },
  operations: {
    backgroundColor: '#fff',
    height: 200,
    width: '100%',
    justifyContent: 'space-around',
    borderRadius: 8,
    shadowColor: '#3a4252',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    margin: 0
  }
})