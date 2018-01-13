import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';

const TextField = ({defaultValue,Unit}) => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.textinput} value={defaultValue} keyboardType="numeric"></TextInput>
      <Text style={styles.text}>{Unit}</Text>
    </View>
  )
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#3a4252',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
  },
  
  text: {
    flex: 8,
    fontSize: 24,
    fontFamily: 'Quicksand-Medium',
    textAlign: 'right',
    color: '#3c4859',
    marginRight: 24,
  },

  textinput: {
    flex: 12,
    height: 50, 
    fontSize: 32,
    fontFamily: 'Quicksand-Medium',
    color: '#3c4859',
    paddingLeft: 24,
  },
});
