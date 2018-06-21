import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  Platform
} from 'react-native'
import { Redirect } from 'react-router-native';
import DropdownAlert from 'react-native-dropdownalert'
import { addVitalsRecord } from '../../../actions/record';
import Icon from 'react-native-fontawesome-pro';
import { Button } from '../../../components/Button'
import Loading from '../../../components/Loading'
import Header from '../../../components/Header';
import DatePicker from '../../../components/DatePicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const device = {
  height: Platform.select({ios: Dimensions.get('window').height, android: Dimensions.get('window').height - StatusBar.currentHeight}),
  width: Dimensions.get('window').width
}

class Vitals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      queueId: props.match.params.queueId,
      vitals: {
        pulseRate: '',
        bloodPressure: {
          systolic: '',
          diastolic: ''
        },
        respiratoryRate: '',
        temperature: '',
        glucoseLevel: '',
        bloodOxygenSaturation: '',
        weight: '',
        height: '',
        lastDewormingDate: null
      },
      dismiss: false
    }
    this.addVitalsRecord = this.props.actions.addVitalsRecord.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.error !== nextProps.error) {
      this.dropdown.alertWithType('error', 'Error', `${nextProps.error}`)
    }
  }
  
  componentDidUpdate() {
    if(this.props.hasTaskCompleted && !this.state.dismiss) {
      this.dropdown.alertWithType('success', 'Success', `Patient's vitals information has been successfully saved.`)
    }
  }

  onClose(data) {
    if(data.type === 'success') {
      this.setState({dismiss: true})
    }
  }

  componentWillMount() {
    StatusBar.setBarStyle('light-content')
  }

  submit() {
    this.addVitalsRecord(this.state.vitals, this.state.queueId)
  }

  render() {
    if (this.state.dismiss) {
      return <Redirect to={`/triage/patients/${this.state.queueId}`}/>
    } else {
      return (
        <KeyboardAwareScrollView style={styles.container}>
          <View style={{backgroundColor: '#f0788a', height: device.height*.12}}>
            <Header light="true" title="Vitals" style={styles.header} warning callback={()=>{this.setState({dismiss: true})}}/>
          </View>
          <ScrollView
            horizontal
            pagingEnabled
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
          >
            <View style={{width: device.width}}>
              <View style={styles.pageTop}>
                <View style={styles.textWrapper}>
                  <Text style={styles.instruction}>Weight and Height</Text>
                </View>
              </View>
              <View style={styles.pageBottom}>
                <View style={styles.inputWrapper}>
                  <Icon name="weight" type="solid" size={24} color="#CED4D9" />
                  <TextInput 
                    onChangeText={(weight) => this.setState(
                      ({vitals}) => ({vitals: {...vitals, weight}})
                    )}
                    placeholder="Weight"
                    underlineColorAndroid='transparent'
                    keyboardType="numeric"
                    style={styles.input}
                  />
                  <View style={styles.unit}>
                    <Text style={{fontFamily: 'Nunito-Bold', fontSize: 18, color: '#fff'}}>KG</Text>
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <Icon name="ruler-vertical" type="solid" size={24} color="#CED4D9" />
                  <TextInput 
                    onChangeText={(height) => this.setState(
                      ({vitals}) => ({vitals: {...vitals, height}})
                    )}
                    placeholder="Height"
                    underlineColorAndroid='transparent'
                    keyboardType="numeric"
                    style={styles.input}
                  />
                  <View style={styles.unit}>
                    <Text style={{fontFamily: 'Nunito-Bold', fontSize: 18, color: '#fff'}}>CM</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{width: device.width}}>
              <View style={styles.pageTop}>
                <View style={styles.textWrapper}>
                  <Text style={styles.instruction}>Temperature</Text>
                </View>
              </View>
              <View style={styles.pageBottom}>
                <View style={styles.inputWrapper}>
                  <Icon name="thermometer-half" type="solid" size={24} color="#CED4D9" />
                  <TextInput 
                    onChangeText={(temperature) => this.setState(
                      ({vitals}) => ({vitals: {...vitals, temperature}})
                    )}
                    placeholder="Temperature"
                    underlineColorAndroid='transparent'
                    keyboardType="numeric"
                    style={styles.input}
                  />
                  <View style={styles.unit}>
                    <Text style={{fontFamily: 'Nunito-Bold', fontSize: 18, color: '#fff'}}>℃</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{width: device.width}}>
              <View style={styles.pageTop}>
                <View style={styles.textWrapper}>
                  <Text style={styles.instruction}>Pulse and Respiration rate</Text>
                </View>
              </View>
              <View style={styles.pageBottom}>
                <View style={styles.inputWrapper}>
                  <Icon name="heartbeat" type="solid" size={24} color="#CED4D9" />
                  <TextInput 
                    onChangeText={(pulseRate) => this.setState(
                      ({vitals}) => ({vitals: {...vitals, pulseRate}})
                    )}
                    placeholder="Pulse Rate"
                    underlineColorAndroid='transparent'
                    keyboardType="numeric"
                    style={styles.input}
                  />
                  <View style={styles.unit}>
                    <Text style={{fontFamily: 'Nunito-Bold', fontSize: 18, color: '#fff'}}>BPM</Text>
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <Icon name="chart-bar" type="solid" size={24} color="#CED4D9" />
                  <TextInput 
                    onChangeText={(respiratoryRate) => this.setState(
                      ({vitals}) => ({vitals: {...vitals, respiratoryRate}})
                    )}
                    placeholder="Respiratory Rate"
                    underlineColorAndroid='transparent'
                    keyboardType="numeric"
                    style={styles.input}
                  />
                  <View style={styles.unit}>
                    <Text style={{fontFamily: 'Nunito-Bold', fontSize: 18, color: '#fff'}}>BPM</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{width: device.width}}>
              <View style={styles.pageTop}>
                <View style={styles.textWrapper}>
                  <Text style={styles.instruction}>Blood Oxygen Saturation</Text>
                </View>
              </View>
              <View style={styles.pageBottom}>
                <View style={styles.inputWrapper}>
                  <Icon name="tachometer-alt" type="solid" size={24} color="#CED4D9" />
                  <TextInput 
                    onChangeText={(bloodOxygenSaturation) => this.setState(
                      ({vitals}) => ({vitals: {...vitals, bloodOxygenSaturation}})
                    )}
                    placeholder="SpO2"
                    underlineColorAndroid='transparent'
                    keyboardType="numeric"
                    style={styles.input}
                  />
                  <View style={styles.unit}>
                    <Text style={{fontFamily: 'Nunito-Bold', fontSize: 18, color: '#fff'}}>%</Text>
                  </View>
                </View>
              </View>
            </View>
            { this.props.patient.age >= 18 && <View style={{width: device.width}}>
              <View style={styles.pageTop}>
                <View style={styles.textWrapper}>
                  <Text style={styles.instruction}>Blood Pressure</Text>
                </View>
              </View>
              <View style={styles.pageBottom}>
                <View style={styles.inputWrapper}>
                  <Icon name="arrow-to-top" type="solid" size={24} color="#CED4D9" />
                  <TextInput 
                    onChangeText={(systolic) => this.setState(
                      ({vitals}) => ({vitals: {...vitals, bloodPressure: {...vitals.bloodPressure, systolic}}})
                    )}
                    placeholder="Upper"
                    underlineColorAndroid='transparent'
                    keyboardType="numeric"
                    style={styles.input}
                  />
                  <View style={styles.unit}>
                    <Text style={{fontFamily: 'Nunito-Bold', fontSize: 16, color: '#fff'}}>mmHg</Text>
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <Icon name="arrow-to-bottom" type="solid" size={24} color="#CED4D9" />
                  <TextInput 
                    onChangeText={(diastolic) => this.setState(
                      ({vitals}) => ({vitals: {...vitals, bloodPressure: {...vitals.bloodPressure, diastolic}}})
                    )}
                    placeholder="Lower"
                    underlineColorAndroid='transparent'
                    keyboardType="numeric"
                    style={styles.input}
                  />
                  <View style={styles.unit}>
                    <Text style={{fontFamily: 'Nunito-Bold', fontSize: 16, color: '#fff'}}>mmHg</Text>
                  </View>
                </View>
              </View>
            </View>}
            <View style={{width: device.width}}>
              <View style={styles.pageTop}>
                <View style={styles.textWrapper}>
                  <Text style={styles.instruction}>Last Deworming Date</Text>
                </View>
              </View>
              <View style={styles.pageBottom}>
                <DatePicker onSelect={(lastDewormingDate) =>
                  this.setState( ({vitals}) => ({ vitals: { ...vitals, lastDewormingDate }}) )
                }/>
                <View style={styles.dateDisplay}>
                  <Text style={{fontFamily:'Quicksand-Medium', color:this.state.vitals.lastDewormingDate?'#3c4859':'#A8B0CE', fontSize:18}}>
                    {this.state.vitals.lastDewormingDate?this.state.vitals.lastDewormingDate.toDateString():'Last deworming date'}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
          {
            this.state.vitals.temperature.length > 0 &&
            this.state.vitals.weight.length > 0 &&
            <Button 
              title="Submit" 
              onPress={this.submit.bind(this)} 
              bgColor="#1d9dff" titleColor="#fff" 
              icon="chevron-right"
              width="50%"
              round
            />
          }
          <Loading isLoading={this.props.loading} />
          <DropdownAlert ref={ref => this.dropdown = ref} onClose={data => this.onClose(data)} closeInterval={2500}/>
        </KeyboardAwareScrollView>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({addVitalsRecord}, dispatch)
})

const mapStateToProps = (state, props) => ({
  loading: state.records.loading.spinner,
  patient: state.patients.queue[props.match.params.queueId],
  hasTaskCompleted: !state.patients.checklist[props.match.params.queueId].includes('vitals'),
  error: state.records.error
})

export default connect(mapStateToProps, mapDispatchToProps)(Vitals)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fb',
  },
  header: {
    marginTop: device.height*.04
  },
  textWrapper: {
    marginTop: 20,
    paddingHorizontal: 18,
    backgroundColor: 'transparent',
    paddingBottom: '12%'
  },
  instruction: {
    fontSize: 26,
    fontFamily: 'Nunito-Bold',
    textAlign: 'left',
    color: '#fff',
  },
  pageTop: {
    backgroundColor: '#f0788a',
    height: device.height*.25
  },
  pageBottom: {
    alignItems: 'center', 
    paddingTop: device.height*.05
  },
  dateDisplay: {
    backgroundColor:'#fff', 
    borderRadius:5, 
    marginVertical: 24,
    height: 64, 
    width: device.width * 0.65, 
    alignSelf:'center',
    alignItems:'center', 
    justifyContent:'center', 
    shadowColor: '#e4e4e4', 
    shadowOpacity: 0.5, 
    shadowOffset: {
       width: 1,
       height: 3 
    }, 
    shadowRadius: 5
  },
  submit: {
    alignSelf:'flex-end', 
    backgroundColor: '#fff', 
    marginTop: 24, 
    marginRight: 24 , 
    borderRadius: 22, 
    elevation: 2
  },
  inputWrapper: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 5,
    width: device.width * .75,
    height: device.height*.08,
    marginTop: 12,
    paddingLeft: 12,
    alignItems: 'center',
    flexDirection: 'row'
  },
  input: {
    flex: 5,
    backgroundColor: 'white',
    textAlignVertical: 'top',
    height: device.height*.08,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 8,
    marginVertical: 4,
    fontSize: 18,
    fontFamily: 'Nunito-Regular'
  },
  unit: {
    backgroundColor: '#7D8E9C', 
    borderTopRightRadius: 6, 
    borderBottomRightRadius: 6,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2
  }
})