import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Redirect } from 'react-router-native';

const destinations = [
  {
    title: 'Triage',
    image: require('../../../assets/images/triage.png'),
    layout: {
      colors: ['#57DAAD','#29DE56'],
      start: {x: 1.0, y: 0.5},
      end: {x: 0.0, y: 1.0},
      locations: [0, 1.0]
    }
  },
  {
    title: 'Consultation',
    image: require('../../../assets/images/consultation.png'),
    layout: {
      colors: ['#4BE4D2','#51AAF6'],
      start: {x: 1.0, y: 0.25},
      end: {x: 0.0, y: 1.0},
      locations: [0, 1.0]
    }
  },
  {
    title: 'Pharmacy',
    image: require('../../../assets/images/pharmacy.png'),
    layout: {
      colors: ['#F98E6F','#F665AB'],
      start: {x: 1.0, y: 0.3},
      end: {x: 0.0, y: 1.0},
      locations: [0, 0.8]
    }
  }
];

const Entrypoint = () => {
  return (
    <View style={styles.container}>
      {destinations.map((location, i) => (
        <TouchableOpacity key={i} style={styles.card}>
          <LinearGradient {...location.layout} style={styles.linearGradient}>
            <Image style={styles.image} source={location.image}/>
            <Text style={styles.title}>{location.title}</Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  )
};

// const Entrypoint = ({user}) => {
//   <Navigations/>
//   // if(user){
//   //   return <Navigations/>
//   // }
//   // else {
//   //   return <Redirect to="/login"/>
//   // }
// };

export default Entrypoint;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 8,
  },

  card:{
    height: 180,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 16,
  },
  
  title: {
    fontSize: 30,
    fontFamily: 'Quicksand-Medium',
    textAlign: 'center',
    color: '#FFF',
    paddingBottom:16,
    paddingRight:12,
  },

  image: {
    height: 130,
    width: 120,
    resizeMode: 'contain',
    marginTop: 30,
    marginLeft: 24,
  },

  linearGradient: {
    flexDirection: 'row',
    flex: 3,
    alignItems: 'baseline',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
});