import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Header from '../../../components/Header';
import Icon from 'react-native-fontawesome-pro';
import { Button } from '../../../components/Button'

const menuItems = [
  {
    destination: '/vitals',
    icon: 'heartbeat',
    color: '#566df0',
    title: 'Vitals'
  },
  {
    destination: '/history',
    icon: 'procedures',
    color: '#566df0',
    title: 'Previous Medical History'
  },
  {
    destination: '/screening',
    icon: 'diagnoses',
    color: '#566df0',
    title: 'Screening'
  },
  {
    destination: '/vaccination',
    icon: 'allergies',
    color: '#566df0',
    title: 'Drug History and Allergies'
  },
  {
    destination: '/pregnancy',
    icon: 'female',
    color: '#566df0',
    title: 'Pregnancy'
  }
]

export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pathPrefix: props.match.url
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <Header title="Add Records" to="/triage"/>
          <ScrollView>
            {menuItems.map(({destination, icon, color, title}, i) => (
              <Link style={styles.menuItem} to={`${this.state.pathPrefix}${destination}`} key={i}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Icon name={`${icon}`} size={20} type="solid" color={`${color}`}/>
                  <Text style={styles.text}>{title}</Text>
                </View>
              </Link>
            ))}
          </ScrollView>
          <Button 
            title="Submit"
            bgColor="#1d9dff" titleColor="#fff" 
            icon="chevron-right"
            width="50%"
            round
          />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fb',
    paddingVertical: '6%',
    justifyContent: 'space-between',
  },
  menuItem: {
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
    borderLeftColor: '#566DF0',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8
  },
  text: {
    fontFamily: 'Nunito-Bold',
    color: '#3c4859',
    fontSize: 16,
    marginLeft: 8
  }
});