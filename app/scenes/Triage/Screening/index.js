import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
  Alert,
  View,
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native'
import { Redirect } from 'react-router-native';
import { Button } from '../../../components/Button'
import Icon from 'react-native-fontawesome-pro'
import DropdownAlert from 'react-native-dropdownalert'
import Loading from '../../../components/Loading'
import { TextBox } from '../../../components/TextField'
import Header from '../../../components/Header';
import { updateScreeningStatus } from '../../../actions/record'

const { width, height } = Dimensions.get('window')

class Survey extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: '',
      dismiss: false
    }
  }

  render() {
    const icons = {
      drug: 'pills',
      alchohol: 'beer',
      tobacco: 'smoking'
    }
    const baseStyle = { width: width*.4, height: height*.05, alignItems: 'center', justifyContent: 'center'}
    return (
      <View style={styles.surveyContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', alignSelf:'flex-start', paddingTop: 16}}>
          <Icon name={icons[this.props.title]} color="#3c4859" type="solid" size={20}/>
          <Text style={{fontFamily: 'Nunito-Bold', fontSize: 16, color:'#3c4859', marginLeft: 8}}>{this.props.title.toUpperCase()} USE</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
        <TouchableOpacity 
          style={{...StyleSheet.flatten(baseStyle), backgroundColor: '#06D6A0', borderBottomLeftRadius: 5}}
          onPress={() => {
            this.setState({selected: 'yes'})
            this.props.onSelect('yes')
          }}
        >
          <Icon name={this.state.selected==='yes'?'check-circle':'check'} color="#fff" type="solid"/>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{...StyleSheet.flatten(baseStyle), backgroundColor: '#EF476F', borderBottomRightRadius: 5}}
          onPress={() => {
            this.setState({selected: 'no'})
            this.props.onSelect('no')
          }}
        >
          <Icon name={this.state.selected==='no'?'times-circle':'times'} color="#fff" type="solid"/>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
}

class Screening extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.updateScreeningStatus = this.props.actions.updateScreeningStatus.bind(this)
    this.state = {
      xOffset:0,
      queueId: props.match.params.queueId,
      screening: {
        substanceUsage: {
          tobacco: '',
          alchohol: '',
          drug: '',
        },
        remarks: ''
      }
    }
  }

  handleScroll({nativeEvent: { contentOffset: { x }}}){
    this.setState({ xOffset: x})
    this.refs.responseScroll.scrollTo({x: x, animated:false})
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.hasTaskCompleted !== nextProps.hasTaskCompleted) {
      this.dropdown.alertWithType('success', 'Success', `Screening result has been successfully saved.`)
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
    this.updateScreeningStatus(this.state.screening, this.props.patientId, this.props.match.params.queueId)
  }

  render() {
    if(this.state.dismiss) {
      return <Redirect to={`/triage/patients/${this.props.match.params.queueId}`}/>
    }
    else {
      return (
        <View style={styles.container}>
          <Header title="Screening" warning callback={() => {this.setState({dismiss: true})}}/>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator = {false}
              scrollEventThrottle = {1}
            >
              <View style={{width: Dimensions.get('window').width}}>
                <ScrollView>
                  {Object.keys(this.state.screening.substanceUsage).map((title, i) => <Survey key={i} onSelect={(answer) => {
                    this.setState(({screening}) => ({screening: {...screening, substanceUsage: {...screening.substanceUsage, [title]: answer}}}))
                  }} title={title}/>)}
                </ScrollView>
              </View>
              <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
                <View style={{width: Dimensions.get('window').width, alignItems: 'center'}}>
                  <TextBox placeholder="Remarks" width="90%" onChangeText={(remarks) => {
                    this.setState(({screening}) => ({screening: {...screening, remarks}}))
                  }}/>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
            <View style={{height:'8%'}}>
              {
                this.state.screening.substanceUsage.drug.length > 0 &&
                this.state.screening.substanceUsage.alchohol.length > 0 &&
                this.state.screening.substanceUsage.tobacco.length > 0 &&
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
            <Loading isLoading={this.props.loading}/>
            <DropdownAlert ref={ref => this.dropdown = ref} onClose={data => this.onClose(data)} closeInterval={2500}/>
        </View>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({updateScreeningStatus}, dispatch)
})

const mapStateToProps = (state, props) => ({
  loading: state.records.loading.spinner,
  hasTaskCompleted: !state.patients.checklist[props.match.params.queueId].includes('screening'),
  patientId: state.patients.queue[props.match.params.queueId].id
})

export default connect(mapStateToProps, mapDispatchToProps)(Screening)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f6fb',
    paddingTop: '6%',
  },
  surveyContainer:{
    height: height*.12,
    width: width*0.8,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    marginVertical: 10,
    borderRadius: 5,
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.5,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 5,
    alignSelf: 'center',
    alignItems: 'center'
  }
})