import React, { Component } from 'react';
import { Image, Keyboard, Dimensions, View, Text, KeyboardAvoidingView, TextInput, StyleSheet, StatusBar, Platform, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Link } from 'react-router-native';
import DropdownAlert from 'react-native-dropdownalert'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-fontawesome-pro';
import { logIn, resetError } from '../../actions/auth';
import Loading from '../../components/Loading'
import { KeyboardDismissButton } from '../../components/Button';

const device = {
  height: Platform.select({ios: Dimensions.get('window').height, android: Dimensions.get('window').height-StatusBar.currentHeight}),
  width: Dimensions.get('window').width
}

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
    <TextInput  style={[styles.input, {height: Platform.OS == 'android' ? 40 : 20}]} autoCorrect={false} underlineColorAndroid='transparent' autoCapitalize='none' autoCorrect={false} placeholder={placeholder} secureTextEntry={obfuscate} placeholderTextColor="#B4C2E8" onChangeText={onChangeText}></TextInput>
  </View>
)

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      isKeyboardPresent: false
    }
    this.logIn = props.actions.logIn.bind(this)
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content', true)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.error !== nextProps.error) {
      this.dropdown.alertWithType('error', 'Error', `${nextProps.error}`)
    }
  }

  authenticate() {
    const { username, password } = this.state
    this.logIn(username, password)
  }

  render() {
    if(this.props.authenticated) {
      return <Redirect to="/" />
    }
    else {
      return (
          <LinearGradient {...gradientLayout} style={styles.container}>
            { this.state.isKeyboardPresent && <KeyboardDismissButton top={24} right={6} />}
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
              <View style={{height: device.height, width: device.width, justifyContent: 'space-between'}}>
                <View style={{height: device.height*.6, justifyContent: 'space-between'}}>
                  <Header />
                  <View style={styles.crendentials}>
                    <Textfield icon='user' placeholder='Username' onChangeText={(username)=>this.setState({username})}/>
                    <Textfield icon='key' obfuscate={true} placeholder='Password' onChangeText={(password)=>this.setState({password})}/>
                  </View>
                </View>
                <View style={styles.footer}>
                  <TouchableOpacity style={{...StyleSheet.flatten(styles.actionButtons), backgroundColor: '#9196f0'}} onPress={this.authenticate.bind(this)}>
                    <Icon name="caret-circle-right" size={20} color="#fff"/>
                    <Text style={{fontFamily: 'Quicksand-Bold', fontSize: 18, color: '#fff', marginLeft: 8}}>LOGIN</Text>
                  </TouchableOpacity>
                  <Link to='/register' component={TouchableOpacity} style={{...StyleSheet.flatten(styles.actionButtons), backgroundColor: '#5beed1'}} activeOpacity={0.25}>
                    <Icon name="user-plus" size={20} color="#fff"/>
                    <Text style={{fontFamily: 'Quicksand-Bold', fontSize: 18, color: '#fff', marginLeft: 8}}>REGISTER</Text>
                  </Link>
                </View>
                <Loading isLoading={this.props.loading} />
              </View>
            </TouchableWithoutFeedback>
            <DropdownAlert ref={ref => this.dropdown = ref} />
          </LinearGradient>
      )
    }
  }
}


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({logIn, resetError}, dispatch)
})

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  authenticated: state.auth.authenticated,
  error: state.auth.error
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
  container: {
    height: device.height,
    width: device.width
  },
  header: {
    marginTop: device.height*.1,
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
    justifyContent: 'center',
    marginBottom: device.height*.1
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
    alignSelf: 'flex-end',
    flexDirection: 'row'
  },
  actionButtons: {
    flexDirection: 'row',
    width: device.width*.5,
    height: device.height*.08,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
