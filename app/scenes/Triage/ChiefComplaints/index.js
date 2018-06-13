import React, { Component } from 'react'
import { 
  Alert,
  View,
  KeyboardAvoidingView,
  Keyboard,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-native';
import { Button } from '../../../components/Button'
import DropdownAlert from 'react-native-dropdownalert'
import Loading from '../../../components/Loading'
import Header from '../../../components/Header'
import { addChiefComplaints } from '../../../actions/record';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class ChiefComplaints extends Component {
  constructor(props) {
    super(props);
    this.addChiefComplaints = this.props.actions.addChiefComplaints.bind(this)
    this.state = {
      queueId: props.match.params.queueId,
      cheifComplaints: '',
      dismiss: false
    }
  }

  onClose(data) {
    this.setState({dismiss: true})
  }

  componentDidUpdate() {
    if(this.props.hasTaskCompleted && !this.state.dismiss) {
      this.dropdown.alertWithType('success', 'Success', `Patient's chief complaints has been successfully saved.`)
    }
  }

  componentWillMount() {
    StatusBar.setBarStyle('light-content')
  }

  submit() {
    this.addChiefComplaints(this.state.cheifComplaints, this.state.queueId)
  }

  render() {
    if(this.state.dismiss) {
      return <Redirect to={`/triage/patients/${this.props.match.params.queueId}`}/>
    }
    else {
      return (
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
          <KeyboardAvoidingView style={styles.container}>
            <View>
              <View style={styles.header}>
                <Header light="true" title="Chief Complaints" onPress={() => {
                  Alert.alert(
                    'Unsaved progress will be lost',
                    'Are you sure you want to continue?',
                    [
                      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: 'OK', onPress: () => {
                        this.setState({dismiss: true})
                      }}
                    ]
                  )
                }}/>
              </View>
              <View style={styles.inputWrapper}>
                <TextInput 
                  multiline={true}
                  placeholder="Enter patients' chief complaints here"
                  underlineColorAndroid='transparent'
                  onChangeText={(cheifComplaints) => {this.setState({cheifComplaints})}}
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
            <View>
              {
                this.state.cheifComplaints.length > 0 &&
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
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ addChiefComplaints }, dispatch)
})

const mapStateToProps = (state, props) => ({
  loading: state.records.loading.spinner,
  hasTaskCompleted: !state.patients.checklist[props.match.params.queueId].includes('cc'),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChiefComplaints)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f6fb',
    paddingBottom: 16
  },
  header:{
    width: screenWidth,
    height: screenHeight*.13,
    backgroundColor: '#fdca4d',
    paddingTop: 28
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
    height: screenHeight*.4,
    marginTop: 12,
    paddingHorizontal: 4,
    paddingVertical: 4
  },
  instruction: {
    fontSize: 26,
    fontFamily: 'Nunito-Bold',
    textAlign: 'left',
    color: '#fff',
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