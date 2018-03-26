import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../../../components/Header';
import Icon from 'react-native-fontawesome-pro';

const Add = () => (
  <View style={{height:32, width:32, borderRadius:16, backgroundColor:'#566DF0', justifyContent:'center', alignItems:'center'}}>
    <Text style={{fontFamily: 'Nunito-Bold', color:'#fff', fontSize: 28, paddingBottom:4}}>+</Text>
  </View>
)

const Menu = () => (
  <View style={styles.container}>
    <Header title="Add Records"/>
    <ScrollView>
      <View style={styles.menuItem}><Text style={styles.text}>Vitals</Text><Add/></View>
      <View style={styles.menuItem}><Text style={styles.text}>Previous Medical History</Text><Add/></View>
      <View style={styles.menuItem}><Text style={styles.text}>Screening</Text><Add/></View>
      <View style={styles.menuItem}><Text style={styles.text}>Drug History and Allergy</Text><Add/></View>
      <View style={styles.menuItem}><Text style={styles.text}>Pregnancy</Text><Add/></View>
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
    fontSize: 20,
  }
});