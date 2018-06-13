import React from 'react'
import { View, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import Spinner from 'react-native-spinkit'

const Loading = ({isLoading}) => (
  <Modal
    isVisible={isLoading}
    animationIn="fadeIn"
    backdropOpacity={0}
    style={{justifyContent: 'center'}}
  >
    <View style={styles.loading}>
      <Spinner
      isVisible={isLoading}
      size={44}
      style={{alignSelf: 'center'}}
      type='Bounce' 
      color='#81e2d9'/>
    </View>
  </Modal>
)

export default Loading

const styles = StyleSheet.create({
  loading: {
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 88,
    width: 88,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 8
  }
})