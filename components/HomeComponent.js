import React from 'react';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ha: ''
    };
  }

  static navigationOptions = {
    title: 'Home'
  };

  render() {
    return (
      <View>
        <Text>Home Component</Text>
      </View>
    );
  }
}

export default Home;
