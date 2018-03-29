import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform
} from 'react-native';

const TextField = ({value, unit, width, keyboardType, placeholder, onChangeText, onSubmitEditing}) => {
  return (
    <View style={{...StyleSheet.flatten(styles.container), width}}>
      <TextInput
        underlineColorAndroid='transparent'
        style={[styles.input, {height: Platform.OS == 'android' ? 40 : 20}]}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        underlineColorAndroid='transparent'
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      >
      </TextInput>
      { unit && <Text style={styles.unit}>{unit}</Text>}
    </View>
  )
};

const TextBox = ({value, width, placeholder, onChangeText, onSubmitEditing}) => (
  <View style={styles.textbox}>
    <TextInput
        underlineColorAndroid='transparent'
        style={[styles.input, {height: Platform.OS == 'android' ? 40 : 20}]}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        underlineColorAndroid='transparent'
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      >
      </TextInput>
  </View>
)

export default TextField;


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 5,
  },
  textbox: {
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 5,
  },
  unit: {
    flex: 8,
    fontSize: 24,
    fontFamily: 'Quicksand-Medium',
    textAlign: 'right',
    color: '#3c4859',
    paddingRight: 16
  },

  input: {
    flex: 12,
    height: 52, 
    fontSize: 18,
    fontFamily: 'Quicksand-Medium',
    color: '#3c4859',
    paddingHorizontal: 20,
  },
});
