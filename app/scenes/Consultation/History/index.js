import React, { Component } from 'react';
import { Dimensions, ScrollView, View, Text, StatusBar, StyleSheet } from 'react-native';
import { IconButton } from '../../../components/Button';

const { width, height } = Dimensions.get('window');

export const Cases = () => (
  <View style={styles.cases}>
    <ScrollView>
      <View style={styles.record}>
        <View style={{height:24, width:64, backgroundColor: '#FFCE45', borderRadius: 8, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 12}}>123456</Text>
        </View>

        <View style={{height:'80%', width:'60%', alignItems:'flex-start', justifyContent:'center', paddingLeft:8}}>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#A4A6AA', fontSize: 16}}>11/07/2017</Text>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#3c4859', fontSize: 18}}>Fever</Text>
        </View>
        
        <IconButton name="chevron-circle-right" type="solid" color="#3c4859" size={24}/>
      </View>

      <View style={styles.record}>
        <View style={{height:24, width:64, backgroundColor: '#FFCE45', borderRadius: 8, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 12}}>123456</Text>
        </View>

        <View style={{height:'80%', width:'60%', alignItems:'flex-start', justifyContent:'center', paddingLeft:8}}>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#A4A6AA', fontSize: 16}}>11/07/2017</Text>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#3c4859', fontSize: 18}}>Fever</Text>
        </View>
        
        <IconButton name="chevron-circle-right" type="solid" color="#3c4859" size={24}/>
      </View>
      <View style={styles.record}>
        <View style={{height:24, width:64, backgroundColor: '#FFCE45', borderRadius: 8, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 12}}>123456</Text>
        </View>

        <View style={{height:'80%', width:'60%', alignItems:'flex-start', justifyContent:'center', paddingLeft:8}}>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#A4A6AA', fontSize: 16}}>11/07/2017</Text>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#3c4859', fontSize: 18}}>Fever</Text>
        </View>
        
        <IconButton name="chevron-circle-right" type="solid" color="#3c4859" size={24}/>
      </View>
      <View style={styles.record}>
        <View style={{height:24, width:64, backgroundColor: '#FFCE45', borderRadius: 8, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#fff', fontSize: 12}}>123456</Text>
        </View>

        <View style={{height:'80%', width:'60%', alignItems:'flex-start', justifyContent:'center', paddingLeft:8}}>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#A4A6AA', fontSize: 16}}>11/07/2017</Text>
          <Text style={{fontFamily: 'Nunito-Bold', color: '#3c4859', fontSize: 18}}>Fever</Text>
        </View>
        
        <IconButton name="chevron-circle-right" type="solid" color="#3c4859" size={24}/>
      </View>
    </ScrollView>
  </View>
)


const styles = StyleSheet.create({
  cases: {
    height: Dimensions.get('window').height*.5,
    width: Dimensions.get('window').width,
    marginVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'center',
  },
  record: {
    borderRadius: 6,
    backgroundColor: '#fff',
    height: 64,
    width: '100%',
    shadowColor: '#e4e4e4',
    shadowOpacity: 0.7,
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 8,
    marginVertical: 6,
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderLeftColor: '#566DF0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8
  },
})

