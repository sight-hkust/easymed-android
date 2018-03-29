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
import LinearGradient from 'react-native-linear-gradient';
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

const stepList = ['chiefComplaints', 'physicalExaminations', 'investigation', 'diagnosis', 'advise', 'followUp'];

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
          <Text style={styles.instruction}>Please indicate whether</Text>
          <Text style={styles.instruction}>patient uses contraceptive</Text>
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

const SubmitButton = () => (
  <View style={{width:'100%', position:'absolute', top:'100%', zIndex:10}}>
    <Button title="Submit" icon="chevron-right" titleColor="#3c4859" round width="50%"/>
  </View>
)

const Response = ({step, mutate}) => {
  switch(step) {
    case 'chiefComplaints': {
      return (
        <View style={{ marginTop: 64, height: '28%', justifyContent: 'space-around', alignItems: 'center', paddingBottom: '8%'}}>
          <TextBox />
        </View>
      )
    }
    case 'physicalExaminations': {
      return (
        <View style={{ marginTop: 64, height: '28%', justifyContent: 'space-around', alignItems: 'center', paddingBottom: '8%'}}>
        <TextBox />
      </View>
      )
    }
    case 'investigation': {
      return (<View style={{ marginTop: 64, height: '28%', justifyContent: 'space-around', alignItems: 'center', paddingBottom: '8%'}}>
      <TextBox />
    </View>)
    }
    case 'diagnosis': {
      return (
        <View style={{ marginTop: 64, height: '28%', justifyContent: 'space-around', alignItems: 'center', paddingBottom: '8%'}}>
        <TextBox />
      </View>
      )
    }
    case 'advise': {
      return (
        <View style={{ marginTop: 64, height: '28%', justifyContent: 'space-around', alignItems: 'center', paddingBottom: '8%'}}>
        <TextBox />
      </View>
      )
    }
    case 'followUp': {
      return (
        <View style={{ marginTop: 64, height: '28%', justifyContent: 'space-around', alignItems: 'center', paddingBottom: '8%'}}>
        <TextBox />
      </View>
      )
    }
  }
}

const BackgroundInfo = ({xOffset}) => (
    <View style={styles.headerContainer}>
      <LinearGradient style={styles.upper} {...gradientLayout} >
        <Header title="Consultation" light="true" to="/triage/patients/:paitentId"/>
        <Step allSteps={stepList.length-1} step={xOffset/screenWidth} backgroundColor='#fff' highlightColor='pink' />
      </LinearGradient>
    </View>
)

const ScrollItem = ({step, mutate}) => (
  <View style={{width: screenWidth}}>
    <Instruction step={step}/>
    <Response step={step} mutate={mutate}/>
  </View>
)

const ScrollList = ({handleScroll, scrollViewDidChange, mutate}) => {
  return (
    <ScrollView 
      horizontal = {true} 
      pagingEnabled ={true}
      onScroll = {handleScroll}
      scrollEventThrottle = {1}
      style={styles.scrollViewContainer}
      onContentSizeChange={scrollViewDidChange}
      >
      {stepList.map((step, i) => (
        <ScrollItem key={i} step={step} mutate={mutate}/>
      ))}
    </ScrollView>
  )
};

export default class Session extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      xOffset:0,
      pregnancy: {
        lastMenstrualPeriodDate: null,
        gestationalAge: '',
        breastFeeding: '',
        contraceptiveUse: '',
        liveBirth: '',
        miscarriage: '',
        abortion: '',
        stillBorn: ''
      }
    }
  }

   handleScroll({nativeEvent: { contentOffset: { x }}}){
     this.setState({ xOffset: x})
   }

  componentWillMount() {
    StatusBar.setBarStyle('light-content')
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.parentContainer} behaviro="padding">
        <BackgroundInfo xOffset={this.state.xOffset}/>
        <ScrollList handleScroll={this.handleScroll} mutate={this.setState.bind(this)}/> 
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f6fb',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f6fb',
    zIndex: 0,
  },
  scrollViewContainer: {
    flex: 1,
    position: 'absolute',
    top: '20%',
    height: '100%',
    paddingTop: 16,
  },
  upper: {
    height: '45%',
    paddingTop: '10%'
  },
  header: {
    flexDirection: 'row',
    height: 44,
    justifyContent: 'space-between',
    marginBottom: 32,
    alignItems: 'center'
  },
  headerText: {
    fontSize: 36,
    fontFamily: 'Nunito-Bold',
    textAlign: 'right',
    backgroundColor: '#fff0',
    color: '#fff',
    marginRight: 20,
    marginTop: 32,
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
    marginTop: 16,
    height: '28%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: '8%'
  },
  gender: {
    width: 112,
    height: 112,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#3a4252',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16
  },
  genderText: {
    fontSize: 26,
    fontFamily: 'Nunito-Bold',
    color: '#3c4859'
  },
  selectStatus: {
    height: 56,
    width: '80%',
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#3a4252',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectStatusText: {
    fontSize: 22,
    fontFamily: 'Nunito-Bold',
    color: '#3c4859',
    marginLeft: 12
  },
  footer: {
    marginTop: 18
  }
})