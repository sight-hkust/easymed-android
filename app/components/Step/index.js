import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

const lineWidth = Dimensions.get('window').width/100*88

const Step = ({allSteps, step, backgroundColor='transparent', highlightColor, style}) => {
  let stepWidth = lineWidth/allSteps*step

  return (
    <View style={styles.container}>
      <View>
        <View style={{...styles.wholeLine,  width: lineWidth, backgroundColor: backgroundColor, ...style}} />
        <View style={{...styles.coloredLine, width: stepWidth, backgroundColor: highlightColor, ...style}} />
      </View>
    </View>
    )
}

const styles = {
    wholeLine: {
      height: 10,
      borderRadius: 5,
      zIndex: 0,
    },

    coloredLine: {
      height: 10,
      borderRadius: 5,
      zIndex: 1,
      position: 'absolute',
    },

    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }
}

export default Step