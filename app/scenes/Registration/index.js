import React, { Component } from 'react';
import { View, StatusBar, StyleSheet, Text, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-spinkit'
import { bindActionCreators } from 'redux';
import { register } from '../../actions/auth';
import { connect } from 'react-redux'; 
import { IconButton, Button } from '../../components/Button';
import Icon from 'react-native-fontawesome-pro';
import Header from '../../components/Header';

const gradientLayout = {
  colors: ['#fdfbfb','#ebedee'],
  start: {x: 0.1, y: 0.1},
  end: {x: 1.0, y: 1.0},
  locations: [0.3, 1]
}

const Textfield = ({icon, obfuscate, placeholder, onChangeText}) => (
  <View style={styles.field}>
    <Icon name={icon} type='solid' color='#b4c2e8' size={20}/>
    <TextInput autoCapitalize='none' autoCorrect={false} placeholder={placeholder} placeholderTextColor="#B4C2E8" secureTextEntry={obfuscate} style={styles.input} onChangeText={onChangeText}></TextInput>
  </View>
)

class Registration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.register = props.actions.register.bind(this)
  }

  signUp() {
    const { username, password } = this.state
    this.register(username, password)
  }

  render() {
    return (
      <LinearGradient {...gradientLayout} style={styles.container}>
        <StatusBar barStyle='light-content'/>
        <Header title="Registration"/>
        <View style={styles.form}>
          <View>
            <Textfield icon='user' placeholder='Username' onChangeText={(username)=>this.setState({username})}/>
            <Textfield icon='lock' obfuscate={true} placeholder='Password' onChangeText={(password)=>this.setState({password})}/>
            <Textfield icon='lock-alt' obfuscate={true} placeholder='Confirm Password'/>
          </View>
          <Button title="Register" icon="user-plus" titleColor="#9196f0" round onPress={this.signUp.bind(this)}/>
          <Spinner style={styles.loading} isVisible={this.props.loading} size={44} type='Bounce' color='white'/>
        </View>
      </LinearGradient>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({register}, dispatch)
})

const mapStateToProps = (state) => ({
  loading: state.auth.loading
})

export default connect(mapStateToProps, mapDispatchToProps)(Registration)

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    justifyContent: 'space-around'
  },
  loading: {
    alignSelf: 'center'
  }
})