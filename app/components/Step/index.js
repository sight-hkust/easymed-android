import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width
const pattern = [
    {
      type: 'circle'
    },
    {
      type: 'line'
    },
    
];

const Step = ({number}) => {
  let lineWidth = (windowWidth-40-24*number)/(number-1)

  return (
    <View style={styles.container}>

      <View style={{...styles.circle}}/>
      <View style={{...styles.line, width: lineWidth}}/>
      <View style={{...styles.circle}}/>
      <View style={{...styles.line, width: lineWidth}}/>
      <View style={{...styles.circle}}/>
      <View style={{...styles.line, width: lineWidth}}/>
      <View style={{...styles.circle}}/>
      <View style={{...styles.line, width: lineWidth}}/>
      <View style={{...styles.circle}}/>   

      {/* 
          {pattern.map(({type}) => (
          type==='circle'?<View style={{...styles.type}}/>:<View style={{...styles.line, width: lineWidth}}/>
          )
          )}
      */}
      
    </View>
    )
}

const styles = {
    circle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#FBD2C8'
    },
    line: {
      height: 4,
      backgroundColor: '#fff'
    },
    container: {
      marginTop: 8,
      marginBottom: 16,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }
}

export default Step