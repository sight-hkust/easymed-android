import React, { Component } from 'react'
import { Dimensions ,Image, View, Text, StatusBar, StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-fontawesome-pro';
import Header from '../../../components/Header';
import { IconButton, Button } from '../../../components/Button';
import Modal from 'react-native-modal';
import { faChevronDoubleLeft } from '@fortawesome/fontawesome-pro-light';

const Gender = ({sex}) => {
  const style = {
    backgroundColor: sex==='female'?'#ff5273':'#4c79fc',
    borderColor: sex==='female'?'#ff718c':'#7c9dfc',
    shadowColor: sex==='female'?'#ff718c':'#7c9dfc',
    ...StyleSheet.flatten(styles.gender)
  }
  return (
    <View style={style}>
      <Icon name={sex==='female'?'venus':'mars'} color="white" size={38}/>
    </View>
  )
}

const PatientName = ({name, alternate}) => (
  <View style={styles.name}>
    <Text style={styles.nameText}>{name.toUpperCase()}</Text>
    <Text style={styles.nameText}>{`(${alternate.toUpperCase()})`}</Text>
  </View>
)

const vitalsDemo = [
  { 
    icon: require('../../../../assets/images/vitals/pulse.png'),
    unit: 'bpm',
    value: '65'
  },
  {
    icon: require('../../../../assets/images/vitals/pressure.png'),
    unit: '',
    value: '67/120'
  },
  {
    icon: require('../../../../assets/images/vitals/spo2.png'),
    unit: '%',
    value: '98'
  },
  {
    icon: require('../../../../assets/images/vitals/temperature.png'),
    unit: '°C',
    value: '34'
  },
  {
    icon: require('../../../../assets/images/vitals/height.png'),
    unit: 'cm',
    value: '163'
  },
  {
    icon: require('../../../../assets/images/vitals/weight.png'),
    unit: 'kg',
    value: '76'
  }
]

const Vitals = ({vitals}) => (
  <View style={styles.vitals}>
    {vitalsDemo.map(({icon, unit, value}, i) => (
      <View key={i} style={{width: 64, height: 64, marginVertical: 12, flexGrow: 1,width: '30%', alignItems: 'center', justifyContent: 'space-around'}}>
        <Image style={{width: 40, height: 40}} source={icon} />
        <Text style={{fontFamily: 'Nunito-Bold', color: '#3c4859'}}>{value} {unit.toUpperCase()}</Text>
      </View>
    ))}
  </View>
)

const Cases = () => (
  <View style={styles.cases}>
    <ScrollView>
      <View style={styles.record}>
        <View style={{height:24, width:64, backgroundColor: '#FFCE45', borderRadius: 8, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 12}}>123456</Text>
        </View>

        <View style={{height:'80%', width:'60%', alignItems:'flex-start', justifyContent:'center', paddingLeft:8}}>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#A4A6AA', fontSize: 16}}>11/07/2017</Text>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#3c4859', fontSize: 18}}>Fever</Text>
        </View>
        
        <IconButton name="chevron-circle-right" type="solid" color="#3c4859" size={24}/>
      </View>

      <View style={styles.record}>
        <View style={{height:24, width:64, backgroundColor: '#FFCE45', borderRadius: 8, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 12}}>123456</Text>
        </View>

        <View style={{height:'80%', width:'60%', alignItems:'flex-start', justifyContent:'center', paddingLeft:8}}>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#A4A6AA', fontSize: 16}}>11/07/2017</Text>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#3c4859', fontSize: 18}}>Fever</Text>
        </View>
        
        <IconButton name="chevron-circle-right" type="solid" color="#3c4859" size={24}/>
      </View>
      <View style={styles.record}>
        <View style={{height:24, width:64, backgroundColor: '#FFCE45', borderRadius: 8, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 12}}>123456</Text>
        </View>

        <View style={{height:'80%', width:'60%', alignItems:'flex-start', justifyContent:'center', paddingLeft:8}}>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#A4A6AA', fontSize: 16}}>11/07/2017</Text>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#3c4859', fontSize: 18}}>Fever</Text>
        </View>
        
        <IconButton name="chevron-circle-right" type="solid" color="#3c4859" size={24}/>
      </View>
      <View style={styles.record}>
        <View style={{height:24, width:64, backgroundColor: '#FFCE45', borderRadius: 8, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 12}}>123456</Text>
        </View>

        <View style={{height:'80%', width:'60%', alignItems:'flex-start', justifyContent:'center', paddingLeft:8}}>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#A4A6AA', fontSize: 16}}>11/07/2017</Text>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#3c4859', fontSize: 18}}>Fever</Text>
        </View>
        
        <IconButton name="chevron-circle-right" type="solid" color="#3c4859" size={24}/>
      </View>
    </ScrollView>
  </View>
)

const NewConsultationSession = ({toggle, pathPrefix}) => (
  <View style={styles.newConsultationSession}>
    <Button title="New Case" titleColor="#3c4859" to={`${pathPrefix}/session`} icon="file-plus" width="95%" round/>
    <Button title="New Folder" titleColor="#3c4859" icon="folder-open" width="95%" round/>
    <Button title="Cancel" titleColor="#fff" bgColor="#d27787" onPress={toggle}/>
  </View>
)

export default class Record extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalPresent: false,
      pathPrefix: props.match.url
    }
  }

  componentWillUnmount() {
    this.setState({ isModalPresent: false })
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content', true)
  }

  toggleNewSessionDialog() {
    this.setState({isModalPresent: !this.state.isModalPresent})
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Medical Record" to="/consultation" />
        <View style={styles.toolbar}>
          <IconButton name="plus" onPress={this.toggleNewSessionDialog.bind(this)} color="#3c4859" />
          <IconButton name="edit" color="#3c4859" />
          <IconButton name="search" color="#3c4859"/>
        </View>
        <ScrollView>
          <Gender sex="male"/>
          <PatientName name="Preah R" alternate="Bopha"/>
          <Vitals/>
          <Cases />
        </ScrollView>
        <Modal isVisible={this.state.isModalPresent}
          backdropOpacity={0}
          style={{height: Dimensions.get('window').height*.5, justifyContent: 'flex-end'}}>
          <NewConsultationSession
            toggle={this.toggleNewSessionDialog.bind(this)}
            pathPrefix={this.state.pathPrefix}
          />
        </Modal>
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
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginRight: 12,
    width: '40%',
    height: 56,
    alignItems: 'center',
    alignSelf: 'flex-end'
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
    height: 80,
    width: 80,
    borderRadius: 48,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    elevation: 2,
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 4 },
    shadowRadius: 9,
    borderWidth: 4,
    borderStyle: 'solid',
  },
  vitals: {
    height: 200,
    width: 336,
    borderRadius: 6,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 8,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.7,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 8,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  cases: {
    height: 224,
    width: 336,
    marginVertical: 8,
    alignSelf: 'center',
  },
  record: {
    borderRadius: 6,
    backgroundColor: '#fff',
    height: 64,
    width: '100%',
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.7,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 8,
    marginVertical: 6,
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderLeftColor: '#566DF0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8
    
  },
  newConsultationSession: {
    backgroundColor: '#fff',
    height: 200,
    width: '100%',
    justifyContent: 'space-around',
    borderRadius: 8,
    shadowColor: '#3a4252',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    margin: 0
  }
})