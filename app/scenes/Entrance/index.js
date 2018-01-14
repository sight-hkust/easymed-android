import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Redirect, Link } from 'react-router-native';

const destinations = [
  {
    to: '/triage',
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
    to: '/consultation',
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
    to: '/pharmacy',
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

const Entry = ({layout, title, image, to}) => (
  <Link style={styles.card} to={to} component={TouchableOpacity} activeOpacity={0.25}>
    <LinearGradient {...layout} style={styles.linearGradient}>
      <Image style={styles.image} source={image}/>
      <Text style={styles.title}>{title}</Text>
    </LinearGradient>
  </Link>
)

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>Procedures</Text>
  </View>
)

const Navigations = () => {
  return (
    <View style={styles.container}>
      <Header/>
      <ScrollView>
        {destinations.map(({to, layout, title, image}, i) => (
          <Entry key={i} to={to} layout={layout} title={title} image={image} />
        ))}
      </ScrollView>
    </View>
  )
};

const Entrance = ({user}) => {
  return <Navigations/>
  // if(user){
  //   return <Navigations/>
  // }
  // else {
  //   return <Redirect to="/login"/>
  // }
};

export default Entrance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f6fb'
  },

  header: {
    width: '100%',
    height: 136,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  headerTitle: {
    fontSize: 38,
    fontFamily: 'Nunito-Bold',
    color: '#3c4859',
    marginLeft: 16,
    marginTop: 56
  },

  card:{
    height: 160,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 16,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    elevation: 1
  },
  
  title: {
    fontSize: 30,
    fontFamily: 'Quicksand-Medium',
    textAlign: 'center',
    color: '#FFF',
    paddingBottom:16,
    paddingRight:20,
  },

  image: {
    height: 120,
    width: 120,
    resizeMode: 'contain',
    marginTop: 20,
    marginLeft: 20,
  },

  linearGradient: {
    flexDirection: 'row',
    flex: 3,
    alignItems: 'baseline',
    justifyContent: 'space-between',
    borderRadius: 6,
  },
});