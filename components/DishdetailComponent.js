import React from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

function RenderDish({ dish, favorite, onPress }) {
  if (dish != null) {
    return (
      <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <Icon
          raised
          reverse
          name={favorite ? 'heart' : 'heart-o'}
          type='font-awesome'
          color='#f50'
          onPress={() =>
            favorite ? console.log('already your fav') : onPress()
          }
        />
      </Card>
    );
  } else {
    return <View />;
  }
}

function RenderComments(props) {
  const { comments } = props;
  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>
          {`-- ${item.author}, ${item.date}`}
        </Text>
      </View>
    );
  };
  return (
    <Card title='Comments'>
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item.id.toString()}
      ></FlatList>
    </Card>
  );
}

class Dishdetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    };
  }

  markFavorite(dishId) {
    this.setState({ favorites: [...this.state.favorites, dishId] });
  }

  static navigationOptions = {
    title: 'Dish Details'
  };

  render() {
    const dishId = this.props.navigation.getParam('dishId', '');
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.state.favorites.some(x => x === dishId)}
          onPress={() => this.markFavorite(dishId)}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            x => x.dishId === dishId
          )}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments
  };
};

export default connect(mapStateToProps, {})(Dishdetail);
