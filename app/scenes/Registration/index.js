import React, { Component } from 'react';
import { View, Dimensions, StatusBar, StyleSheet, Keyboard, Text, TextInput, Platform, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Redirect } from 'react-router-native';
import LinearGradient from 'react-native-linear-gradient';
import { bindActionCreators } from 'redux';
import { register } from '../../actions/auth';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import Loading from '../../components/Loading';
import Icon from 'react-native-fontawesome-pro';
import Header from '../../components/Header';

const gradientLayout = {
  colors: ['#fdfbfb','#ebedee'],
  start: {x: 0.1, y: 0.1},
  end: {x: 1.0, y: 1.0},
  locations: [0.3, 1]
}

const device = {
  height: Platform.select({ios: Dimensions.get('window').height, android: Dimensions.get('window').height-StatusBar.currentHeight}),
  width: Dimensions.get('window').width
}

const Textfield = ({icon, obfuscate, placeholder, onChangeText}) => (
  <View style={styles.field} behavior="height">
    <Icon name={icon} type='solid' color='#b4c2e8' size={20}/>
    <TextInput style={[styles.input, {height: Platform.OS == 'android' ? 40 : 20}]} underlineColorAndroid='transparent' autoCapitalize='none' autoCorrect={false} placeholder={placeholder} placeholderTextColor="#B4C2E8" secureTextEntry={obfuscate} onChangeText={onChangeText}></TextInput>
  </View>
)

class Registration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
    this.register = props.actions.register.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.error !== nextProps.error) {
      this.dropdown.alertWithType('error', 'Error', `${nextProps.error}`)
    }
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content', true);
  }

  signUp() {
    const { username, password } = this.state
    this.register(username, password)
  }

  render() {
    if(this.props.authenticated){
      return <Redirect to="/" />
    }
    else {
      return (
        <LinearGradient {...gradientLayout} style={styles.container}>
          <Header title="Registration"/>
          <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View style={styles.form}>
              <View>
                <Textfield icon='user' placeholder='Username' onChangeText={(username)=>this.setState({username})}/>
                <Textfield icon='lock' obfuscate={true} placeholder='Password' onChangeText={(password)=>this.setState({password})}/>
                <Textfield icon='lock-alt' obfuscate={true} placeholder='Confirm Password'/>
              </View>
              <TouchableOpacity style={{...StyleSheet.flatten(styles.actionButtons), backgroundColor: '#5beed1'}} onPress={this.signUp.bind(this)}>
                <Icon name="user-plus" size={20} color="#fff"/>
                <Text style={{fontFamily: 'Quicksand-Bold', fontSize: 18, color: '#fff', marginLeft: 8}}>REGISTER</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
          <Loading isLoading={this.props.loading}/>
          <DropdownAlert ref={ref => this.dropdown = ref}/>
        </LinearGradient>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({register}, dispatch)
})

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  authenticated: state.auth.authenticated,
  error: state.auth.error
})

export default connect(mapStateToProps, mapDispatchToProps)(Registration)

const styles = StyleSheet.create({
  container: {
    height: device.height,
    width: device.width,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: '6%'
  },
  field: {
    height: 44,
    width: 280,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 22,
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.7,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 8
  },
  input: {
    fontSize: 16,
    fontFamily: 'Quicksand-Medium',
    color: '#737C94',
    paddingLeft: 6,
    width: 210
  },
  form: {
    height: '85%',
    justifyContent: 'space-between'
  },
  actionButtons: {
    flexDirection: 'row',
    width: device.width,
    height: device.height*.08,
    justifyContent: 'center',
    alignItems: 'center'
  }
})