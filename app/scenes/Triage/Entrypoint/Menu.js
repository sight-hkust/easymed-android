import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Header from '../../../components/Header';
import Icon from 'react-native-fontawesome-pro';

const Menu = () => (
  <View style={styles.container}>
    <Header title="Add Records"/>
    <ScrollView>
      <Link style={styles.menuItem} to="/triage/patients/:patientId/vitals">
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Icon name="heartbeat" size={18} type="solid" color="#566DF0"/>
          <Text style={styles.text}>Vitals</Text>
        </View>
      </Link>
      <Link style={styles.menuItem} to="/triage/patients/:patientId/history">
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Icon name="procedures" size={18} type="solid" color="#566DF0"/>
          <Text style={styles.text}>Previous Medical History</Text>
        </View>
      </Link>
      <Link style={styles.menuItem} to="/triage/patients/:patientId/screening">
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Icon name="diagnoses" size={18} type="solid" color="#566DF0"/>
          <Text style={styles.text}>Screening</Text>
        </View>
      </Link>
      <Link style={styles.menuItem} to="/triage/patients/:patientId/vaccination">
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Icon name="allergies" size={18} type="solid" color="#566DF0"/>
          <Text style={styles.text}>Drug History and Allergies</Text>
        </View>
      </Link>
      <Link style={styles.menuItem} to="/triage/patients/:patientId/pregnancy">
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Icon name="female" size={18} type="solid" color="#566DF0"/>
          <Text style={styles.text}>Pregnancy</Text>
        </View>
      </Link>
    </ScrollView>
  </View>
)

export default Menu

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fb',
    paddingTop: '6%',
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
    borderLeftColor: '#566DF0',
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