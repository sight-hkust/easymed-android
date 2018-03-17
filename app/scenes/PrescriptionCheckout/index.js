import Header from '../../components/Header'
import { PatientListItem as Patient } from '../../components/Patient'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Redirect, Link } from 'react-router-native';
import Icon from '../../components/Icon'
import { IconButton } from '../../components/Button'

const prescribedDrugs = [
  {
    drug: 'Fever Pack',
    date: '15 days',
    time: '3 times',
    confirm: false,
    layout: {
      colors: ['#ECEDDD','#7BC9C5'],
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
      colors: ['#ECEDDD','#7BC9C5'],
      start: {x: 1.0, y: 0.5},
      end: {x: 0.0, y: 1.0},
      locations: [0, 1.0]
    }
  },
  {
    drug: 'Cilest',
    date: '4 days',
    time: '2 times',
    confirm: false,
    layout: {
      colors: ['#ECEDDD','#7BC9C5'],
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
      colors: ['#ECEDDD','#7BC9C5'],
      start: {x: 1.0, y: 0.5},
      end: {x: 0.0, y: 1.0},
      locations: [0, 1.0]
    }
  }
]

const PrescribedDrugEntry = ({layout, drug, days, times, dosage, instructions, type, confirm}) => (
  <View style={styles.card}>
    <LinearGradient {...layout} style={styles.linearGradient}>
      <Text style={styles.drug}>{drug}</Text>
      <Text style={styles.subinfo}>{date}</Text>
      <Text style={styles.subinfo}>{time}</Text>
    </LinearGradient>
  </View>
)


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
          {prescribedDrugs.map(({layout, drug, days, times, dosage, instructions, type, confirm}, i) => (
            <PrescribedDrugEntry key={i} layout={layout} drug={drug} days={days} times={times} confirm={confirm} doasage={dosage} instructions={instructions}/>
          ))}
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
    height: 100,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginLeft: 24,
    marginRight: 24,
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
  drug: {

  },
  subinfo: {

  }
})