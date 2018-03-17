import React, { Component } from 'react';
import { Image, Keyboard, View, Text, TextInput, StyleSheet, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../../components/Icon';
import { Button, KeyboardDismissButton } from '../../components/Button';

// import { logIn } from '../../actions/auth'

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>M E D E A S Y</Text>
      {/* <Image style={styles.headerImage} source={require('../../../assets/images/logo.png')}/> */}
  </View>
)

const gradientLayout = {
  colors: ['#696feb','#662cd2'],
  start: {x: 0.1, y: 0.1},
  end: {x: 1.0, y: 1.0},
  locations: [0.3, 1]
}

const Textfield = ({icon, obfuscate, placeholder, onChangeText}) => (
  <View style={styles.field}>
    <Icon name={icon} type='solid' color='white' size={22}/>
    <TextInput autoCapitalize='none' autoCorrect={false} placeholder={placeholder} secureTextEntry={obfuscate} style={styles.input} onChangeText={onChangeText}></TextInput>
  </View>
)

const CrendentialsEntry = () => (
  <View style={styles.crendentials}>
    <Textfield icon='user' placeholder='Username'/>
    <Textfield icon='key' obfuscate={true} placeholder='Password'/>
  </View>
)

const Submission = () => (
  <View style={styles.footer}>
    <Button title="login" icon="sign-in" titleColor="#662cd2"/>
    <Button title="create account" icon="user-plus" bgColor="#5beed1" titleColor="white" to={'/register'} round/>
  </View>
)

class LoginForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      isKeyboardPresent: false
    }
  }

  componentWillMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow.bind(this))
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide.bind(this))
  }

  _keyboardWillShow () {
    this.setState(previousState => ({isKeyboardPresent: true}))
  }

  _keyboardWillHide () {
    this.setState(previousState => ({isKeyboardPresent: false}))
  }

  render() {
    return (
      <LinearGradient {...gradientLayout} style={styles.container}>
        <StatusBar barStyle='light-content'/>
        { this.state.isKeyboardPresent && <KeyboardDismissButton />}
        <Header />
        <CrendentialsEntry/>
        <Submission />
      </LinearGradient>
    )
  }
}

const Login = () => {
  // if(isAuthenticated){
  //   return <Redirect to="/" />
  // }
  return <LoginForm />
}

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
    color: 'white',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    alignItems: 'center',
    fontSize: 36,
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 22,
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 8
  },
  input: {
    fontSize: 16,
    fontFamily: 'Quicksand-Medium',
    color: 'white',
    paddingLeft: 8,
    width: 210
  },
  footer: {
    height: '30%',
    justifyContent: 'space-around',
    flexDirection: 'column'
  }
})
// const mapStateToProps = (state) => ({ isAuthenticated: Object.keys(state.auth.user).length });
// const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators({logIn}, dispatch) }); 

// export default connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;