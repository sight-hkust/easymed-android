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
    type: 'tab',
    item: 'Fever Pack',
    dosage: '45 packages',
    days: '15 days',
    times: '3 times',
    instructions: 'Might be sleepy',
    confirm: true,
  },
  {
    type: 'injection',
    item: 'Brevinor',
    dosage: '10 tabs',
    days: '5 days',
    times: '2 times',
    confirm: true,
  },
  {
    type: 'syrup',
    item: 'Cilest',
    dosage: '600mg',
    days: '4 days',
    times: '2 times',
    confirm: false,
  },
  {
    type: 'powder',
    item: 'Cerazette',
    dosage: '600ml',
    days: '10 days',
    times: '3 times',
    confirm: false,
  },
  {
    type: 'ointment',
    item: 'Cerazette',
    dosage: '600ml',
    days: '10 days',
    times: '3 times',
    confirm: false,
  },
  {
    type: 'oralSolution',
    item: 'Cerazette',
    dosage: '600ml',
    days: '10 days',
    times: '3 times',
    confirm: false,
  },
  {
    type: 'others',
    item: 'Cerazette',
    dosage: '600ml',
    days: '10 days',
    times: '3 times',
    confirm: false,
  }
]

const DrugTypeContainerStyle = {
  height: 56,
  width: 56,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 28
}
const DrugTypeIcon = ({type}) => {
  switch (type){
    case 'tab': {
      return(
        <View style={{...DrugTypeContainerStyle, backgroundColor: '#B1DC76'}}>
          <Image source={require('../../../assets/images/pharmacy/tab.png')} style={{height:32, width:32}} />
        </View>
      )
    }
    case 'injection': {
      return(
        <View style={{...DrugTypeContainerStyle, backgroundColor: '#FFA192'}}>
          <Image source={require('../../../assets/images/pharmacy/injection.png')} style={{height:32, width:32}} />
        </View>
      )
    }
    case 'syrup': {
      return(
        <View style={{...DrugTypeContainerStyle, backgroundColor: '#FF85A7'}}>
          <Image source={require('../../../assets/images/pharmacy/syrup.png')} style={{height:32, width:32}} />
        </View>
      )
    }
    case 'powder': {
      return(
        <View style={{...DrugTypeContainerStyle, backgroundColor: '#FFDA01'}}>
          <Image source={require('../../../assets/images/pharmacy/powder.png')} style={{height:32, width:32}} />
        </View>
      )
    }
    case 'ointment': {
      return(
        <View style={{...DrugTypeContainerStyle, backgroundColor: '#9396FA'}}>
          <Image source={require('../../../assets/images/pharmacy/ointment.png')} style={{height:32, width:32}} />
        </View>
      )
    }
    case 'oralSolution': {
      return(
        <View style={{...DrugTypeContainerStyle, backgroundColor: '#4E76E4'}}>
          <Image source={require('../../../assets/images/pharmacy/oralSolution.png')} style={{height:32, width:32}} />
        </View>
      )
    }
    case 'others': {
      return(
        <View style={{...DrugTypeContainerStyle, backgroundColor: '#7CD3C8'}}>
          <Image source={require('../../../assets/images/pharmacy/others.png')} style={{height:32, width:32}} />
        </View>
      )
    }
  }
}

const PrescribedDrugEntry = ({type, item, dosage, days, times, instructions, confirm}) => (
  <TouchableOpacity style={styles.drugItem}>
    <DrugTypeIcon type={type}/>
    
    <View style={{flexDirection:'column', width:'72%', paddingHorizontal: 16, justifyContent:'space-between', height:'80%'}}>
      <Text style={styles.primaryInfo}>{item}</Text>
      <Text style={styles.secondaryInfo}>{dosage}</Text>
      <View style={styles.drugItemInfoRowContainer}>
        <Text style={styles.tertiaryInfo}>{days}</Text>
        <Text style={styles.tertiaryInfo}>{times}</Text>
      </View>
      <Text style={styles.tertiaryInfo}>{instructions}</Text>
    </View>
    
    <View>
      <Image source={confirm?require('../../../assets/images/pharmacy/checked.png'):require('../../../assets/images/pharmacy/notchecked.png')} style={{height:28, width:28}} />
    </View>
  </TouchableOpacity>
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
        <Header title="Pharmacy" to='/pharmacy'/>
        <Toolbar />
        <Text style={styles.patientName}>Patient: Preah R</Text>
        <ScrollView>
          {prescribedDrugs.map(({type, item, days, times, dosage, instructions, confirm}, i) => (
            <PrescribedDrugEntry key={i} type={type} item={item} dosage={dosage} days={days} times={times} instructions={instructions} confirm={confirm} />
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

  patientName: {
    fontFamily: 'Nunito-Bold',
    color: '#3c4859',
    fontSize: 24,
    marginLeft: 20,
    marginBottom: 8
  },

  drugItem:{
    flexDirection: 'row',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    width: '85%',
    height: 96,
    elevation: 2,
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 5,
    alignSelf: 'center'
  },

  primaryInfo: {
    fontFamily: 'Nunito-Bold',
    color: '#3c4859',
    fontSize: 18
  },

  secondaryInfo: {
    fontFamily: 'Nunito-Bold',
    color: '#E09E06',
    fontSize: 14
  },
  
  tertiaryInfo: {
    fontFamily: 'Nunito-Bold',
    color: '#828a95',
    fontSize: 12
  },
  drugItemInfoRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
  },
})