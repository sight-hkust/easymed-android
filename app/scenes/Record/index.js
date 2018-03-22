import React, { Component } from 'react'
import { View, Text, StatusBar, StyleSheet } from 'react-native'
import Icon from '../../components/Icon'

const Gender = ({sex}) => {
  const style = {
    backgroundColor: sex==='female'?'#ff5273':'#4c79fc',
    borderColor: sex==='female'?'#ff718c':'#7c9dfc',
    ...StyleSheet.flatten(styles.gender)
  }
  return (
    <View style={style}>
      <Icon name={sex==='female'?'venus':'mars'} color="white" size={44}/>
    </View>
  )
}

const PatientName = ({name, alternate}) => (
  <View style={styles.name}>
    <Text style={styles.nameText}>{name}</Text>
    <Text style={styles.nameText}>{`(${alternate})`}</Text>
  </View>
)

export default class Record extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content', true)
  }

  render() {
    return (
      <View style={styles.container}>
        <Gender sex="male"/>
        <PatientName name="Peter Quill" alternate="Starlord"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: '6%',
    backgroundColor: '#f5f6fb',
    alignItems: 'center'
  },
  name: {
    marginVertical: 12,
    justifyContent: 'center'
  },
  nameText: {
    fontFamily: 'Nunito-Bold',
    color: '#3c4859',
    fontSize: 20,
    textAlign: 'center'
  },
  gender: {
    height: 96,
    width: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    elevation: 2,
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.7,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 8,
    borderWidth: 6,
    borderStyle: 'solid',
  }
})