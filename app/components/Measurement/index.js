import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import { withNavigation } from 'react-navigation';

class Measurement extends Component {
  constructor(props) {
    super(props)
    this.takeMeasurement = this.takeMeasurement.bind(this)
  }

  takeMeasurement() {
    this.props.navigation.push(this.props.routeName, {
      queueId: this.props.queueId
    })
  }

  render() {
    const {icon, color, title} = this.props
    const styles = StyleSheet.create({
      wrapper: {
        flexDirection: 'row',
        borderRadius: 6,
        backgroundColor: '#fff',
        height: 56,
        width: '82%',
        alignSelf: 'center',
        shadowColor: '#e4e4e4',
        shadowOpacity: 0.7,
        shadowOffset: { width: 1, height: 3 },
        shadowRadius: 8,
        marginVertical: 10,
        borderStyle: 'solid',
        borderLeftWidth: 5,
        borderLeftColor: color,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8
      },
      title: {
        fontFamily: 'Nunito-Bold',
        color: '#3c4859',
        fontSize: 16,
        marginLeft: 8
      }
    })
    return (
      <TouchableOpacity style={styles.wrapper} onPress={this.takeMeasurement}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Icon name={icon} size={20} type="solid" color={color}/>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default withNavigation(Measurement)