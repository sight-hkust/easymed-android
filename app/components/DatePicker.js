import React, { Component } from 'react';
import { 
  DatePickerAndroid,
  DatePickerIOS,
  Dimensions,
  View,
  Platform,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-fontawesome-pro';
import TextField from './TextField';
import { Button } from './Button';

const styles = StyleSheet.create({
  response: {
    height: '28%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  datePickerButton: {
    height: 52,
    width: '80%',
    borderRadius: 5,
    backgroundColor: '#1d9dff',
    shadowColor: '#3a4252',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  datePickerButtonTitle: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#fff',
    marginLeft: 12
  },
  datePickerSheet: {
    backgroundColor: '#fff',
    height: 300,
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

const SelectDate = ({onPress}) => (
  <TouchableOpacity style={styles.datePickerButton} onPress={onPress}>
    <Icon name="calendar-edit" type="solid" color="#fff" size={18}/>
    <Text style={styles.datePickerButtonTitle}>Select Date</Text>
  </TouchableOpacity>
)

class DatePickerSheet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDate: new Date()
    }
  }
  render() {
    return (
      <View style={styles.datePickerSheet}>
        <DatePickerIOS 
          date={this.state.selectedDate}
          mode="date"
          onDateChange={(date) => this.setState({selectedDate: date})}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
          <Button title="Cancel" titleColor="#fff" bgColor="#d27787" onPress={this.props.toggle}/>
          <Button title="Confirm" titleColor="#fff" bgColor="#1d9dff" onPress={
            () => {
              this.props.onSelect(this.state.selectedDate)
              this.props.toggle()
            }
          }/>
        </View>
      </View>
    )
  }
}

export default class DatePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDatePickerPresent: false,
      age: null
    }
  }

  async toggleDatePicker() {
    if(Platform.OS === 'android') {
      try {
        const {action, year, month, day} = await DatePickerAndroid.open({
          date: new Date()
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          const selectedDate = new Date(`${year}-${month}-${day}`)
          this.setState({ age: new Date().getFullYear() - selectedDate.getFullYear() })
          this.props.onSelect(selectedDate)
        }
      } catch ({code, message}) {
        console.warn('Cannot open date picker', message);
      }
    }
    else {
      this.setState({isDatePickerPresent: !this.state.isDatePickerPresent})
    }
  }

  render() {
    return (
      <View style={styles.response}>
        <SelectDate onPress={this.toggleDatePicker.bind(this)}/>
        <Modal 
          isVisible={this.state.isDatePickerPresent}
          backdropOpacity={0}
          style={{height: Dimensions.get('window').height*.5, justifyContent: 'flex-end'}}
        >
          <DatePickerSheet 
              toggle={this.toggleDatePicker.bind(this)}
              onSelect={(date) => {
                this.props.onSelect(date)
                this.setState({age: new Date().getFullYear() - date.getFullYear()})
              }}
          />
        </Modal>
      </View>
    )
  }
}