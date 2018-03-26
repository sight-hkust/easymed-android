import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../../../components/Header';
import Icon from 'react-native-fontawesome-pro';

const Menu = () => (
  <View style={styles.container}>
    <Header title="Add Records"/>
    <ScrollView>
      <View style={styles.menuItem}>
      </View>
      <View style={styles.menuItem}></View>
      <View style={styles.menuItem}></View>
      <View style={styles.menuItem}></View>
      <View style={styles.menuItem}></View>
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
    borderLeftColor: '#566DF0'
  }
});