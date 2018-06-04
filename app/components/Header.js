import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { IconButton } from './Button'

const Header = ({title='Title', light=false, to='/'}) => {
  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      height: '8%',
      justifyContent: 'space-between',
      marginVertical: 12,
      alignItems: 'baseline',
      paddingHorizontal: '4%'
    },
    headerTitle: {
      fontSize: 28,
      fontFamily: 'Nunito-Bold',
      textAlign: 'right',
      marginRight: 8,
      backgroundColor: '#fff0',
      color: light?'#fff':'#3c4859'
    },
  })

  return (
    <View style={styles.header}>
      <IconButton color={light?'#fff':'#3c4859'} name='angle-left' size={32} to={to}/>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  )
}

export default Header 