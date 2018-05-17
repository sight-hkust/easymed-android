import React, { Component } from 'react'
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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LinearGradient from 'react-native-linear-gradient';
import { IconButton, Button, KeyboardDismissButton } from '../../../components/Button'
import Icon from 'react-native-fontawesome-pro';
import Modal from 'react-native-modal';
import Spinner from 'react-native-spinkit';
import Header from '../../../components/Header';
import TextField from '../../../components/TextField';
import Step from '../../../components/Step';
import DatePicker from '../../../components/DatePicker';
import BooleanSelect from '../../../components/BooleanSelect';
import { addGynaecologyInfo } from '../../../actions/record';

const screenWidth = Dimensions.get('window').width

const gradientLayout = {
  colors: ['#A594F9','#9687E3'],
  start: {x: 0.0, y: 1.0},
  end: {x: 1.0, y: 1.0},
  locations: [0, 0.75]
}

const Instruction = ({step}) => {
  switch(step) {
    case 'pregnant': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Is patient pregnant?</Text>
        </View>
      )
    }
    case 'lmp': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>LMP Date</Text>
        </View>
      )
    }
    case 'gestation': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Gestational age</Text>
        </View>
      )
    }
    case 'breastFeeding': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Breast Feeding?</Text>
        </View>
      )
    }
    case 'contraceptiveUse': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Contraceptive Use</Text>
        </View>
      )
    }
    case 'abortion': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Abortion</Text>
        </View>
      )
    }
    case 'stillBorn': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Still Born</Text>
        </View>
      )
    }
  } 
}

const Response = ({step, mutate, lmp}) => {
  switch(step) {
    case 'pregnant': {
      return (
        <View style={styles.response}>
          <BooleanSelect onSelect={(isPatientPregnant) =>
            mutate({questions: isPatientPregnant=='yes'?['pregnant' ,'lmp', 'gestation', 'abortion', 'stillBorn']:['pregnant', 'lmp', 'breastFeeding', 'contraceptiveUse']})
          }/>
        </View>
      )
    }
    case 'lmp': {
      return (
        <View style={{height:'48%', justifyContent: 'space-between', marginTop:8}}>
          <DatePicker onSelect={(lastMenstrualPeriodDate) =>
          mutate( ({gynaecology}) => ({ gynaecology: { ...gynaecology, lastMenstrualPeriodDate }}) )
          }/>
          <View style={{backgroundColor:'#fff', borderRadius:5, height:52, width:'80%', alignSelf:'center' ,alignItems:'center', justifyContent:'center', shadowColor: '#e4e4e4', shadowOpacity: 0.5, shadowOffset: { width: 1, height: 3 }, shadowRadius: 5}}>
            <Text style={{fontFamily:'Quicksand-Medium', color:lmp?'#3c4859':'#A8B0CE', fontSize:18}}>
              {lmp?lmp.toDateString():'Last menstrual period date'}
            </Text>
          </View>
        </View>
      )
    }
    case 'gestation': {
      return (
        <View style={styles.response}>
          <TextField placeholder="Weeks" width="80%" onChangeText={(gestationalAge) => mutate(
            ({gynaecology}) => ({gynaecology: {...gynaecology, gestationalAge}})
          )}/>
        </View>
      )
    }
    case 'breastFeeding': {
      return(
        <View style={{height:'56%'}}>
          <BooleanSelect onSelect={(breastFeeding) =>
            mutate( ({gynaecology}) => ({ gynaecology: { ...gynaecology, breastFeeding }}) )
          }/>
        </View>
      )
    }
    case 'contraceptiveUse': {
      return(
        <View style={{height:'56%'}}>
          <BooleanSelect  onSelect={(contraceptiveUse) =>
            mutate( ({gynaecology}) => ({ gynaecology: { ...gynaecology, contraceptiveUse }}) )
          }/>
        </View>
      )
    }
    case 'abortion': {
      return (
        <View style={styles.response}>
          <TextField placeholder="Abortion" width="80%" onChangeText={(abortion) => mutate(
            ({gynaecology}) => ({gynaecology: {...gynaecology, abortion}})
          )}/>
        </View>
      )
    }
    case 'stillBorn': {
      return (
        <View style={styles.response}>
          <TextField placeholder="Still Born" width="80%" onChangeText={(stillBorn) => mutate(
            ({gynaecology}) => ({gynaecology: {...gynaecology, stillBorn}})
          )}/>
        </View>
      )
    }
  }
}

const HeaderContainer = ({xOffset, path, stepsLength}) => (
  <View style={styles.headerContainer}>
    <Header title="Maternal" light="true" to={`/triage/patients/${path}`}/>
    <Step allSteps={stepsLength} step={xOffset/screenWidth} backgroundColor='#fff' highlightColor='#FAEB9A' />
  </View>
)

class Maternal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queueId: props.match.params.queueId,
      xOffset:0,
      questions: ['pregnant' ,'lmp', 'breastFeeding', 'contraceptiveUse'],
      gynaecology: {
        lastMenstrualPeriodDate: null,
        gestationalAge: '',
        breastFeeding: '',
        contraceptiveUse: '',
        abortion: '',
        stillBorn: ''
      }
    }
    this.addGynaecologyInfo = this.props.actions.addGynaecologyInfo.bind(this)
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll({nativeEvent: { contentOffset: { x }}}){
    this.setState({ xOffset: x})
    this.refs.responseScroll.scrollTo({x: x, animated:false})
  }

  componentWillMount() {
    StatusBar.setBarStyle('light-content')
  }

  submit() {
    this.addGynaecologyInfo(this.state.gynaecology, this.state.queueId)
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.parentContainer} behavior="position">
        <HeaderContainer xOffset={this.state.xOffset} path={this.props.match.params.queueId} stepsLength={this.state.questions.length-1}/>

        <ScrollView 
          ref = 'questionScroll'
          horizontal = {true} 
          pagingEnabled = {true}
          onScroll = {this.handleScroll}
          scrollEventThrottle = {1}
          showsHorizontalScrollIndicator = {false}
          style={styles.questionContainer}
          >
          {this.state.questions.map((step, i) => (
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
          {this.state.questions.map((step, i) => (
            <View style={{width: screenWidth, justifyContent:'flex-start', paddingHorizontal: 24}} key={i}>
              <Response step={step} mutate={this.setState.bind(this)} lmp={this.state.gynaecology.lastMenstrualPeriodDate}/>
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
        
        <Modal
          isVisible={this.props.loading}
          animationIn="fadeIn"
          backdropOpacity={0}
          style={{justifyContent: 'center'}}
        >
          <View style={styles.loading}>
            <Spinner
            isVisible={this.props.loading}
            size={44}
            style={{alignSelf: 'center'}}
            type='Bounce' 
            color='#81e2d9'/>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({addGynaecologyInfo}, dispatch)
})

export default connect(null, mapDispatchToProps)(Maternal)

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
    backgroundColor: '#9687E3',
  },
  questionContainer:{
    height: '24%',
    backgroundColor: '#9687E3',
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
    height: '52%',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loading: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 88,
    width: 88,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 8
  }
})