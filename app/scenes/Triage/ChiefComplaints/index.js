import React, { Component } from 'react'
import { 
  View,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Switch
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { IconButton, Button, KeyboardDismissButton } from '../../../components/Button'
import Icon from 'react-native-fontawesome-pro';
import Modal from 'react-native-modal';
import Spinner from 'react-native-spinkit';
import { TextField, TextBox } from '../../../components/TextField';
import Header from '../../../components/Header';
import { addChiefComplaints } from '../../../actions/record';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

class ChiefComplaints extends Component {
  constructor(props) {
    super(props);
    this.addChiefComplaints = this.props.actions.addChiefComplaints.bind(this)
    this.state = {
      isKeyboardPresent: false,
      queueId: props.match.params.queueId,
      cheifComplaints: ''
    }
  }

  _keyboardWillShow () {
    this.setState(previousState => ({isKeyboardPresent: true}))
  }

  _keyboardWillHide () {
    this.setState(previousState => ({isKeyboardPresent: false}))
  }

  componentWillMount() {
    StatusBar.setBarStyle('light-content')
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow.bind(this))
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide.bind(this))
  }

  submit() {
    this.addChiefComplaints(this.state.cheifComplaints, this.state.queueId)
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.header}>
          <Header light="true" title="Chief Complaints" to={`/triage/patients/${this.state.queueId}`}/>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput 
            multiline={true}
            placeholder="Enter patients' chief complaints here"
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
      </KeyboardAvoidingView>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ addChiefComplaints }, dispatch)
})

const mapStateToProps = (state) => ({
  loading: state.records.loading.spinner
})

export default connect(mapStateToProps, mapDispatchToProps)(ChiefComplaints)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
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