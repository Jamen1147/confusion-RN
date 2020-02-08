import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

function RenderItem(props) {
  const item = props.item;
  if (item !== null) {
    return (
      <Card
        featuredTitle={item.name}
        featuredSubtitle={item.designation}
        image={require('./images/uthappizza.png')}
      >
        <Text style={{ margin: 10 }}>{item.description}</Text>
      </Card>
    );
  } else {
    return <View></View>;
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  static navigationOptions = {
    title: 'Home'
  };

  render() {
    return (
      <ScrollView>
        <RenderItem
          item={this.state.dishes.filter(x => x.featured)[0]}
        ></RenderItem>
        <RenderItem
          item={this.state.promotions.filter(x => x.featured)[0]}
        ></RenderItem>
        <RenderItem
          item={this.state.leaders.filter(x => x.featured)[0]}
        ></RenderItem>
      </ScrollView>
    );
  }
}

export default Home;
