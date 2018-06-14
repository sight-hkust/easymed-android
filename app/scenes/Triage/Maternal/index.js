import React, { Component } from 'react'
import {
  View,
  ScrollView,
  StatusBar, 
  StyleSheet, 
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-fontawesome-pro';
import { Button } from '../../../components/Button'
import Loading from '../../../components/Loading'
import DropdownAlert from 'react-native-dropdownalert';
import Header from '../../../components/Header';
import DatePicker from '../../../components/DatePicker';
import BooleanSelect from '../../../components/BooleanSelect';
import { addGynaecologyInfo } from '../../../actions/record';

const device = {
  height: Platform.select({ios: Dimensions.get('window').height, android: Dimensions.get('window').height - StatusBar.currentHeight}),
  width: Dimensions.get('window').width
}

class Maternal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queueId: props.match.params.queueId,
      isPatientPregnant: false,
      gynaecology: {
        lastMenstrualPeriodDate: null,
        gestationalAge: '',
        breastFeeding: '',
        contraceptiveUse: '',
        abortion: '',
        stillBorn: ''
      },
      dismiss: false
    }
    this.addGynaecologyInfo = this.props.actions.addGynaecologyInfo.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.hasTaskCompleted !== nextProps.hasTaskCompleted) {
      this.dropdown.alertWithType('success', 'Success', `Patient's maternal information has been successfully saved.`)
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
    this.addGynaecologyInfo(this.state.gynaecology, this.state.queueId)
  }

  render() {
    if(this.state.dismiss) {
      return <Redirect to={`/triage/patients/${this.props.match.params.queueId}`}/>
    }
    else {
      return (
        <KeyboardAwareScrollView style={styles.container}>
          <View style={{backgroundColor: '#9687e3', height: device.height*.12}}>
            <Header light="true" title="Maternal" style={styles.header} warning callback={()=>{this.setState({dismiss: true})}}/>
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
                  <Text style={styles.instruction}>Is patient pregnant?</Text>
                </View>
              </View>
              <View style={styles.pageBottom}>
                  <BooleanSelect onSelect={(isPatientPregnant) =>
                    this.setState({ isPatientPregnant })}/>
              </View>
            </View>
            <View style={{width: device.width}}>
              <View style={styles.pageTop}>
                <View style={styles.textWrapper}>
                  <Text style={styles.instruction}>LMP Date</Text>
                </View>
              </View>
              <View style={styles.pageBottom}>
                <DatePicker onSelect={(lastMenstrualPeriodDate) =>
                  this.setState( ({gynaecology}) => ({ gynaecology: { ...gynaecology, lastMenstrualPeriodDate }}) )
                }/>
                <View style={styles.dateDisplay}>
                  <Text style={{fontFamily:'Quicksand-Medium', color:this.state.gynaecology.lastMenstrualPeriodDate?'#3c4859':'#A8B0CE', fontSize:18}}>
                    {this.state.gynaecology.lastMenstrualPeriodDate?this.state.gynaecology.lastMenstrualPeriodDate.toDateString():'Last menstrual period date'}
                  </Text>
                </View>
              </View>
            </View>
            { this.state.isPatientPregnant && <View style={{width: device.width}}>
              <View style={styles.pageTop}>
                <View style={styles.textWrapper}>
                  <Text style={styles.instruction}>Gestational Age</Text>
                </View>
              </View>
              <View style={styles.pageBottom}>
                <View style={styles.inputWrapper}>
                    <TextInput 
                      onChangeText={(gestationalAge) => this.setState(
                        ({gynaecology}) => ({gynaecology: {...gynaecology, gestationalAge}})
                      )}
                      placeholder="Month / Weeks"
                      underlineColorAndroid='transparent'
                      keyboardType="numeric"
                      style={{
                        height: '100%',
                        width: '100%',
                        backgroundColor: 'white',
                        textAlignVertical: 'top',
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        fontSize: 24,
                        fontFamily: 'Nunito-Regular'
                      }}
                    />
                  </View>
              </View>
            </View>}
            { this.state.isPatientPregnant && <View style={{width: device.width}}>
              <View style={styles.pageTop}>
                <View style={styles.textWrapper}>
                  <Text style={styles.instruction}>Still Born Rate</Text>
                </View>
              </View>
              <View style={styles.pageBottom}>
                <View style={styles.inputWrapper}>
                    <TextInput 
                      onChangeText={(stillBorn) => this.setState(
                        ({gynaecology}) => ({gynaecology: {...gynaecology, stillBorn}})
                      )}
                      placeholder="Percentage"
                      keyboardType="numeric"
                      underlineColorAndroid='transparent'
                      style={{
                        height: '100%',
                        width: '100%',
                        backgroundColor: 'white',
                        textAlignVertical: 'top',
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        fontSize: 24,
                        fontFamily: 'Nunito-Regular'
                      }}
                    />
                  </View>
              </View>
            </View>}
            { this.state.isPatientPregnant && <View style={{width: device.width}}>
              <View style={styles.pageTop}>
                <View style={styles.textWrapper}>
                  <Text style={styles.instruction}>Abortion Rate</Text>
                </View>
              </View>
              <View style={styles.pageBottom}>
                <View style={styles.inputWrapper}>
                    <TextInput 
                      onChangeText={(abortion) => this.setState(
                        ({gynaecology}) => ({gynaecology: {...gynaecology, abortion}})
                      )}
                      placeholder="Percentage"
                      keyboardType="numeric"
                      underlineColorAndroid='transparent'
                      style={{
                        height: '100%',
                        width: '100%',
                        backgroundColor: 'white',
                        textAlignVertical: 'top',
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        fontSize: 24,
                        fontFamily: 'Nunito-Regular'
                      }}
                    />
                  </View>
              </View>
            </View>}
            {!this.state.isPatientPregnant && <View style={{width: device.width}}>
              <View style={styles.pageTop}>
                <View style={styles.textWrapper}>
                  <Text style={styles.instruction}>Breast Feeding</Text>
                </View>
              </View>
              <View style={styles.pageBottom}>
                  <BooleanSelect onSelect={(breastFeeding) =>
                    this.setState( ({gynaecology}) => ({ gynaecology: { ...gynaecology, breastFeeding }}) )
                  }/>
              </View>
            </View>}
            {!this.state.isPatientPregnant && <View style={{width: device.width}}>
              <View style={styles.pageTop}>
                <View style={styles.textWrapper}>
                  <Text style={styles.instruction}>Contraceptive Use</Text>
                </View>
              </View>
              <View style={styles.pageBottom}>
                  <BooleanSelect onSelect={(contraceptiveUse) =>
                    this.setState( ({gynaecology}) => ({ gynaecology: { ...gynaecology, contraceptiveUse }}) )
                  }/>
              </View>
            </View>}
          </ScrollView>
            <Button 
              title="Submit" 
              onPress={this.submit.bind(this)} 
              bgColor="#1d9dff" titleColor="#fff" 
              icon="chevron-right"
              width="50%"
              round
            />
          <Loading isLoading={this.props.loading} />
          <DropdownAlert ref={ref => this.dropdown = ref} onClose={data => this.onClose(data)} closeInterval={2500}/>
        </KeyboardAwareScrollView>
      )
    }
  }
}

const mapStateToProps = (state, props) => ({
  loading: state.records.loading.spinner,
  hasTaskCompleted: !state.patients.checklist[props.match.params.queueId].includes('gynaecology'),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({addGynaecologyInfo}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Maternal)

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
    backgroundColor: '#9687e3',
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
    borderRadius: 6,
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 5,
    width: device.width * .55,
    height: 64,
    marginTop: 12,
    paddingHorizontal: 4,
    paddingVertical: 4
  },
})