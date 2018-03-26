import React, { Component } from 'react'
import { View, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, Dimensions, Switch } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { IconButton, Button } from '../../../components/Button'
import Icon from '../../../components/Icon'
import TextField from '../../../components/TextField'
import Step from '../../../components/Step'
import BooleanSelect from '../../../components/BooleanSelect';

const screenWidth = Dimensions.get('window').width

const gradientLayout = {
  colors: ['#A594F9','#9687E3'],
  start: {x: 0.0, y: 1.0},
  end: {x: 1.0, y: 1.0},
  locations: [0, 0.75]
}

const Header = () => (
  <View style={styles.header}>
    <IconButton color="#fff" name='arrow-left' to={'/triage'} back/>
    <Text style={styles.headerText}>Pregnancy</Text>
  </View>
)

const stepList = ['lmp', 'gestation', 'breastFeeding', 'contraceptiveUse', 'liveBirth', 'miscarriage', 'abortion', 'stillBorn'];

const Instruction = ({step}) => {
  switch(step) {
    case 'lmp': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Please indicate patient's</Text>
          <Text style={styles.instruction}>Last Menstrual Period</Text>
          <Text style={styles.instruction}>date</Text>
        </View>
      )
    }
    case 'gestation': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Please indicate the</Text>
          <Text style={styles.instruction}>gestational age</Text>
          <Text style={styles.instruction}>of the patient</Text>
        </View>
      )
    }
    case 'breastFeeding': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Please indicate whether</Text>
          <Text style={styles.instruction}>patient is breastfeeding</Text>
          <Text style={styles.instruction}>below</Text>
        </View>
      )
    }
    case 'contraceptiveUse': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Please indicate whether</Text>
          <Text style={styles.instruction}>patient uses contraceptive</Text>
          <Text style={styles.instruction}>below</Text>
        </View>
      )
    }
    case 'liveBirth': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the number of</Text>
          <Text style={styles.instruction}>live birth of</Text>
          <Text style={styles.instruction}>the patient</Text>
        </View>
      )
    }
    case 'miscarriage': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the number of</Text>
          <Text style={styles.instruction}>miscarriage of</Text>
          <Text style={styles.instruction}>the patient</Text>
        </View>
      )
    }
    case 'abortion': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the number of</Text>
          <Text style={styles.instruction}>abortion the</Text>
          <Text style={styles.instruction}>patient had</Text>
        </View>
      )
    }
    case 'stillBorn': {
      return (
        <View style={styles.textWrapper}>
          <Text style={styles.instruction}>Enter the number of</Text>
          <Text style={styles.instruction}>still born</Text>
          <Text style={styles.instruction}>of the patient</Text>
        </View>
      )
    }
  } 
}

const YesNoUnknownSelect = () => (
  <View style={{...StyleSheet.flatten(styles.response), height: '40%'}}>
    <BooleanSelect title='Yes' icon='check' bgColor='#7BD2A8' color='blue' width='80%'/>
    <BooleanSelect title='No' icon='times' bgColor='#EF8585' color='blue' width='80%' />
    <BooleanSelect title='Unknown' icon='question' bgColor='#F9E397' color='blue' width='80%' />
  </View>
)

const YesNoSelect = () => (
  <View style={{...StyleSheet.flatten(styles.response), height: '28%'}}>
    <BooleanSelect title='Yes' icon='check' bgColor='#7BD2A8' color='blue' width='80%'/>
    <BooleanSelect title='No' icon='times' bgColor='#EF8585' color='blue' width='80%' />
  </View>
)

const SubmitButton = () => (
  <View style={{width:'100%', position:'absolute', top:'36%', zIndex:10}}>
    <Button title="Submit" icon="chevron-right" round width="50%"/>
  </View>
)

const Response = ({step}) => {
  switch(step) {
    case 'lmp': {
      return (
        <View style={styles.response}>
          <TextField placeholder="Date" width="80%"/>
        </View>
      )
    }
    case 'gestation': {
      return (
        <View style={styles.response}>
          <TextField placeholder="Weeks" width="80%"/>
        </View>
      )
    }
    case 'breastFeeding': {
      return <YesNoSelect />
    }
    case 'contraceptiveUse': {
      return <YesNoSelect />
    }
    case 'liveBirth': {
      return (
        <View style={styles.response}>
          <TextField placeholder="Live Birth" width="80%"/>
        </View>
      )
    }
    case 'miscarriage': {
      return (
        <View style={styles.response}>
          <TextField placeholder="Miscarriage" width="80%"/>
        </View>
      )
    }
    case 'abortion': {
      return (
        <View style={styles.response}>
          <TextField placeholder="Abortion" width="80%"/>
        </View>
      )
    }
    case 'stillBorn': {
      return (
        <View style={styles.response}>
          <TextField placeholder="Still Born" width="80%"/>
        </View>
      )
    }
  }
}

const BackgroundInfo = ({xOffset}) => (
    <View style={styles.headerContainer}>
      <LinearGradient style={styles.upper} {...gradientLayout} >
        <Header/>
        <Step allSteps={stepList.length-1} step={xOffset/screenWidth} backgroundColor='#fff' highlightColor='pink' />
      </LinearGradient>
    </View>
)

const ScrollItem = ({step}) => (
  <View style={{width: screenWidth}}>
    <Instruction step={step}/>
    <Response step={step}/>
  </View>
)

const ScrollList = ({handleScroll, scrollViewDidChange}) => {
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
        <ScrollItem key={i} step={step}/>
      ))}
    </ScrollView>
  )
};

export default class Pregnancy extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      xOffset:0,
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
      <View style={styles.parentContainer}>
        <BackgroundInfo xOffset={this.state.xOffset}/>
        <ScrollList handleScroll={this.handleScroll}/> 
      </View>
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