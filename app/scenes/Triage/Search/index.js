import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPatientList } from '../../../actions/patient';
import Header from '../../../components/Header'
import { PatientListItem } from '../../../components/Patient'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      filter: ''
    }
    this.fetchPatientList = props.actions.fetchPatientList
  }

  componentWillMount() {
    this.fetchPatientList()
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Search" to="/triage" />
        <ScrollView>
          {this.props.patients && this.props.patients.map((patient, i) => (
            <PatientListItem patient={patient} to={`/triage/patients/${patient.id}`} key={i} />
          ))}
        </ScrollView>
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
})