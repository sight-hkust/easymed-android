import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Redirect, Link } from 'react-router-native';
import Icon from 'react-native-fontawesome-pro';
import { IconButton } from '../../components/Button'

const { width, height } = Dimensions.get('window')

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

const Entry = ({layout, title, image, to}) => {
  const style = StyleSheet.create({
    card:{
      height: height*.22,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      marginLeft: 16,
      marginRight: 16,
      marginBottom: 16,
      shadowColor: '#e4e4e4',
      shadowOpacity: 0.5,
      shadowOffset: { width: 1, height: 3 },
      shadowRadius: 5,
      elevation: 1
    },
    title: {
      fontSize: 30,
      fontFamily: 'Quicksand-Medium',
      textAlign: 'center',
      color: '#FFF',
      paddingBottom:16,
    },
  
    image: {
      height: height*.16,
      width: height*.16,
      resizeMode: 'contain',
      marginTop: 20,
    },
  
    linearGradient: {
      flexDirection: 'row',
      flex: 3,
      alignItems: 'baseline',
      justifyContent: 'space-between',
      borderRadius: 8,
      paddingHorizontal: 16
    }

  })

  return (
    <Link style={style.card} to={to} component={TouchableOpacity} activeOpacity={0.25}>
      <LinearGradient {...layout} style={style.linearGradient}>
        <Image style={style.image} source={image}/>
        <Text style={style.title}>{title}</Text>
      </LinearGradient>
    </Link>
  )
}

const Toolbar = () => (
  <View style={styles.toolbar}>
    <IconButton name="cog" color="#3c4859" to="/settings" />
    <IconButton name="user-md" color="#3c4859" />
    <IconButton name="bell" color="#3c4859" />
  </View>
)

const Header = () => (
  <View style={styles.header}>
    <View style={styles.headerTitle}>
      <Icon name="hospital" color="#3c4859" size={26} type="solid"/>
      <Text style={styles.headerTitleText}>Home</Text>
    </View>
  </View>
)

const Navigations = () => {
  return (
    <ScrollView>
      {destinations.map(({to, layout, title, image}, i) => (
        <Entry key={i} to={to} layout={layout} title={title} image={image} />
      ))}
    </ScrollView>
  )
};

class Entrance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: props.authenticated
    }
  }

  componentWillMount() {
    StatusBar.setBarStyle('dark-content');
  }

  render() {
    if(this.state.authenticated) {
      return (
        <View style={styles.container}>
          <Toolbar />
          <Header />
          <Navigations />
        </View>
      )
    }
    else {
      return <Redirect to="/login" />
    }
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated
})

export default connect(mapStateToProps)(Entrance)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f6fb',
    paddingTop: '10%'
  },

  toolbar: {
    height: 40,
    width: '45%',
    alignSelf: 'flex-end',
    paddingTop: 4,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  header: {
    height: 44,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'yellow'
  },

  headerTitle: {
    marginLeft: 24,
    flexDirection: 'row',
    alignItems: 'center'
  },

  headerTitleText: {
    fontSize: 30,
    fontFamily: 'Quicksand-Medium',
    color: '#3c4859',
    marginLeft: 4
  },
});