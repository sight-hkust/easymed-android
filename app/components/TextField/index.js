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
        style={styles.input}
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
        style={[styles.inputBox, {height: Platform.OS == 'android' ? 40 : '100%'}]}
        value={value}
        placeholder={placeholder}
        underlineColorAndroid='transparent'
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        multiline = {true}
      >
      </TextInput>
  </View>
)

export { TextBox, TextField }

export default TextField;


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 3,
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 5,
    margin: 10
  },
  textbox: {
    backgroundColor: '#fff',
    borderRadius: 6,
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 5,
    width: '68%',
    height: 240
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
    height: '100%', 
    fontSize: 18,
    fontFamily: 'Quicksand-Medium',
    color: '#3c4859',
    paddingHorizontal: 16,
  },

  inputBox: {
    flex: 12,
    height: 52, 
    fontSize: 18,
    fontFamily: 'Quicksand-Medium',
    color: '#3c4859',
    paddingHorizontal: 20,
    paddingTop: 12
  },
});
