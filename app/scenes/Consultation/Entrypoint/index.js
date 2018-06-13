import React, { Component } from 'react';
import { View, Image, ScrollView, StatusBar, StyleSheet, RefreshControl, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Loading from '../../../components/Loading';
import { bindActionCreators } from 'redux';
import { fetchPatientQueue, resetPatientQueue } from '../../../actions/patient';
import { IconButton } from '../../../components/Button'
import Icon from 'react-native-fontawesome-pro';
import Header from '../../../components/Header'
import { PatientQueueItem as Patient } from '../../../components/Patient'

const Toolbar = () => (
  <View style={styles.toolbar}>
    <IconButton name="search" color="#3c4859" size={22}/>
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

const ServiceQueue = ({queue, isLoading, onRefresh}) => {
  return (
    <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh}/>}>
      {Object.keys(queue).length === 0 && <EmptyStub />}
      {Object.keys(queue)
        .sort( (p,s) => { return queue[p].tag - queue[s].tag})
        .map(queueId => (
        <Patient
          patient={queue[queueId]}
          to={`/consultation/patients/${queueId}`}
          key={queueId} />
      ))}
    </ScrollView>
  )
}

class Entrypoint extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: props.loading
    }
    this.fetchPatientQueue = props.actions.fetchPatientQueue
    this.resetPatientQueue = props.actions.resetPatientQueue
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.queue !== nextProps.queue) {
      console.log(nextProps.queue)
    }
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content', true)
    this.refreshPatientQueue(true)
  }

  componentWillUnmount() {
    this.resetPatientQueue()
  }

  refreshPatientQueue(auto) {
    if (!auto) {
      this.setState({loading: this.props.loading})
    }
    this.fetchPatientQueue('consultation')
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Consultation" />
        <Toolbar />
        <ServiceQueue queue={this.props.queue} isLoading={this.state.loading.queue} onRefresh={this.refreshPatientQueue.bind(this)} />
        <Loading isLoading={this.props.loading.queue}/>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({fetchPatientQueue, resetPatientQueue}, dispatch)
})

const mapStateToProps = (state) => ({
  queue: state.patients.queue,
  loading: state.patients.loading
})

export default connect(mapStateToProps, mapDispatchToProps)(Entrypoint)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f6fb',
    paddingTop: '6%'
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '40%',
    height: 56,
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  queue: {
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