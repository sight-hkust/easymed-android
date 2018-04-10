import React, { Component } from 'react';
import { Dimensions, View, StatusBar, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logOut } from '../../actions/auth';
import { Redirect} from 'react-router-native';
import Icon from 'react-native-fontawesome-pro';
import { Button } from '../../components/Button';
import Header from '../../components/Header'

const { width, height } = Dimensions.get('window');

const SyncStatus = () => {
  const style = StyleSheet.create({
    container: {
      width,
      height: height*.15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16
    },
    titleText: {
      fontFamily: 'Nunito-Bold',
      fontSize: 16,
      color: '#3c4859',
      marginLeft: 8
    },
    syncHistoryText: {
      fontFamily: 'Nunito-Bold',
      fontSize: 14,
      color: '#90949A'
    }
  })
  return (
    <View style={style.container}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Icon color="#3c4859" name="sync-alt" type="solid"/>
          <Text style={style.titleText}>Sync Status</Text>
        </View>
        <Text style={style.syncHistoryText}>Last updated: Never</Text>
      </View>
      <Button title="Sync" titleColor="#3c4859"/>
    </View>
  )
}

class Settings extends Component {
  constructor(props) {
    super(props)
    this.logOut = props.actions.logOut.bind(this);
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content')
  }

  render() {
    if(!this.props.authenticated) {
      return <Redirect to="/login" />
    }
    else {
      return (
        <View style={styles.container}>
          <Header title="Settings"/>
          <SyncStatus />
          <Button title="Logout"
                  icon="sign-out"
                  bgColor="#5beed1"
                  titleColor="white"
                  onPress={this.logOut}
                  width={width*.4}
                  round
          />
        </View>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({logOut}, dispatch)
})

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated
})

export default connect(mapStateToProps,mapDispatchToProps)(Settings)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fb',
    justifyContent: 'flex-start',
    paddingTop: '6%'
  },
  header: {
    flexDirection: 'row',
    height: '8%',
    justifyContent: 'space-between',
    marginVertical: 12,
    alignItems: 'center',
    paddingHorizontal: '7%'
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Nunito-Bold',
    textAlign: 'right',
    backgroundColor: '#fff0',
    color: '#3c4859',
  }
})