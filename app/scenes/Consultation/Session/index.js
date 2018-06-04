import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
  View,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  StatusBar, 
  StyleSheet, 
  Text, 
  TextInput,
  TouchableOpacity,
  Dimensions, 
  Switch
} from 'react-native'
import Modal from 'react-native-modal'
import SketchDraw from 'react-native-sketch-draw'
// import { createCase } from '../../../actions/case';
// import { } from ''
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import { IconButton, Button } from '../../../components/Button'
import Icon from 'react-native-fontawesome-pro';
import Header from '../../../components/Header';
import {TextBox, TextField} from '../../../components/TextField';
import Step from '../../../components/Step';
import DatePicker from '../../../components/DatePicker';
import BooleanSelect from '../../../components/BooleanSelect';

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

const gradientLayout = {
  colors: ['#00C8A0','#00DBAF'],
  start: {x: 0.0, y: 1.0},
  end: {x: 1.0, y: 1.0},
  locations: [0, 0.75]
}

const stepList = ['chiefComplaints', 'physicalExaminations', 'investigation', 'diagnosis', 'prescription', 'advise', 'followUp'];

const Instruction = ({step}) => {
  switch(step) {
    case 'chiefComplaints': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Write down patient's</Text>
          <Text style={styles.instruction}>HPI</Text>
          <Text style={styles.instruction}>below</Text>
        </View>
      )
    }
    case 'physicalExaminations': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Indicate findings and remarks</Text>
          <Text style={styles.instruction}>for physical examination</Text>
          <Text style={styles.instruction}>below</Text>
        </View>
      )
    }
    case 'investigation': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Indicate any remarks for</Text>
          <Text style={styles.instruction}>investigating patient's condition</Text>
          <Text style={styles.instruction}>below</Text>
        </View>
      )
    }
    case 'diagnosis': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the diagnosis</Text>
          <Text style={styles.instruction}>of the patient</Text>
          <Text style={styles.instruction}>below</Text>
        </View>
      )
    }
    case 'prescription': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the prescription</Text>
          <Text style={styles.instruction}>of the patient</Text>
          <Text style={styles.instruction}>below</Text>
        </View>
      )
    }
    case 'advise': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the advice for</Text>
          <Text style={styles.instruction}>the patient</Text>
          <Text style={styles.instruction}>below</Text>
        </View>
      )
    }
    case 'followUp': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Indicate remarks for </Text>
          <Text style={styles.instruction}>following up patient's case</Text>
          <Text style={styles.instruction}>below</Text>
        </View>
      )
    }
  } 
}

const Response = ({step, mutate, handleCameraPress, pictureSource}) => {
  switch(step) {
    case 'chiefComplaints': {
      return (
        <View style={styles.response}>
          <TextBox placeholder='Type the HPI here' 
                   onChangeText={(chiefComplaints) => mutate(({session}) => 
                    ({session: {...session, chiefComplaints}}))}/>
        </View>
      )
    }
    case 'physicalExaminations': {
      return (
          <ScrollView
            horizontal = {true} 
            pagingEnabled = {true}
            scrollEventThrottle = {1}
            showsHorizontalScrollIndicator = {false}>
            <View style={{width:screenWidth, justifyContent:'flex-start'}}>
              <View style={{width:screenWidth, justifyContent:'flex-start', alignItems:'center', zIndex:0}}>
                <Button 
                    title='Markup' 
                    bgColor='#91D2CC' titleColor='#fff' 
                    icon='edit'
                    width='64%'
                    onPress= {handleCameraPress}
                />
                <Image
                    source={pictureSource?pictureSource:require('../../../../assets/images/imagePlaceHolder.png')}
                    style={{marginTop:'6%', height:'60%', width:'64%', borderRadius:5 }}
                  />
              </View>
              <View style={{position:'absolute', top:'28%', left:'86%', zIndex:1}}>
                <IconButton name='chevron-right' color='#8c919c' size={28}/>
              </View>
            </View>
            <View style={{width:screenWidth, justifyContent:'flex-start'}}>
              <View style={{width:screenWidth, alignItems:'center', zIndex:0}}>
                <TextBox placeholder='Type the physical examinations here'
                         onChangeText={(physicalExaminations) => mutate(({session}) => 
                         ({session: {...session, physicalExaminations}}))}/>
              </View>
              <View style={{position:'absolute', top:'32%', left:'2%', zIndex:1}}>
                <IconButton name='chevron-left' color='#8c919c' size={28}/>
              </View>
            </View>
          </ScrollView>

      )
    }
    case 'investigation': {
      return (
        <View style={styles.response}>
          <TextBox placeholder='Type the investigation here'
                   onChangeText={(investigation) => mutate(({session}) => 
                   ({session: {...session, investigation}}))}/>
        </View>
      )
    }
    case 'diagnosis': {
      return (
        <View style={styles.response}>
          <TextField placeholder="Diagnosis"
                   onChangeText={(diagnosis) => mutate(({session}) => 
                   ({session: {...session, diagnosis}}))}/>
          <ScrollView>

          </ScrollView>
        </View>
      )
    }
    case 'prescription': {
      return (
        <View style={styles.response}>
          <TextField width="80%" placeholder="Medicine Name"
                   onChangeText={(diagnosis) => mutate(({session}) => 
                   ({session: {...session, diagnosis}}))}/>
          <Button title="test" titleColor="#000" onPress={() => {
            mutate({displayPrescriptionDetailDialog: true})
          }}/>
        </View>
      )
    }
    case 'advise': {
      return (
        <View style={styles.response}>
          <TextBox placeholder='Type the advise here'
                   onChangeText={(advise) => mutate(({session}) => 
                   ({session: {...session, advise}}))}/>
        </View>
      )
    }
    case 'followUp': {
      return (
        <View style={styles.response}>
          <TextBox placeholder='Type the follow up here'
                   onChangeText={(followUp) => mutate(({session}) => 
                   ({session: {...session, followUp}}))}/>
        </View>
      )
    }
  }
}

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

const HeaderContainer = ({xOffset, pathPrefix}) => {
  const path = pathPrefix.replace('/session','')
  return (
    <View style={styles.headerContainer}>
      <Header title="Consultation" light="true" to={path}/>
      <Toolbar/>
      {/* <Step allSteps={stepList.length-1} step={xOffset/screenWidth} backgroundColor='#fff' highlightColor='#FAEB9A' /> */}
    </View>
  )
}


export default class Session extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleCameraPress = this.handleCameraPress.bind(this);
    this.state = {
      pathPrefix: props.match.url,
      toolSelected: SketchDrawConstants.toolType.pen.id,
      xOffset:0,
      pictureSource: null,
      isCurrentlyDrawing: false,
      displayPrescriptionDetailDialog: false,
      session: {
        chiefComplaints: '',
        physicalExaminations: '',
        investigation: '',
        diagnosis: '',
        prescription: '',
        advise: '',
        followUp: ''
      },
      drawingColor: '#f00',
      options: {
        title: 'Select Picture',
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      }
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

  handleScroll({nativeEvent: { contentOffset: { x }}}){
     this.setState({ xOffset: x})
     this.refs.responseScroll.scrollTo({x: x, animated:false})
   }

  toggleMarkerColor() {
    this.setState({drawingColor: this.state.drawingColor==='#f00'?'#000':'#f00'})
  }

  handleCameraPress(){
    this.setState({isCurrentlyDrawing: !this.state.isCurrentlyDrawing})
  }

  togglePrescriptionDetailDialog(){
    this.setState({displayPrescriptionDetailDialog: !this.state.displayPrescriptionDetailDialog})
  }

  componentWillMount() {
    StatusBar.setBarStyle('light-content')
  }

  submit() {
    console.log(this.state.session)
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.parentContainer} behaviro="padding">
        <HeaderContainer xOffset={this.state.xOffset} pathPrefix={this.state.pathPrefix}/>

        <ScrollView 
          ref = 'questionScroll'
          horizontal = {true} 
          pagingEnabled = {true}
          onScroll = {this.handleScroll}
          scrollEventThrottle = {1}
          showsHorizontalScrollIndicator = {false}
          style={styles.questionContainer}
          >
          {stepList.map((step, i) => (
            <View style={{width: screenWidth}} key={i}>
              <Instruction step={step}/>
            </View>
          ))}
        </ScrollView>

        <ScrollView 
          ref = 'responseScroll'
          horizontal = {true} 
          pagingEnabled ={true}
          scrollEnabled = {false}
          showsHorizontalScrollIndicator = {false}
          style={styles.responseContainer}
          >
          {stepList.map((step, i) => (
            <View style={{width: screenWidth, justifyContent:'flex-start'}} key={i}>
              <Response step={step} mutate={this.setState.bind(this)} handleCameraPress={this.handleCameraPress} pictureSource={this.state.pictureSource}/>
            </View>
          ))}
        </ScrollView>

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
              <TouchableOpacity style={styles.drawingButtons} onPress={this.handleCameraPress}>
                <Icon name="times" color="#fff" size={22}/>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={{height:'8%'}}>
          <Button 
              title="Submit" 
              onPress={this.submit.bind(this)} 
              bgColor="#1d9dff" titleColor="#fff" 
              icon="chevron-right"
              width="50%"
              round
            />
        </View>

        <Modal isVisible={this.state.displayPrescriptionDetailDialog}>
          <View style={{
            width: Dimensions.get('window').width*.9,
            height: Dimensions.get('window').height*.9,
            justifyContent: 'space-between',
            backgroundColor: '#f5f5f5',
            borderRadius: 6,
            paddingTop: 12
            }}>
            <Text style={{fontSize: 24, fontFamily: 'Nunito-Bold', marginLeft: 12}}>Drug Name</Text>
            <View style={{width: Dimensions.get('window').width*.9, paddingHorizontal: 16, flexDirection: 'row'}}>
              <TextField width={Dimensions.get('window').width*.5} placeholder="Concentration"/>
              <Button title="mg" icon="angle-down" titleColor="#000"/>
            </View>
            <View style={{width: Dimensions.get('window').width*.9, paddingHorizontal: 16, flexDirection: 'row'}}>
              <TextField width={Dimensions.get('window').width*.5} placeholder="Quantity"/>
              <Button title="po" icon="angle-down" titleColor="#000"/>
            </View>
            <View style={{width: Dimensions.get('window').width*.9, paddingHorizontal: 16, flexDirection: 'row'}}>
              <TouchableOpacity style={{
                width: Dimensions.get('window').width*.225-4, 
                height: Dimensions.get('window').height*.065, 
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#63b995', 
                borderLeftWidth: 2, 
                borderRightWidth: 1,
                borderTopWidth: 2, 
                borderBottomWidth: 2, 
                borderBottomLeftRadius: Dimensions.get('window').height*.04, 
                borderTopLeftRadius: Dimensions.get('window').height*.04}}>
                <Text style={{fontFamily: 'Quicksand-Bold', fontSize: 18, color: '#63b995'}}>OD</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                width: Dimensions.get('window').width*.225-4, 
                height: Dimensions.get('window').height*.065, 
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#63b995', 
                borderLeftWidth: 1, 
                borderRightWidth: 1,
                borderTopWidth: 2, 
                borderBottomWidth: 2}}>
                <Text style={{fontFamily: 'Quicksand-Bold', fontSize: 18, color: '#63b995'}}>BID</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                width: Dimensions.get('window').width*.225-4, 
                height: Dimensions.get('window').height*.065, 
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#63b995', 
                borderLeftWidth: 1, 
                borderRightWidth: 1,
                borderTopWidth: 2, 
                borderBottomWidth: 2}}>
                <Text style={{fontFamily: 'Quicksand-Bold', fontSize: 18, color: '#63b995'}}>TID</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                width: Dimensions.get('window').width*.225-4, 
                height: Dimensions.get('window').height*.065, 
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#63b995', 
                borderLeftWidth: 1, 
                borderTopWidth: 2, 
                borderRightWidth: 2,
                borderBottomWidth: 2, 
                borderBottomRightRadius: Dimensions.get('window').height*.04, 
                borderTopRightRadius: Dimensions.get('window').height*.04}}>
                <Text style={{fontFamily: 'Quicksand-Bold', fontSize: 18, color: '#63b995'}}>QID</Text>
              </TouchableOpacity>
            </View>
            <View style={{width: Dimensions.get('window').width*.9, paddingHorizontal: 16, flexDirection: 'row'}}>
              <TextField width={Dimensions.get('window').width*.5} placeholder="No. of days"/>
              <Button title="/7" icon="angle-down" titleColor="#000"/>
            </View>
            <View style={{width: Dimensions.get('window').width*.9, paddingHorizontal: 16}}>
              <View style={styles.inputWrapper}>
                <TextInput 
                  multiline={true}
                  placeholder="Remarks"
                  underlineColorAndroid='transparent'
                  style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'white',
                    textAlignVertical: 'top',
                    paddingHorizontal: 6,
                    paddingVertical: 4,
                    fontSize: 16,
                    fontFamily: 'Nunito-Regular'
                  }}
                />
              </View>
            </View>
            <TouchableOpacity style={{width: Dimensions.get('window').width*.9, height: Dimensions.get('window').height*.08, backgroundColor: '#63b995', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 6, borderBottomRightRadius: 6}}>
              <Icon name="check" size={20} color="#fff"/>
              <Text style={{fontFamily: 'Quicksand-Bold', fontSize: 18, color: '#fff', marginLeft: 8}}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    )
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   actions: bindActionCreators({createSession}, dispatch)
// })

// const mapStateToProps = (state) =>({
//   sessionId: state.session.id
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Session)

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f6fb',
    paddingBottom: 16
  },
  headerContainer: {
    height: '20%',
    justifyContent: 'space-around',
    backgroundColor: '#00DBAF',
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
  instruction: {
    fontSize: 26,
    fontFamily: 'Nunito-Bold',
    textAlign: 'left',
    color: '#fff',
  },
  response: {
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  inputWrapper: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 5,
    width: Dimensions.get('window').width*.75,
    height: Dimensions.get('window').height*.25,
    marginHorizontal: 12,
    paddingHorizontal: 4,
    paddingVertical: 4
  },
})