import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

const lineWidth = Dimensions.get('window').width/100*88

const Step = ({allSteps, step}) => {
  let stepWidth = lineWidth/allSteps*step

  return (
    <View style={styles.container}>
      <View>
        <View style={{...styles.wholeLine,  width: lineWidth}} />
        <View style={{...styles.coloredLine, width: stepWidth}} />
      </View>
    </View>
    )
}

const styles = {
    wholeLine: {
      height: 10,
      borderRadius: 5,
      backgroundColor: '#fff',
      zIndex: 0,
    },

    coloredLine: {
      height: 10,
      borderRadius: 5,
      backgroundColor: 'pink',
      zIndex: 1,
      position: 'absolute',
    },

    container: {
      marginTop: 8,
      marginBottom: 16,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }
}

export default Step