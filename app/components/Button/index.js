import React from 'react'
import { Keyboard, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Link } from 'react-router-native';
import Icon from 'react-native-fontawesome-pro';

const KeyboardDismissButton = () => (
  <TouchableOpacity style={{...styles.dismissButton}} onPress={Keyboard.dismiss}>
    <Icon name="keyboard" size={22} color="white"/>
  </TouchableOpacity>
)

const Button = ({title, icon, onPress, round=false, opaque=true, titleColor, bgColor, color, to, width}) => {
  const style = opaque?{
    borderRadius: round?20:5,
    backgroundColor: bgColor?bgColor:'#fff',
    width: width?width:title.length*20,
  }:{
    borderRadius: round?20:5,
    backgroundColor: '#fff0',
    borderColor: color,
    borderWidth: StyleSheet.hairlineWidth,
    width: width?width:title.length*20,
  }
  if(to){
    return (
      <Link to={to} component={TouchableOpacity} style={{...styles.default, ...style}} activeOpacity={0.25}>
        <Text style={{fontFamily: 'Quicksand-Medium', marginRight: icon?4:0, color: titleColor?titleColor:'#fff'}}>{title.toUpperCase()}</Text>
        { icon && <Icon name={icon} type="solid" color={titleColor?titleColor:'#fff'}/> }
      </Link>
    )
  }
  return (
    <TouchableOpacity style={{...styles.default, ...style}} onPress={onPress}>
      <Text style={{fontFamily: 'Quicksand-Medium', fontSize: 16 , marginRight: icon?8:0, color: titleColor?titleColor:'#fff'}}>{title.toUpperCase()}</Text>
      { icon && <Icon name={icon} type="solid" color={titleColor?titleColor:'#fff'} size={16}/> }
    </TouchableOpacity>
  )
}

const IconButton = ({back=false, name, color="white", type, size=24, onPress, to}) => {
  if(to) {
    return (
      <Link to={to} style={{...styles.iconButton}} component={TouchableOpacity} activeOpacity={0.25}>
        <Icon name={name} color={color} type={type} size={size} type={type}/>
      </Link>
    )
  }
  return (
    <TouchableOpacity style={{...styles.iconButton}} onPress={onPress}>
      <Icon name={name} color={color} type={type} size={size}/>
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
    minWidth: 96,
    height: 40,
    elevation: 1,
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 5,
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
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.7,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 8,
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