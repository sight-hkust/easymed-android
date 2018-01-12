import React from 'react';
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Redirect } from 'react-router-native';
import Icon from '../../components/Icon'

const VitalForm = () => {
  return (
    <View style={styles.container}>

    <StatusBar
      backgroundColor='blue'
      barStyle='light-content'
    />

    <View style={styles.header}>
      <Icon name='arrow-left' type='solid' color='white' size={22} isNav={true}/>
      <Text style={styles.headerText}>Vital</Text>
    </View>

    <View>
      <Text style={styles.text}>Please enter your Blood Pressure level ?</Text>
    </View>

    <View style={styles.answer}>
        <Image style={styles.image} source={require('../../../assets/images/bloodPressure.png')}/>
        <TextInput style={styles.textinput} value="90" keyboardType="numeric"></TextInput>
    </View>
      
  </View>
  )
};

export default VitalForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
  },
  
  header: {
    flexDirection: 'row',
    height: 94,
    backgroundColor: '#1b9def',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center'
  },

  headerText: {
    fontSize: 36,
    fontFamily: 'Nunito-Bold',
    textAlign: 'right',
    color: '#FFF',
    marginRight: 32,
    marginTop: 32,
  },

  text: {
    fontSize: 32,
    fontFamily: 'Quicksand-Medium',
    textAlign: 'left',
    color: '#3c4859',
    marginLeft: 32,
    marginRight: 32,
  },

  image: {
    height: 48,
    width: 48,
    resizeMode: 'contain',
    marginLeft: 24,
    marginRight: 24,
  },

  answer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  textinput: {
    width: 250,
    height: 50, 
    fontSize: 32,
    fontFamily: 'Quicksand-Medium',
    textAlign: 'left',
    color: '#3c4859',
    borderRadius: 5,
    shadowColor: '#ABB1C3',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    paddingLeft: 8,
  },
});
