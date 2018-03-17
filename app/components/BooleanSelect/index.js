import React from 'react'
import { Keyboard, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Link } from 'react-router-native';
import Icon from '../Icon'

const BooleanSelect = ({title, icon, bgColor, width, onPress}) => (
    <TouchableOpacity style={{...styles.default, width}} onPress={onPress}>
      <View style={{width:72, height:56, backgroundColor:bgColor, alignItems:'flex-start', justifyContent:'center', paddingLeft:12, borderTopLeftRadius:5, borderBottomLeftRadius:5, marginRight:24 }}>
        { icon && <Icon name={icon} color='#fff' size={40}/> }
      </View>
      <Text style={{fontFamily: 'Nunito-Bold', color:'#3c4859', fontSize:24 }}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
)

const styles = {
  default: {
    alignSelf: 'center',
    flexDirection: 'row',
    elevation: 1,
    shadowRadius: 20,
    height: 56,
    width: '80%',
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#3a4252',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
}

export default BooleanSelect