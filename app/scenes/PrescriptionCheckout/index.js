import React, { Component } from 'react';
import { View, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IconButton } from '../../components/Button'
import Icon from '../../components/Icon'
import Header from '../../components/Header'
import { PatientListItem as Patient } from '../../components/Patient'


const prescribeDrugs = [
  {
    drug: 'Fever Pack',
    date: '15 days',
    time: '3 times',
    confirm: false,
    layout: {
      colors: ['#FFE53B','#FF2525'],
      start: {x: 1.0, y: 0.5},
      end: {x: 0.0, y: 1.0},
      locations: [0, 1.0]
    }
  },
  {
    drug: 'Brevinor',
    date: '5 days',
    time: '2 times',
    confirm: false,
    layout: {
      colors: ['#21D4FD','#B721FF'],
      start: {x: 1.0, y: 0.5},
      end: {x: 0.0, y: 1.0},
      locations: [0, 1.0]
    }
  },
  {
    drug: 'Cerazette',
    date: '10 days',
    time: '3 times',
    confirm: false,
    layout: {
      colors: ['#D9AFD9','#97D9E1'],
      start: {x: 1.0, y: 0.5},
      end: {x: 0.0, y: 1.0},
      locations: [0, 1.0]
    }
  }
]

const prescribedDrugEntry = ({layout, drug, date, time, confirm}) => (
  <View style={styles.card}>
    <LinearGradient {...layout} style={styles.linearGradient}>
      //drug icon here
      <Text style={styles.drug}>{drug}</Text>

    </LinearGradient>
  </View>
)

// const nameFormatter = (name) => {
//   return name.split(' ').map((part, i) => { if(i == 0) { return part } else if (i == 1) { return part.substring(0,1) } else return ''}).join(' ').toUpperCase()
// }


const Toolbar = () => (
  <View style={styles.toolbar}>
    <IconButton name="medkit" color="#3c4859" />
    <IconButton name="clipboard-list" color="#3c4859"/>
    <IconButton name="bell" color="#3c4859" />
  </View>
)


class PrescriptionCheckout extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Pharmacy" />
        <Toolbar />
        <ScrollView>
        </ScrollView>
        
      </View>
    )
  }
}

export default PrescriptionCheckout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f6fb',
    paddingTop: '6%'
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '40%',
    height: 56,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 20
  },
  header: {
    height: 44,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'yellow'
  },

  headerTitle: {
    marginLeft: 24,
    flexDirection: 'row',
    alignItems: 'baseline'
  },

  headerTitleText: {
    fontSize: 30,
    fontFamily: 'Quicksand-Medium',
    color: '#3c4859',
    marginLeft: 4
  },

  card:{
    height: 160,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 5,
    elevation: 1
  },

  linearGradient: {
    flexDirection: 'row',
    flex: 3,
    alignItems: 'baseline',
    justifyContent: 'space-between',
    borderRadius: 8,
  },
})