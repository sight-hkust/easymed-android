import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-native';
import { transferPatient } from '../../../actions/patient';
import Header from '../../../components/Header';
import Icon from 'react-native-fontawesome-pro';
import { Button } from '../../../components/Button'

const menuItems = [
  {
    destination: '/history',
    icon: 'procedures',
    color: '#ffcb2f',
    title: 'Previous Medical History'
  },
  {
    destination: '/screening',
    icon: 'diagnoses',
    color: '#49e5aa',
    title: 'Screening'
  },
  {
    destination: '/vaccination',
    icon: 'allergies',
    color: '#7d82b8',
    title: 'Drug History and Allergies'
  }
]

const Metric = ({to, icon, color, title}) => (
  <Link style={{...StyleSheet.flatten(styles.menuItem), borderLeftColor: color}} component={TouchableOpacity} activeOpacity={0.5} to={to}>
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
      patient: props.patient
    }
    this.transferPatient = props.actions.transferPatient
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content', true)
  }

  transfer() {
    this.transferPatient(queueId, 'consultation')
  }

  render() {
    return (
      <View style={styles.container}>
          <Header title="Add Records" to="/triage"/>
          <ScrollView>
            <Metric title="Vitals" icon="heartbeat" color="#ef798a" to={`/triage/patients/${this.state.queueId}/vitals`} />
            {menuItems.map(({destination, icon, color, title}, i) => (
              <Metric
                to={`/triage/patients/${this.state.patient.id}${destination}`}
                title={title}
                icon={icon}
                color={color}
                key={i}
              />
            ))}
            {this.state.patient.sex === 'Female' && <Metric title="Pregnancy"
                                                            icon="female"
                                                            color="#f4649e"
                                                            to={`/triage/patients/${this.state.queueId}/pregnancy`}
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
        </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({transferPatient}, dispatch)
})

const mapStateToProps = (state, props) => ({
  patient: state.patients.queue[state.patients.queue.findIndex(({queueId}) => props.match.params.queueId)].patient
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