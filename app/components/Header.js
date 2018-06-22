import React, { Component } from 'react'
import { Alert, View, StyleSheet, Text } from 'react-native'
import { withNavigation } from 'react-navigation';
import { IconButton } from './Button'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const styles = StyleSheet.create({
      header: {
        flexDirection: 'row',
        height: '8%',
        justifyContent: 'space-between',
        marginVertical: 12,
        alignItems: 'baseline',
        paddingHorizontal: '4%'
      },
      headerTitle: {
        fontSize: 28,
        fontFamily: 'Nunito-Bold',
        textAlign: 'right',
        marginRight: 8,
        backgroundColor: '#fff0',
        color: this.props.light?'#fff':'#3c4859'
      },
    })

    return (
      <View style={{...StyleSheet.flatten(styles.header), ...StyleSheet.flatten(this.props.style)}}>
        <IconButton 
          color={this.props.light?'#fff':'#3c4859'}
          name='angle-left'
          size={32}
          onPress={() => {
            if(this.props.warning) {
              Alert.alert(
                'Any unsaved progress will be lost',
                'Are you sure you want to continue?',
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'OK', onPress: () => {
                    this.props.navigation.goBack()
                  }}
                ]
              )
            }
            else {
              this.props.navigation.goBack(null)
            }
          }}/>
        <Text style={styles.headerTitle}>{this.props.title}</Text>
      </View>
    )
  }
  
}

export default withNavigation(Header)