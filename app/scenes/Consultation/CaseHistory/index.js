import React, { Component } from 'react';
import { Dimension, View, Text, StatusBar, StyleSheet } from 'react-native';

const { width, height } = Dimension.get('window');



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: height*.06
  }
})

