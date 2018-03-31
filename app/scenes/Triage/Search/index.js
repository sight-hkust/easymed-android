import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-native-modal';
import { fetchPatientList, fetchPatientQueue } from '../../../actions/patient';
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
      viewing: 'Queue',
      loading: props.loading,
      query: '',
      filter: '',
      isModalPresent: false,
      patientTBA: null
    }
    this.fetchPatientList = props.actions.fetchPatientList
    this.fetchPatientQueue = props.actions.fetchPatientQueue
  }

  componentWillMount() {
    this.fetchPatientList()
    this.refreshPatientQueue(true)
  }

  refreshPatientQueue(auto) {
    if (!auto) {
      this.setState({loading: this.props.loading})
    }
    this.fetchPatientQueue('triage')
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
        <Header title={this.state.viewing} to="/triage" />
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator = {false}
          scrollEventThrottle = {1}
          onScroll={(event) => event.nativeEvent.contentOffset.x?this.setState({viewing:'All'}):this.setState({viewing: 'Queue'})}
        >
          <View style={{width: Dimensions.get('window').width}}>
            <ScrollView refreshControl={
              <RefreshControl
                refreshing={this.state.loading.queue}
                onRefresh={this.refreshPatientQueue.bind(this)}
              />
            }>
              {this.props.queue && this.props.queue.map(({patient, queueId}, i) => (
                <PatientQueueItem patient={patient} key={i} to={`/triage/patients/${queueId}`}/>
              ))}
            </ScrollView>
          </View>
          <View style={{width: Dimensions.get('window').width}}>
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
  actions: bindActionCreators({fetchPatientList, fetchPatientQueue}, dispatch)
})

const mapStateToProps = (state) => ({
  patients: state.patients.all,
  queue: state.patients.queue,
  loading: state.patients.loading
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