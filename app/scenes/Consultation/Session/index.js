import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Alert,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  StatusBar, 
  StyleSheet, 
  Text, 
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native'
import Modal from 'react-native-modal'
import { Redirect } from 'react-router-native';
import SketchDraw from 'react-native-sketch-draw'
import { addCase } from '../../../actions/record';
import { fetchMedicines, fetchMedicalDiagnosises } from '../../../actions/record';
import DropdownAlert from 'react-native-dropdownalert'; 
import { Button } from '../../../components/Button'
import Loading from '../../../components/Loading';
import Icon from 'react-native-fontawesome-pro';
import Header from '../../../components/Header';

const device = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width
}

const methods = ['PO', 'VR', 'Topical', 'IV', 'Eye Drop', 'Nose Drop', 'Ear Drop', 'Chewing', 'Sucking', 'Anal Route', 'Sublingual', 'Clean', 'SC'];
const options = ['OD', 'BID', 'TID', 'QID', 'NA'];
const dayIntervals = ['/7', '/52', '/12', '/30'];

class HorizontalListPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: ''
    }
  }

  render() {
    const outlineButtonBaseStyle = {
      borderRadius: device.height*.025, 
      borderWidth: 2, 
      borderColor: '#5F70A2', 
      marginHorizontal: 6, 
      justifyContent: 'center', 
      alignItems: 'center', 
      width: device.width*.2, 
      height: device.height*.05
    }
    const selectedButtonStyle = {
      ...outlineButtonBaseStyle,
      backgroundColor: '#5F70A2',
    }
    const textStyle = {
      fontFamily: 'Nunito-Regular',
      fontSize: 14
    }
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center', height: 56}}
      >
        {
          this.props.items.map((item, i) =>
          <TouchableOpacity 
            key={i} 
            style={this.state.selected === item?{...selectedButtonStyle}:{...outlineButtonBaseStyle}}
            onPress={() => {
              this.props.onSelect(item)
              this.setState({selected: item})
            }}
          >
            <Text style={{...textStyle, color: this.state.selected===item?'#fff':'#5F70A2'}}>{item}</Text>
          </TouchableOpacity>)
        }
      </ScrollView>
    )
  }
}

const screenWidth = Dimensions.get('window').width

const SketchDrawConstants = SketchDraw.constants;

const tools = {};
 
tools[SketchDrawConstants.toolType.pen.id] = {
    id: SketchDrawConstants.toolType.pen.id,
    name: SketchDrawConstants.toolType.pen.name,
    nextId: SketchDrawConstants.toolType.eraser.id
};
tools[SketchDrawConstants.toolType.eraser.id] = {
    id: SketchDrawConstants.toolType.eraser.id,
    name: SketchDrawConstants.toolType.eraser.name,
    nextId: SketchDrawConstants.toolType.pen.id
};

const Toolbar = () => (
  <View style={styles.toolbar}>
    <View style={{width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
      <Icon name="heartbeat" size={28}/>
    </View>
    <View style={{width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
      <Icon name="pills" size={28}/>
    </View>
    <View style={{width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
      <Icon name="female" size={28}/>
    </View>
  </View>
)


class Session extends Component {
  constructor(props) {
    super(props);
    this.toggleDrawingBoard = this.toggleDrawingBoard.bind(this);
    this.fetchMedicines = this.props.actions.fetchMedicines.bind(this)
    this.fetchMedicalDiagnosises = this.props.actions.fetchMedicalDiagnosises.bind(this)
    this.addCase = this.props.actions.addCase.bind(this)
    this.state = {
      pathPrefix: props.match.url,
      toolSelected: SketchDrawConstants.toolType.pen.id,
      xOffset:0,
      pictureSource: null,
      isCurrentlyDrawing: false,
      displayPrescriptionDetailDialog: false,
      session: {
        hpi: '',
        physicalExaminations: '',
        investigation: '',
        diagnosis: {
          existing: {},
          added: []
        },
        prescriptions: {},
        advice: '',
        followUp: '',
        referNotice: ''
      },
      prescriptionDialog: {
        show: false,
        medId: '',
        description: '',
        unit: '',
        concentration: '',
        instruction: {
          intake: '',
          frequency: '',
          duration: '',
          interval: ''
        }
      },
      showCompletedDiagnosis: false,
      showCompletedPrescriptions: false,
      prescriptionQueryResult: [],
      diagnosisesQueryResult: [],
      diagnosisQueryText: '',
      prescriptionQueryText: '',
      drawingColor: '#f00',
      options: {
        title: 'Select Picture',
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      },
      dismiss: false
    }
  }

  isEraserToolSelected() {
    return this.state.toolSelected === SketchDrawConstants.toolType.eraser.id;
  }

  toolChangeClick() {
    this.setState({toolSelected: tools[this.state.toolSelected].nextId});
  }

  getToolName() {
    return tools[this.state.toolSelected].name;
  }

  onSketchSave(saveEvent) {
    this.props.onSave && this.props.onSave(saveEvent);
  }

  toggleMarkerColor() {
    this.setState({drawingColor: this.state.drawingColor==='#f00'?'#000':'#f00'})
  }

  toggleDrawingBoard(){
    this.setState({isCurrentlyDrawing: !this.state.isCurrentlyDrawing})
  }

  togglePrescriptionDetailDialog(){
    this.setState({displayPrescriptionDetailDialog: !this.state.displayPrescriptionDetailDialog})
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content')
    this.fetchMedicines()
    this.fetchMedicalDiagnosises()
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if(this.props.isPatientTransferred !== nextProps.isPatientTransferred) {
      this.dropdown.alertWithType('info', 'Info', `Patient has been transferred to pharmacy`)
    }
  }

  onClose(data) {
    if(data.type === 'info') {
      this.setState({dismiss: true})
    }
  }

  submit() {
    this.addCase(this.state.session, this.props.match.params.patientId)
  }

  render() {
    if(this.state.dismiss) {
      return <Redirect to={`/consultations`}/>
    }
    else {
      return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
          <KeyboardAvoidingView style={styles.container}>
            <Header title="Consultation" to={this.state.pathPrefix.replace('/session', '')}/>
            {/* <Step allSteps={stepsLength} step={xOffset/width} backgroundColor='#fff' highlightColor='#FAEB9A' /> */}
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator = {false}
              scrollEventThrottle = {1}
            >
              <View style={{width: screenWidth}}>
                <View style={styles.inputWrapper}>
                  <TextInput 
                    multiline={true}
                    placeholder="HPI Remarks"
                    underlineColorAndroid='transparent'
                    onChangeText={(hpi) => {this.setState(({session}) => ({session: {...session, hpi}}))}}
                    style={{
                      height: '100%',
                      width: '100%',
                      lineHeight: 24,
                      backgroundColor: 'white',
                      textAlignVertical: 'top',
                      paddingHorizontal: 6,
                      paddingVertical: 4,
                      fontSize: 18,
                      fontFamily: 'Nunito-Regular'
                    }}
                  />
                </View>
              </View>
              <View style={{width: screenWidth}}>
                <View style={styles.inputWrapper}>
                  <TextInput 
                    multiline={true}
                    placeholder="Physical Examination Remarks"
                    underlineColorAndroid='transparent'
                    onChangeText={(physicalExaminations) => {this.setState(({session}) => ({session: {...session, physicalExaminations}}))}}
                    style={{
                      height: '100%',
                      width: '100%',
                      lineHeight: 24,
                      backgroundColor: 'white',
                      textAlignVertical: 'top',
                      paddingHorizontal: 6,
                      paddingVertical: 4,
                      fontSize: 18,
                      fontFamily: 'Nunito-Regular'
                    }}
                  />
                </View>
              </View>
              <View style={{width: screenWidth, justifyContent: 'center'}}>
                <Button 
                      title='Annotate Remarks' 
                      bgColor='#91D2CC' titleColor='#fff' 
                      icon='edit'
                      width='64%'
                      onPress={this.toggleDrawingBoard}
                />
                <Modal isVisible={this.state.isCurrentlyDrawing}>
                  <View style={{flex: 1}}>
                    <SketchDraw style={{flex: 1, backgroundColor: '#fff'}} ref="sketchRef"
                      selectedTool={this.state.toolSelected} 
                      toolColor={this.state.drawingColor}
                      onSaveSketch={this.onSketchSave.bind(this)}
                      localSourceImagePath={this.props.localSourceImagePath}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, paddingVertical: 12}}>
                      <TouchableOpacity style={styles.drawingButtons} onPress={() => { this.refs.sketchRef.clearSketch() }} >
                        <Icon name="redo-alt" color="#fff" size={22}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.drawingButtons} onPress={() => { this.refs.sketchRef.saveSketch() }}>
                        <Icon name="save" color="#fff" size={22}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.drawingButtons} onPress={this.toolChangeClick.bind(this)}>
                        <Icon name={this.isEraserToolSelected()?'eraser':'pen'} color="#fff" size={22}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={{...StyleSheet.flatten(styles.drawingButtons), backgroundColor: this.state.drawingColor}} onPress={this.toggleMarkerColor.bind(this)}>
                        <Icon name="paint-brush" type="solid" color="#fff" size={22}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.drawingButtons} onPress={this.toggleDrawingBoard}>
                        <Icon name="times" color="#fff" size={22}/>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
              <View style={{width: screenWidth}}>
                <View style={styles.inputWrapper}>
                  <TextInput 
                    multiline={true}
                    placeholder="Investigation"
                    underlineColorAndroid='transparent'
                    onChangeText={(investigation) => {this.setState(({session}) => ({session: {...session, investigation}}))}}
                    style={{
                      height: '100%',
                      width: '100%',
                      lineHeight: 24,
                      backgroundColor: 'white',
                      textAlignVertical: 'top',
                      paddingHorizontal: 6,
                      paddingVertical: 4,
                      fontSize: 18,
                      fontFamily: 'Nunito-Regular'
                    }}
                  />
                </View>
              </View>
              <View style={{width: screenWidth, alignItems: 'center'}}>
                <View style={styles.search}>
                  <Icon name="stethoscope" color="#3c4859" size={18}/>
                  <TextInput
                    underlineColorAndroid='transparent'
                    onFocus={() => {
                      this.setState({showCompletedDiagnosis: false})
                    }}
                    onBlur={() => this.setState({showCompletedDiagnosis: true})}
                    onChangeText={(query) => {
                      this.setState({diagnosisQueryText: query})
                      this.setState({diagnosisesQueryResult: this.props.diagnosises.filter(({name: {name}}) => query.length>0?name.toLowerCase().includes(query.toLocaleLowerCase()):false)})
                    }}
                    style={{
                      height: '100%', fontSize: 16, fontFamily: 'Quicksand-Medium', color: '#3c4859', paddingHorizontal: 16, width: '88%'}}
                    placeholder="Search Diagnosis"
                  >
                  </TextInput>
                  {
                    this.state.diagnosisesQueryResult.length===0 &&
                    this.state.diagnosisQueryText.length > 0 &&
                    <TouchableOpacity onPress={() => {
                      Alert.alert(
                        'Confirm Diagnosis?',
                        this.state.diagnosisQueryText,
                        [
                          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                          {text: 'OK', onPress: () => {
                            this.setState(({session}) => ({session: {...session, diagnosis:{...session.diagnosis, added: [...session.diagnosis.added, this.state.diagnosisQueryText]}}}))
                          }}
                        ]
                      )
                    }}>
                      <Icon name="plus-circle" size={22} color="#1d9dff" type="solid"/>
                    </TouchableOpacity>
                  }
                </View>
                {
                  (Object.keys(this.state.session.diagnosis.existing).length > 0 ||
                  this.state.session.diagnosis.added.length > 0) &&
                  this.state.diagnosisQueryText.length === 0 &&
                  this.state.showCompletedDiagnosis &&
                  <View style={styles.queryResult}>
                    <ScrollView>
                      {
                        Object.keys(this.state.session.diagnosis.existing).map((diagnosis, i) => 
                          <TouchableOpacity 
                            style={{justifyContent: 'space-between', marginVertical: 4, flexDirection: 'row'}}
                            key={i}
                            onPress={() => {
                              Alert.alert(
                                'Remove Diagnosis?',
                                `The following diagnosis will be removed from patient's record:\n ${this.state.session.diagnosis.existing[diagnosis]}`,
                                [
                                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                  {text: 'OK', onPress: () => {
                                    const diagnosises = this.state.session.diagnosis.existing
                                    delete diagnosises[diagnosis]
                                    this.setState(({session}) => ({session:{ ...session, diagnosis: {
                                      ...session.diagnosis,
                                      existing: diagnosises
                                    }}}))
                                  }}
                                ]
                              )
                            }}
                          >
                            <Text style={{fontFamily: 'Nunito-Bold', fontSize: 18, color: '#3c4859'}}>{this.state.session.diagnosis.existing[diagnosis]}</Text>
                            <Icon name="minus-circle" type="solid" size={18} color="#EF476F"/>
                          </TouchableOpacity>
                        )
                      }
                      {
                        this.state.session.diagnosis.added.map((name, i) => (
                          <TouchableOpacity 
                            style={{justifyContent: 'space-between', marginVertical: 4, flexDirection: 'row'}}
                            key={i}
                            onPress={() => {
                              Alert.alert(
                                'Remove Diagnosis?',
                                `The following diagnosis will be removed from patient's record:\n ${name}`,
                                [
                                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                  {text: 'OK', onPress: () => {
                                    this.setState(({session}) => ({session:{ ...session, diagnosis: {
                                      ...session.diagnosis,
                                      added: session.diagnosis.added.filter(diagnosis => diagnosis!==name)
                                    }}}))
                                    console.log(this.state.session.diagnosis)
                                  }}
                                ]
                              )
                            }}
                          >
                            <Text style={{fontFamily: 'Nunito-Bold', fontSize: 18, color: '#3c4859'}}>{name}</Text>
                            <Icon name="minus-circle" type="solid" size={18} color="#EF476F"/>
                          </TouchableOpacity>
                        ))
                      }
                    </ScrollView>
                  </View>
                }
                {
                  this.state.diagnosisQueryText.length > 0 &&
                  this.state.diagnosisesQueryResult.length>0 &&
                  <View style={styles.queryResult}>
                    <ScrollView>
                      {
                        this.state.diagnosisesQueryResult.map((diagnosis, i) => 
                          <TouchableOpacity 
                            style={{justifyContent: 'space-between', marginVertical: 4, flexDirection: 'row'}}
                            key={i}
                            onPress={
                              () => {
                                Alert.alert(
                                  'Confirm Diagnosis?',
                                  diagnosis.name,
                                  [
                                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                    {text: 'OK', onPress: () => {
                                      this.setState(({session}) => ({session:{ ...session, diagnosis: {
                                        ...session.diagnosis,
                                        existing: {...session.diagnosis.existing, [diagnosis.id]: diagnosis.name.name}
                                      }}}))
                                      console.log(this.state.session.diagnosis)
                                    }}
                                  ]
                                )
                              }
                            }
                          >
                            <Text style={{fontFamily: 'Nunito-Bold', fontSize: 18, color: '#3c4859'}}>{diagnosis.name.name}</Text>
                            <Icon name="plus" type="solid" size={18} color="#3c4859"/>
                          </TouchableOpacity>
                        )
                      }
                    </ScrollView>
                  </View>
                }
              </View>
              <View style={{width: screenWidth, alignItems: 'center'}}>
                <View style={styles.search}>
                  <Icon name="prescription-bottle" color="#3c4859" size={18} type="solid"/>
                  <TextInput
                    underlineColorAndroid='transparent'
                    onBlur={() => {this.setState({showCompletedPrescriptions: true})}}
                    onFocus={() => {this.setState({showCompletedPrescriptions: false})}}
                    onChangeText={(query) => {
                      this.setState({
                        prescriptionQueryText: query,
                        prescriptionQueryResult: this.props.medicines
                        .filter(({description}) => query.length>0?description.toLowerCase().includes(query.toLowerCase()):false)})
                      }
                    }
                    style={{
                      height: '100%', fontSize: 16, fontFamily: 'Quicksand-Medium', color: '#3c4859', paddingHorizontal: 16, width: '100%'}}
                    placeholder="Search Prescription"
                  >
                  </TextInput>
                </View>
                {
                  this.state.prescriptionQueryResult.length > 0 &&
                  <View style={styles.queryResult}>
                    <ScrollView>
                      {
                        this.state.prescriptionQueryResult.map((medication, i) =>
                          <TouchableOpacity 
                            key={i}
                            style={{justifyContent: 'space-between', marginVertical: 4, flexDirection: 'row'}}
                            onPress={() => {
                              Alert.alert(
                                `Add selected medication to patient's prescription?`,
                                medication['unit']?`${medication.description}\n${medication.concentration} ${medication.unit}`:`${medication.description}`,
                                [
                                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                  {text: 'OK', onPress: () => {
                                    this.setState(({prescriptionDialog}) => ({
                                      prescriptionDialog: {
                                        ...prescriptionDialog,
                                        show: true,
                                        description: medication.description,
                                        medId: medication.id,
                                        unit: medication.unit,
                                        concentration: medication.concentration
                                      }}))
                                  }}
                                ]
                              )
                            }}
                          >
                            <View>
                              <Text style={{fontFamily: 'Nunito-Bold', fontSize: 18, color: '#3c4859'}}>{medication.description}</Text>
                              <Text style={{fontFamily: 'Nunito-Regular', fontSize: 16, color: '#9facbd'}}>{medication.concentration} {medication.unit}</Text>
                            </View>
                            <Icon name="plus" type="solid" size={20} color="#3c4859"/>
                          </TouchableOpacity>
                        )
                      }
                    </ScrollView>
                  </View>
                }
                {
                  Object.keys(this.state.session.prescriptions).length > 0 &&
                  this.state.prescriptionQueryText.length === 0 &&
                  this.state.showCompletedPrescriptions &&
                  <View style={styles.queryResult}>
                    <ScrollView>
                    {
                      Object.keys(this.state.session.prescriptions).map((id, i) => (
                        <TouchableOpacity 
                          style={{justifyContent: 'space-between', marginVertical: 4, flexDirection: 'row'}}
                          key={i}
                          onPress={() => {
                            Alert.alert(
                              'Remove Prescription?',
                              `The following prescription will be removed from patient's record:\n ${this.state.session.prescriptions[id].description}`,
                              [
                                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                {text: 'OK', onPress: () => {
                                  const prescriptions = this.state.session.prescriptions
                                  delete prescriptions[id]
                                  this.setState(({session}) => ({session:{ ...session, prescriptions: {
                                    ...prescriptions
                                  }}}))
                                  console.log(this.state.session.prescriptions)
                                }}
                              ]
                            )
                          }}
                        >
                          <View>
                            <Text style={{fontFamily: 'Nunito-Bold', fontSize: 18, color: '#3c4859'}}>{this.state.session.prescriptions[id].description}</Text>
                            <Text style={{fontFamily: 'Nunito-Regular', fontSize: 16, color: '#9facbd'}}>{this.state.session.prescriptions[id].concentration} {this.state.session.prescriptions[id].unit}</Text>
                          </View>
                          <Icon name="minus-circle" type="solid" size={18} color="#EF476F"/>
                        </TouchableOpacity>
                      ))
                    }
                    </ScrollView>
                  </View>
                }
                </View>
                <View style={{width: screenWidth}}>
                  <View style={styles.inputWrapper}>
                    <TextInput 
                      multiline={true}
                      placeholder="Advice"
                      underlineColorAndroid='transparent'
                      onChangeText={(advice) => {this.setState(({session}) => ({session: {...session, advice}}))}}
                      style={{
                        height: '100%',
                        width: '100%',
                        lineHeight: 24,
                        backgroundColor: 'white',
                        textAlignVertical: 'top',
                        paddingHorizontal: 6,
                        paddingVertical: 4,
                        fontSize: 18,
                        fontFamily: 'Nunito-Regular'
                      }}
                    />
                  </View>
                </View>
                <View style={{width: screenWidth}}>
                  <View style={styles.inputWrapper}>
                    <TextInput 
                      multiline={true}
                      placeholder="Follow Up"
                      underlineColorAndroid='transparent'
                      onChangeText={(followUp) => {this.setState(({session}) => ({session: {...session, followUp}}))}}
                      style={{
                        height: '100%',
                        width: '100%',
                        lineHeight: 24,
                        backgroundColor: 'white',
                        textAlignVertical: 'top',
                        paddingHorizontal: 6,
                        paddingVertical: 4,
                        fontSize: 18,
                        fontFamily: 'Nunito-Regular'
                      }}
                    />
                  </View>
                </View>
                <View style={{width: screenWidth}}>
                  <View style={styles.inputWrapper}>
                    <TextInput 
                      multiline={true}
                      placeholder="Refer to nurse"
                      underlineColorAndroid='transparent'
                      onChangeText={(referNotice) => {this.setState(({session}) => ({session: {...session, referNotice}}))}}
                      style={{
                        height: '100%',
                        width: '100%',
                        lineHeight: 24,
                        backgroundColor: 'white',
                        textAlignVertical: 'top',
                        paddingHorizontal: 6,
                        paddingVertical: 4,
                        fontSize: 18,
                        fontFamily: 'Nunito-Regular'
                      }}
                    />
                  </View>
                </View>
            </ScrollView>
            <View>
              {
                // this.state.session.hpi.length > 0 &&
                // this.state.session.physicalExaminations.length > 0 &&
                // this.state.session.advise.length > 0 &&
                // this.state.session.followUp.length > 0 &&
              <Button 
                title="checkout" 
                onPress={this.submit.bind(this)} 
                bgColor="#1d9dff" titleColor="#fff" 
                icon="chevron-right"
                width="50%"
                round
              />}
            </View>
            <Modal 
              isVisible={this.state.prescriptionDialog.show}
              onSwipe={() => this.setState(({prescriptionDialog}) => ({prescriptionDialog: {...prescriptionDialog, show: false}}))}
              swipeDirection="down"
              avoidKeyboard={true}
              >
              <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                <View style={{height: device.height/1.6, borderRadius: 6, width: device.width*.9, backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 16, justifyContent: 'space-around'}}>
                  <Text style={{fontFamily: 'Nunito-Bold', fontSize: 16, color: '#3c4859'}}>Intake Method</Text>
                  <HorizontalListPicker items={methods} onSelect={(intake) => {
                    this.setState(({prescriptionDialog}) => ({prescriptionDialog: {...prescriptionDialog, instruction: {...prescriptionDialog.instruction, intake}}}))
                  }} />
                  <Text style={{fontFamily: 'Nunito-Bold', fontSize: 16, color: '#3c4859'}}>Frequency Per Day</Text>
                  <HorizontalListPicker items={options} onSelect={(frequency) => {
                    this.setState(({prescriptionDialog}) => ({prescriptionDialog: {...prescriptionDialog, instruction: {...prescriptionDialog.instruction, frequency}}}))
                  }}/>
                  <Text style={{fontFamily: 'Nunito-Bold', fontSize: 16, color: '#3c4859'}}>Treatment Duration</Text>
                  <View style={{height: 44, width: device.width*.8, borderColor: '#5F70A2', borderWidth: 2, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 6, marginVertical: 12}}>
                    <TextInput
                      underlineColorAndroid='transparent'
                      keyboardType="numeric"
                      onChangeText={(duration) => {
                        this.setState(({prescriptionDialog}) => ({prescriptionDialog: {...prescriptionDialog, instruction: {...prescriptionDialog.instruction, duration}}}))
                      }}
                      style={{
                        backgroundColor: '#fff',
                        height: '100%',
                      }}
                    >
                    </TextInput>
                  </View>
                  {
                    this.state.prescriptionDialog.instruction.duration > 0 &&
                    <Text style={{fontFamily: 'Nunito-Bold', fontSize: 16, color: '#3c4859'}}>Time Interval</Text> &&
                    <HorizontalListPicker items={dayIntervals} onSelect={(interval) => {
                      this.setState(({prescriptionDialog}) => ({prescriptionDialog: {...prescriptionDialog, instruction: {...prescriptionDialog.instruction, interval}}}))
                    }}/>
                  }
                  <Button 
                    title="Prescribe" 
                    onPress={() => {
                      this.setState(({session, prescriptionDialog}) => ({
                        session: {
                          ...session,
                          prescriptions: {
                            ...session.prescriptions,
                            [prescriptionDialog.medId]: {
                              instruction: prescriptionDialog.instruction,
                              description: prescriptionDialog.description,
                              unit: prescriptionDialog.unit,
                              concentration: prescriptionDialog.concentration
                            }
                          }
                        },
                        prescriptionDialog: {
                          ...prescriptionDialog,
                          show: false
                        },
                      }))
                    }} 
                    bgColor="#1d9dff" titleColor="#fff" 
                    icon="chevron-right"
                    width="50%"
                    round
                  />
                </View>
              </View>
            </Modal>
            <Loading isLoading={this.props.loading}/>
            <DropdownAlert ref={ref => this.dropdown = ref} onClose={data => this.onClose(data)} />
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({fetchMedicines, fetchMedicalDiagnosises, addCase}, dispatch)
})

const mapStateToProps = (state, props) =>({
  medicines: state.records.medicines,
  diagnosises: state.records.diagnosises,
  loading: state.records.loading.spinner,
  isPatientTransferred: state.patients.queue.hasOwnProperty(props.match.params.patientId) === false
})

export default connect(mapStateToProps, mapDispatchToProps)(Session)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f6fb',
    paddingTop: device.height*.04,
    paddingBottom: 16
  },
  questionContainer:{
    height: '24%',
    backgroundColor: '#00DBAF',
  },
  responseContainer:{
    height: '48%',
    backgroundColor: '#f5f6fb',
    paddingTop: 40,
  },
  textWrapper: {
    marginTop: 20,
    paddingHorizontal: 18,
    backgroundColor: 'transparent',
    paddingBottom: '12%'
  },
  drawingButtons: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:20,
    backgroundColor: '#93D0FE'
  },
  toolbar: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'space-around',
    width: Dimensions.get('window').width*.5
  },
  search: {
    flexDirection: 'row',
    width: Dimensions.get('window').width*.9,
    height: Dimensions.get('window').height*.065,
    backgroundColor: '#fff',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.7,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 8,
    borderRadius: Dimensions.get('window').height*.04
  },
  inputWrapper: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 5,
    width: screenWidth*.9,
    height: device.height*.35,
    marginTop: 12,
    paddingHorizontal: 4,
    paddingVertical: 4
  },
  queryResult: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginTop: 24,
    backgroundColor: '#fff',
    borderRadius: 6,
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 5,
    width: screenWidth*.9,
    height: device.height*.35,
  }
})