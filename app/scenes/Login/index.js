import React, { Component } from 'react';
import { Image, Keyboard, View, Text, TextInput, StyleSheet, StatusBar, Platform } from 'react-native';
import Spinner from 'react-native-spinkit'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-fontawesome-pro';
import { logIn } from '../../actions/auth';
import { Button, KeyboardDismissButton } from '../../components/Button';

// import { logIn } from '../../actions/auth'

const Header = () => (
  <View style={styles.header}>
    <Image style={styles.headerImage} source={require('../../../assets/images/logo.png')}/>
    <Text style={styles.headerTitle}>M E D E A S Y</Text>
  </View>
)

const gradientLayout = {
  colors: ['#fdfbfb','#ebedee'],
  start: {x: 0.1, y: 0.1},
  end: {x: 1.0, y: 1.0},
  locations: [0.3, 1]
}

const Textfield = ({icon, obfuscate, placeholder, onChangeText}) => (
  <View style={styles.field}>
    <Icon name={icon} type='solid' color="#b4c2e8" size={20}/>
    <TextInput  style={[styles.input, {height: Platform.OS == 'android' ? 40 : 20}]} underlineColorAndroid='transparent' autoCapitalize='none' autoCorrect={false} placeholder={placeholder} secureTextEntry={obfuscate} placeholderTextColor="#B4C2E8" onChangeText={onChangeText}></TextInput>
  </View>
)

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      authenticated: props.authenticated,
      loading: props.loading,
      username: '',
      password: '',
      isKeyboardPresent: false
    }
    this.logIn = props.actions.logIn.bind(this)
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content', true)
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow.bind(this))
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide.bind(this))
  }

  authenticate() {
    const { username, password } = this.state
    console.log(`debug: ${username}`)
    this.logIn(username, password)
  }

  _keyboardWillShow () {
    this.setState(previousState => ({isKeyboardPresent: true}))
  }

  _keyboardWillHide () {
    this.setState(previousState => ({isKeyboardPresent: false}))
  }

  render() {
    if(this.state.authenticated) {
      return <Redirect to="/" />
    }
    else {
      return (
        <LinearGradient {...gradientLayout} style={styles.container}>
          { this.state.isKeyboardPresent && <KeyboardDismissButton />}
          <Header />
          <View style={styles.crendentials}>
            <Textfield icon='user' placeholder='Username' onChangeText={(username)=>this.setState({username})}/>
            <Textfield icon='key' obfuscate={true} placeholder='Password' onChangeText={(password)=>this.setState({password})}/>
          </View>
          <View style={styles.footer}>
            <Button title="login" icon="chevron-circle-right" opaque bgColor="#9196f0" round onPress={this.authenticate.bind(this)}/>
            <Button title="create account" icon="user-plus" bgColor="#5beed1" titleColor="white" to={'/register'} round/>
          </View>
          <Spinner style={styles.loading} isVisible={this.state.loading} size={44} type='Bounce' color='white'/>
        </LinearGradient>
      )
    }
  }
}


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({logIn}, dispatch)
})

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  authenticated: state.auth.authenticated
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    color: '#9196F0',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    alignItems: 'center',
    fontSize: 28,
    fontFamily: 'Nunito-Bold'
  },
  headerImage: {
    width: 112,
    height: 112,
    alignSelf: 'center'
  },
  crendentials: {
    height: '25%',
    justifyContent: 'center'
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
  footer: {
    height: '30%',
    justifyContent: 'space-around',
    flexDirection: 'column'
  }
})
