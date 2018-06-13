import React, { Component } from 'react';
import { Dimensions, View, Text, StyleSheet, ScrollView, RefreshControl, Image } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-native-modal';
import { fetchPatientList, fetchPatientQueue, resetPatientQueue } from '../../../actions/patient';
import Header from '../../../components/Header';
import Loading from '../../../components/Loading';
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

const EmptyStub = () => (
  <View style={{justifyContent: 'space-around', alignItems: 'center', width: '80%', alignSelf: 'center'}}>
    <Image style={{width: 160, height: 160}} source={require('../../../../assets/images/empty/consultation.png')}/>
    <View>
      <Text style={{fontFamily: 'Quicksand-Bold',fontSize: 20, textAlign: 'center', marginBottom: 12}}>{'no patients found'.toUpperCase()}</Text>
      <Text style={{fontFamily: 'Nunito-Medium', textAlign: 'center', color:'#848c9f'}}>There are currently no patient waiting in line, add a patient to this queue to get started.</Text>
    </View>
  </View>
)

class Admission extends Component {
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

  componentWillReceiveProps(nextProps) {
    if(this.props.error !== nextProps.error) {
      this.dropdown.alertWithType('error', 'Error', `${nextProps.error}`)
    }
  }

  refreshPatientQueue(auto) {
    if (!auto) {
      this.setState({loading: this.props.loading})
    }
    this.fetchPatientQueue('triage')
  }

  toggleOperationSelection() {
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
              {this.props.queue.length === 0 && <EmptyStub />}
              {this.props.queue && Object.keys(this.props.queue).sort( (p,s) => { return this.props.queue[p].tag - this.props.queue[s].tag}).map((queueId, i) => <PatientQueueItem patient={this.props.queue[queueId]} key={i} to={`/triage/patients/${queueId}`}/> )}
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
        <Loading isLoading={this.props.loading.queue} />
        <DropdownAlert ref={ref => this.dropdown = ref} />
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
  loading: state.patients.loading,
  error: state.patients.error
})

export default connect(mapStateToProps, mapDispatchToProps)(Admission)

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