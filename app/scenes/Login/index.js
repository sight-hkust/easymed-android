import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import { Redirect } from 'react-router-native';
import { logIn } from '../../actions/auth'

const LoginForm = () => (
  <View>
    
  </View>
)

const Login = ({isAuthenticated}) => {
  if(isAuthenticated){
    return <Redirect to="/" />
  }
  return <LoginForm />
}

const mapStateToProps = (state) => ({ isAuthenticated: Object.keys(state.auth.user).length })

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators({logIn}, dispatch) }); 

export default connect(mapStateToProps, mapDispatchToProps)(Login);