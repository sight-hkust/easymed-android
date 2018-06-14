import React, { Component } from 'react'
import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  Dimensions
} from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-native';
import DropdownAlert from 'react-native-dropdownalert';
import Loading from '../../../components/Loading'
import Header from '../../../components/Header';
import {updateMedicalCondition} from '../../../actions/record'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from '../../../components/Button'

const device = {
  height: Platform.select({ios: Dimensions.get('window').height, android: Dimensions.get('window').height-StatusBar.currentHeight}),
  width: Dimensions.get('window').width
}

class Miscellaneous extends Component {
  constructor(props) {
    super(props);
    this.updateMedicalCondition = this.props.actions.updateMedicalCondition.bind(this)
    this.state = {
      queueId: props.match.params.queueId,
      miscellaneous: {
        drugHistory: '',
        familyHistory: '',
        allergies: '',
        ROS: ''
      },
      dismiss: false
    }
  }

  componentWillMount() {
    StatusBar.setBarStyle('light-content')
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.hasTaskCompleted !== nextProps.hasTaskCompleted) {
      this.dropdown.alertWithType('success', 'Success', `Patient's background has been updated.`)
    }
  }

  onClose(data) {
    if(data.type === 'success') {
      this.setState({dismiss: true})
    }
  }

  submit() {
    this.updateMedicalCondition(this.state.miscellaneous, this.props.patientId, this.props.match.params.queueId)
  }

  render() {
    if(this.state.dismiss) {
      return <Redirect to={`/triage/patients/${this.props.match.params.queueId}`}/>
    }
    else {
      return (
        <KeyboardAwareScrollView style={styles.container}>
          <View style={{backgroundColor: '#fdca4d', height: device.height*.12}}>
            <Header light="true" title="Miscellaneous" style={styles.header} warning callback={()=>{this.setState({dismiss: true})}}/>
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
                  <Text style={styles.instruction}>Drug History</Text>
                </View>
              </View>
              <View style={styles.pageBottom}>
                <View style={styles.inputWrapper}>
                  <TextInput 
                    multiline={true}
                    placeholder="Enter patients' drug history here"
                    onChangeText={(drugHistory) => this.setState(
                      ({miscellaneous}) => ({miscellaneous: {...miscellaneous, drugHistory}})
                    )}
                    underlineColorAndroid='transparent'
                    style={styles.input}
                  />
                </View>
              </View>
            </View>
            <View style={{width: device.width}}>
              <View style={styles.pageTop}>
                <View style={styles.textWrapper}>
                  <Text style={styles.instruction}>Family History</Text>
                </View>
              </View>
              <View style={styles.pageBottom}>
                <View style={styles.inputWrapper}>
                  <TextInput 
                    multiline={true}
                    onChangeText={(familyHistory) => this.setState(
                      ({miscellaneous}) => ({miscellaneous: {...miscellaneous, familyHistory}})
                    )}
                    placeholder="Enter patients' family history here"
                    underlineColorAndroid='transparent'
                    style={styles.input}
                  />
                </View>
              </View>
            </View>
            <View style={{width: device.width}}>
              <View style={styles.pageTop}>
                <View style={styles.textWrapper}>
                  <Text style={styles.instruction}>Allergies</Text>
                </View>
              </View>
              <View style={styles.pageBottom}>
                <View style={styles.inputWrapper}>
                  <TextInput 
                    multiline={true}
                    onChangeText={(allergies) => this.setState(
                      ({miscellaneous}) => ({miscellaneous: {...miscellaneous, allergies}})
                    )}
                    placeholder="Enter patients' allergies here"
                    underlineColorAndroid='transparent'
                    style={styles.input}
                  />
                </View>
              </View>
            </View>
            <View style={{width: device.width}}>
              <View style={styles.pageTop}>
                <View style={styles.textWrapper}>
                  <Text style={styles.instruction}>Review Of System</Text>
                </View>
              </View>
              <View style={styles.pageBottom}>
                <View style={styles.inputWrapper}>
                  <TextInput 
                    multiline={true}
                    onChangeText={(ROS) => this.setState(
                      ({miscellaneous}) => ({miscellaneous: {...miscellaneous, ROS}})
                    )}
                    placeholder="Enter information on the observation for ROS here"
                    underlineColorAndroid='transparent'
                    style={styles.input}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={{marginTop: 32}}>
          {
            this.state.miscellaneous.allergies.length > 0 &&
            this.state.miscellaneous.drugHistory.length > 0 &&
            this.state.miscellaneous.familyHistory.length > 0 &&
            <Button 
              title="Submit" 
              onPress={this.submit.bind(this)} 
              bgColor="#1d9dff" titleColor="#fff" 
              icon="chevron-right"
              width="50%"
              round
            />
          }
          </View>
          <Loading isLoading={this.props.loading} />
          <DropdownAlert ref={ref => this.dropdown = ref} onClose={data => this.onClose(data)} closeInterval={2500}/>
        </KeyboardAwareScrollView>
      )
    }
  }
}

const mapStateToProps = (state, props) => ({
  loading: state.records.loading.spinner,
  patientId: state.patients.queue[props.match.params.queueId].id,
  hasTaskCompleted: !state.patients.checklist[props.match.params.queueId].includes('misc'),
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({updateMedicalCondition}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Miscellaneous)

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
  inputWrapper: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 5,
    width: device.width*.9,
    height: device.height*.4,
    marginTop: 12,
    paddingHorizontal: 4,
    paddingVertical: 4
  },
  submit: {
    alignSelf:'flex-end', 
    backgroundColor: '#fff', 
    marginTop: 24, 
    marginRight: 24 , 
    borderRadius: 22, 
    elevation: 2
  },
  pageBottom: {
    alignItems: 'center'
  },
  pageTop: {
    backgroundColor: '#fdca4d',
    height: device.height*.25
  },
  input: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    textAlignVertical: 'top',
    paddingHorizontal: 6,
    paddingVertical: 4,
    lineHeight: 36,
    fontSize: 18,
    fontFamily: 'Nunito-Regular'
  }
})