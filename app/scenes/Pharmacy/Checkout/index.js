import Header from '../../../components/Header'
import { PatientListItem as Patient } from '../../../components/Patient'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import { Redirect } from 'react-router-native';
import { IconButton, Button } from '../../../components/Button';
import DropdownAlert from 'react-native-dropdownalert'
import { dischargePatient } from '../../../actions/patient';
import { fetchPrescription } from '../../../actions/record';
import Loading from '../../../components/Loading'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const device = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width
}

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
          <Image source={require('../../../../assets/images/pharmacy/tab.png')} style={{height:32, width:32}} />
        </View>
      )
    }
    case 'injection': {
      return(
        <View style={{...DrugTypeContainerStyle, backgroundColor: '#FFA192'}}>
          <Image source={require('../../../../assets/images/pharmacy/injection.png')} style={{height:32, width:32}} />
        </View>
      )
    }
    case 'syrup': {
      return(
        <View style={{...DrugTypeContainerStyle, backgroundColor: '#FF85A7'}}>
          <Image source={require('../../../../assets/images/pharmacy/syrup.png')} style={{height:32, width:32}} />
        </View>
      )
    }
    case 'powder': {
      return(
        <View style={{...DrugTypeContainerStyle, backgroundColor: '#FFDA01'}}>
          <Image source={require('../../../../assets/images/pharmacy/powder.png')} style={{height:32, width:32}} />
        </View>
      )
    }
    case 'ointment': {
      return(
        <View style={{...DrugTypeContainerStyle, backgroundColor: '#9396FA'}}>
          <Image source={require('../../../../assets/images/pharmacy/ointment.png')} style={{height:32, width:32}} />
        </View>
      )
    }
    case 'oralSolution': {
      return(
        <View style={{...DrugTypeContainerStyle, backgroundColor: '#4E76E4'}}>
          <Image source={require('../../../../assets/images/pharmacy/oralSolution.png')} style={{height:32, width:32}} />
        </View>
      )
    }
    case 'others': {
      return(
        <View style={{...DrugTypeContainerStyle, backgroundColor: '#7CD3C8'}}>
          <Image source={require('../../../../assets/images/pharmacy/others.png')} style={{height:32, width:32}} />
        </View>
      )
    }
  }
}

class PrescribedDrugEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAvailable: false
    }
  }

  render() {
    return (
      <TouchableOpacity 
      style={styles.drugItem}
      onPress={() => {
        this.setState({isAvailable: !this.state.isAvailable})
      }}>
        <DrugTypeIcon type={this.props.type}/>
        
        <View style={{flexDirection:'column', width:'72%', paddingHorizontal: 16, justifyContent:'space-between', height:'80%'}}>
          <Text style={styles.primaryInfo}>{this.props.item}</Text>
          <Text style={styles.secondaryInfo}>{`${this.props.dosage} x ${this.props.amount}`}</Text>
          <View style={styles.drugItemInfoRowContainer}>
            <Text style={styles.tertiaryInfo}>{this.props.days}</Text>
            <Text style={styles.tertiaryInfo}>{this.props.times}</Text>
          </View>
          <Text style={styles.tertiaryInfo}>{this.props.instructions}</Text>
        </View>
        
        <View>
          <Icon name={this.state.isAvailable?'check-square':'square'}  size={24}/>
        </View>
      </TouchableOpacity>
    )
  }
}


const Toolbar = () => (
  <View style={styles.toolbar}>
    <IconButton name="medkit" color="#3c4859" />
    <IconButton name="clipboard-list" color="#3c4859"/>
    <IconButton name="bell" color="#3c4859" />
  </View>
)


class Checkout extends Component {
  constructor(props) {
    super(props)
    this.fetchPrescription = props.actions.fetchPrescription.bind(this)
    this.dischargePatient = props.actions.dischargePatient.bind(this)
    this.state = {
      dismiss: false,
      prescriptions: {}
    }
  }

  componentWillReceiveProps(nextProps){
    this.state.prescriptions = nextProps.patients[nextProps.match.params.queueId]
    console.log(this.state.prescriptions)
    if(!nextProps.patients.hasOwnProperty(nextProps.match.params.queueId)) {
      this.dropdown.alertWithType('success', 'Success', `Patient has been discharged from pharmacy.`)
    }
  }

  componentWillMount() {
    this.fetchPrescription(this.props.match.params.queueId)
  }

  onClose(data) {
    this.setState({dismiss: true})
  }

  render() {
    if(this.state.dismiss) {
      return <Redirect to={`/pharmacy`}/>
    }
    else {
      return (
        <View style={styles.container}>
          <Header title="Pharmacy" to='/pharmacy'/>
          {/* <Text style={styles.patientName}>Patient: Preah R</Text> */}
          {
            this.state.prescriptions && 
            <ScrollView>
              { 
                Object.keys(this.state.prescriptions).map((id, i) => (
                <PrescribedDrugEntry 
                key={i} 
                type="tab" 
                item={this.state.prescriptions[id].description} 
                amount={this.state.prescriptions[id].instruction.amount}
                dosage={`${this.state.prescriptions[id].concentration} ${this.state.prescriptions[id].unit}`} 
                days={`${this.state.prescriptions[id].instruction.duration} ${this.state.prescriptions[id].instruction.interval==='/7'?'Days':this.state.prescriptions[id].instruction.interval==='/52'?'Weeks':'Month'} ${this.state.prescriptions[id].instruction.interval}`} 
                times={this.state.prescriptions[id].instruction.frequency} instructions={this.state.prescriptions[id].instruction.intake} />
              ))}
            </ScrollView>
          }
          <TouchableOpacity 
            style={{...StyleSheet.flatten(styles.actionButtons), backgroundColor: '#5beed1'}} 
            onPress={()=>{
              this.dischargePatient(this.props.match.params.queueId)
            }}>
            <Icon name="sign-out-alt" type="solid" size={20} color="#fff"/>
            <Text style={{fontFamily: 'Quicksand-Bold', fontSize: 18, color: '#fff', marginLeft: 8}}>DISCHARGE</Text>
          </TouchableOpacity>
          <Loading isLoading={this.props.loading} />
          <DropdownAlert ref={ref => this.dropdown = ref} onClose={data => this.onClose(data)} closeInterval={2500}/>
        </View>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({dischargePatient, fetchPrescription}, dispatch)
})

const mapStateToProps = (state) => ({
  loading: state.patients.loading.spinner,
  patients: state.records.patients,
})

export default connect(mapStateToProps,mapDispatchToProps)(Checkout)

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
  actionButtons: {
    flexDirection: 'row',
    width: device.width,
    height: device.height*.08,
    justifyContent: 'center',
    alignItems: 'center'
  }
})