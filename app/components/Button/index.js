import React from 'react'
import { Keyboard, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Link } from 'react-router-native';
import Icon from '../Icon'

const KeyboardDismissButton = () => (
  <TouchableOpacity style={{...styles.dismissButton}} onPress={Keyboard.dismiss}>
    <Icon name="keyboard" size={22} color="white"/>
  </TouchableOpacity>
)

const Button = ({title, icon, onPress, round=false, opaque=true, titleColor, bgColor, color, to}) => {
  const style = opaque?{
    borderRadius: round?20:5,
    backgroundColor: bgColor?bgColor:'#fff',
    width: title.length*20,
  }:{
    borderRadius: round?20:5,
    backgroundColor: '#fff0',
    borderColor: color,
    borderWidth: StyleSheet.hairlineWidth,
    width: title.length*20,
  }
  if(to){
    return (
      <Link to={to} component={TouchableOpacity} style={{...styles.default, ...style}} activeOpacity={0.25}>
        <Text style={{fontFamily: 'Quicksand-Medium', marginRight: icon?4:0, color: titleColor?titleColor:'#000'}}>{title.toUpperCase()}</Text>
        { icon && <Icon name={icon} color={titleColor?titleColor:'#000'}/> }
      </Link>
    )
  }
  return (
    <TouchableOpacity style={{...styles.default, ...style}}>
      <Text style={{fontFamily: 'Quicksand-Medium', marginRight: icon?4:0, color: titleColor?titleColor:'#000'}}>{title.toUpperCase()}</Text>
      { icon && <Icon name={icon} color={titleColor?titleColor:'#000'}/> }
    </TouchableOpacity>
  )
}

const IconButton = ({back=false, name, color="white", size=24, onPress, to}) => {
  if(to) {
    return (
      <Link to={to} style={{...styles.iconButton, marginLeft: back?18:0, marginTop: back?32:0}} component={TouchableOpacity} activeOpacity={0.25}>
        <Icon name={name} color={color} size={size}/>
      </Link>
    )
  }
  return (
    <TouchableOpacity style={{...styles.iconButton}} onPress={onPress}>
      <Icon name={name} color={color} size={size}/>
    </TouchableOpacity>
  )

}

const styles = {
  default: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 24,
    height: 40,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 20,
  },
  dismissButton: {
    width: 44,
    height: 36,
    margin: 8,
    paddingTop: 2,
    position: 'absolute',
    top: 32,
    right: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#5e90fd',
    elevation: 1,
    shadowColor: '#3a4252',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    alignSelf: 'flex-end'
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export { Button, IconButton, KeyboardDismissButton };