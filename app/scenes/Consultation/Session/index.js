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
  TouchableOpacity, 
  Dimensions, 
  Switch 
} from 'react-native'
import { createCase } from '../../../actions/case';
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
          <Text style={styles.instruction}>chief complaints</Text>
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
          <TextBox placeholder='Type the chief complanints here' 
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
                    title='From camera' 
                    bgColor='#91D2CC' titleColor='#fff' 
                    icon='camera'
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
          <TextBox placeholder='Type the diagnosis here'
                   onChangeText={(diagnosis) => mutate(({session}) => 
                   ({session: {...session, diagnosis}}))}/>
        </View>
      )
    }
    case 'prescription': {
      return (
        <View style={styles.response}>
          <TextBox placeholder='Type the prescription here'
                   onChangeText={(prescription) => mutate(({session}) => 
                   ({session: {...session, prescription}}))}/>
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

const HeaderContainer = ({xOffset, pathPrefix}) => {
  const path = pathPrefix.replace('/session','')
  return (
    <View style={styles.headerContainer}>
      <Header title="Consultation" light="true" to={path}/>
      <Step allSteps={stepList.length-1} step={xOffset/screenWidth} backgroundColor='#fff' highlightColor='#FAEB9A' />
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
      xOffset:0,
      pictureSource: null,
      session: {
        chiefComplaints: '',
        physicalExaminations: '',
        investigation: '',
        diagnosis: '',
        prescription: '',
        advise: '',
        followUp: ''
      },
      options: {
        title: 'Select Picture',
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      }
    }
  }

  handleScroll({nativeEvent: { contentOffset: { x }}}){
     this.setState({ xOffset: x})
     this.refs.responseScroll.scrollTo({x: x, animated:false})
   }


  handleCameraPress(){
    ImagePicker.showImagePicker(this.state.options, (response) => {
      console.log('Response = ', response)
    
      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      }
      else {
        let source = { uri: response.uri }
        this.setState({pictureSource: source})
      }
    })
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
  }
})