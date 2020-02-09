import React, { Component } from 'react';
import {
  View,
  Platform,
  Image,
  StyleSheet,
  ScrollView,
  Text
} from 'react-native';
import {
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView
} from 'react-navigation';
import ErrorShield from './ErrorShieldComponent';
import { Icon } from 'react-native-elements';

import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponenet';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';

import { connect } from 'react-redux';
import {
  fetchComments,
  fetchDishes,
  fetchLeaders,
  fetchPromos
} from '../redux/ActionCreators';

const MenuNavigator = createStackNavigator(
  {
    Menu: {
      screen: Menu,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Icon
            name='menu'
            color='white'
            size={24}
            onPress={() => navigation.toggleDrawer()}
          />
        )
      })
    },
    Dishdetail: { screen: Dishdetail }
  },
  {
    initialRouteName: 'Menu',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#512da8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      }
    }
  }
);

const HomeNavigator = createStackNavigator(
  {
    Home: { screen: Home }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#512da8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      },
      headerLeft: (
        <Icon
          name='menu'
          color='white'
          size={24}
          onPress={() => navigation.toggleDrawer()}
        />
      )
    })
  }
);

const ContactNavigator = createStackNavigator(
  {
    Contact: { screen: Contact }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#512da8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      },
      headerLeft: (
        <Icon
          name='menu'
          color='white'
          size={24}
          onPress={() => navigation.toggleDrawer()}
        />
      )
    })
  }
);

const AboutNavigator = createStackNavigator(
  {
    About: { screen: About }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#512da8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      },
      headerLeft: (
        <Icon
          name='menu'
          color='white'
          size={24}
          onPress={() => navigation.toggleDrawer()}
        />
      )
    })
  }
);

const ReservationNavigator = createStackNavigator(
  {
    Reservation: { screen: Reservation }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#512da8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      },
      headerLeft: (
        <Icon
          name='menu'
          color='white'
          size={24}
          onPress={() => navigation.toggleDrawer()}
        />
      )
    })
  }
);

const FavoritesNavigator = createStackNavigator(
  {
    Favorites: { screen: Favorites }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#512da8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      },
      headerLeft: (
        <Icon
          name='menu'
          color='white'
          size={24}
          onPress={() => navigation.toggleDrawer()}
        />
      )
    })
  }
);

const LoginNavigator = createStackNavigator(
  {
    Login: { screen: Login }
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#512da8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      },
      headerLeft: (
        <Icon
          name='menu'
          color='white'
          size={24}
          onPress={() => navigation.toggleDrawer()}
        />
      )
    })
  }
);

const CustomDrawerContentComponent = props => {
  return (
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <View style={styles.drawerHeader}>
          <View style={{ flex: 1 }}>
            <Image
              source={require('./images/logo.png')}
              style={styles.drawerImage}
            />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  );
};

const MainNavigator = createDrawerNavigator(
  {
    Login: {
      screen: LoginNavigator,
      navigationOptions: {
        title: 'Login',
        drawerLabel: 'Login',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name='address-card'
            type='font-awesome'
            size={22}
            color={tintColor}
          />
        )
      }
    },
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        title: 'Home',
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
          <Icon name='home' type='font-awesome' size={24} color={tintColor} />
        )
      }
    },
    About: {
      screen: AboutNavigator,
      navigationOptions: {
        title: 'About',
        drawerLabel: 'About',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name='info-circle'
            type='font-awesome'
            size={24}
            color={tintColor}
          />
        )
      }
    },
    Contact: {
      screen: ContactNavigator,
      navigationOptions: {
        title: 'Contact',
        drawerLabel: 'Contact',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name='address-card'
            type='font-awesome'
            size={22}
            color={tintColor}
          />
        )
      }
    },
    Reservation: {
      screen: ReservationNavigator,
      navigationOptions: {
        title: 'Reservation',
        drawerLabel: 'Reservation',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name='address-card'
            type='font-awesome'
            size={22}
            color={tintColor}
          />
        )
      }
    },
    Favorites: {
      screen: FavoritesNavigator,
      navigationOptions: {
        title: 'Favorites',
        drawerLabel: 'Favorites',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name='address-card'
            type='font-awesome'
            size={22}
            color={tintColor}
          />
        )
      }
    },
    Menu: {
      screen: MenuNavigator,
      navigationOptions: {
        title: 'Menu',
        drawerLabel: 'Menu',
        drawerIcon: ({ tintColor }) => (
          <Icon name='list' type='font-awesome' size={24} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: 'Home',
    drawerBackgroundColor: '#d1c4e9',
    contentComponent: CustomDrawerContentComponent
  }
);

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    return (
      <ErrorShield>
        <View
          style={{
            flex: 1,
            paddingTop:
              Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
          }}
        >
          <MainNavigator />
        </View>
      </ErrorShield>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerHeader: {
    backgroundColor: '#512da8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchPromos: () => dispatch(fetchPromos())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
