import React, { Component } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-fontawesome-pro';
import Modal from 'react-native-modal';
import { Button } from '../../../components/Button';
import Record from '../Record';
import { Cases } from '../History'
import Header from '../../../components/Header';
import { fetchMedicines, fetchMedicalRecords } from '../../../actions/record'; 

const NewConsultationSession = ({toggle, pathPrefix}) => (
  <View style={styles.newConsultationSession}>
    <Button title="New Case" titleColor="#3c4859" to={`${pathPrefix}/session`} icon="file-plus" width="95%" round/>
    <Button title="New Folder" titleColor="#3c4859" icon="folder-open" width="95%" round/>
    <Button title="Cancel" titleColor="#fff" bgColor="#d27787" onPress={toggle}/>
  </View>
)

class Summary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageTitle: 'Today',
      isModalPresent: false
    }
    this.fetchMedicines = this.props.actions.fetchMedicines.bind(this)
  }

  componentWillMount() {
    this.fetchMedicines()
  }
  
  toggleNewSessionDialog() {
    this.setState({isModalPresent: !this.state.isModalPresent})
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Header title={this.state.pageTitle} to="/consultation" />
        <ScrollView
        ref="summaryScrollView"
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        overScrollMode='never'
        onScroll={(event) => event.nativeEvent.contentOffset.x?this.setState({pageTitle:'History'}):this.setState({pageTitle: 'Today'})}
        >
          <View style={{justifyContent: 'space-between', width: Dimensions.get('window').width}}>
            <Record patientId={this.props.match.params.patientId}/>
          </View>
          <View style={{justifyContent: 'space-between', width: Dimensions.get('window').width}}>
            <View style={styles.search}>
            <Icon name="search" color="#3c4859" size={18}/>
            <TextInput
              underlineColorAndroid='transparent'
              style={{
                height: '100%', fontSize: 16, fontFamily: 'Quicksand-Medium', color: '#3c4859', paddingHorizontal: 16, width: '100%'}}
              placeholder="Search"
            >
            </TextInput>
            </View>
            <Cases />
          </View>
        </ScrollView>
        <View style={{width: Dimensions.get('window').width, flexDirection: 'row'}}>
          <TouchableOpacity style={styles.addCaseButton} onPress={this.toggleNewSessionDialog.bind(this)}>
            <Icon name="plus" size={20} color="#fff"/>
            <Text style={{fontFamily: 'Quicksand-Bold', fontSize: 18, color: '#fff', marginLeft: 8}}>ADD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pageNavigation} onPress={() => {
            this.state.pageTitle === 'Today'?this.refs.summaryScrollView.scrollToEnd():this.refs.summaryScrollView.scrollTo({x: 0, y: 0, animated: true})
            }}>
            <Icon name={this.state.pageTitle==='Today'?'history':'file-medical-alt'} size={20} color="#fff"/>
            <Text style={{fontFamily: 'Quicksand-Bold', fontSize: 18, color: '#fff', marginLeft: 8}}>{this.state.pageTitle==='History'?'TODAY':'HISTORY'}</Text>
          </TouchableOpacity>
        </View>
        <Modal isVisible={this.state.isModalPresent}
          backdropOpacity={0.5}
          style={{height: Dimensions.get('window').height*.5, justifyContent: 'flex-end'}}>
          <NewConsultationSession
            toggle={this.toggleNewSessionDialog.bind(this)}
            pathPrefix={this.state.pathPrefix}
          />
        </Modal>
      </KeyboardAvoidingView>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ fetchMedicines, fetchMedicalRecords }, dispatch)
})

const mapStateToProps = (state) => ({
  medicines: state.records.medicines
})

export default connect(mapStateToProps, mapDispatchToProps)(Summary);

const styles = StyleSheet.create({
  container: {
    height: Platform.select({ios: Dimensions.get('window').height, android: Dimensions.get('window').height-StatusBar.currentHeight}),
    width: Dimensions.get('window').width,
    backgroundColor: '#f5f6fb',
    paddingTop: '6%',
  },
  pageNavigation: {
    flexDirection: 'row',
    width: Dimensions.get('window').width*.5,
    height: Dimensions.get('window').height*.08,
    backgroundColor: '#1d9dff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addCaseButton: {
    flexDirection: 'row',
    width: Dimensions.get('window').width*.5,
    height: Dimensions.get('window').height*.08,
    backgroundColor: '#63b995',
    justifyContent: 'center',
    alignItems: 'center'
  },
  search: {
    flexDirection: 'row',
    width: Dimensions.get('window').width*.9,
    height: Dimensions.get('window').height*.065,
    backgroundColor: '#fff',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.7,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 8,
    borderRadius: Dimensions.get('window').height*.04
  },
  newConsultationSession: {
    backgroundColor: '#fff',
    height: 200,
    width: '100%',
    justifyContent: 'space-around',
    borderRadius: 8,
    shadowColor: '#3a4252',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    margin: 0
  }
})