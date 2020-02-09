import React from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Button,
  Modal,
  StyleSheet
} from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

function RenderDish({ dish, favorite, onFavPress, onCommentPress }) {
  if (dish != null) {
    return (
      <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
        <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              flexDirection: 'row',
              margin: 20
            }}
          >
            <Icon
              raised
              reverse
              name={favorite ? 'heart' : 'heart-o'}
              type='font-awesome'
              color='#f50'
              onPress={() =>
                favorite ? console.log('already your fav') : onFavPress()
              }
            />
            <Icon
              raised
              reverse
              name='pencil'
              type='font-awesome'
              color='#512da8'
              onPress={() => onCommentPress()}
            />
          </View>
        </Card>
      </Animatable.View>
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
        <Text style={{ fontSize: 14, marginBottom: 10 }}>{item.comment}</Text>
        <View>
          <Rating
            fractions='{1}'
            startingValue={item.rating}
            readonly
            size={2}
            imageSize={12}
            style={{ position: 'absolute', left: 0, top: -6 }}
          />
        </View>
        <Text style={{ fontSize: 12, marginTop: 10 }}>
          {`-- ${item.author}, ${item.date}`}
        </Text>
      </View>
    );
  };
  return (
    <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
      <Card title='Comments'>
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={item => item.id.toString()}
        ></FlatList>
      </Card>
    </Animatable.View>
  );
}

class Dishdetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      author: '',
      comment: '',
      rating: 3
    };
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  resetForm() {
    this.setState({
      author: '',
      comment: '',
      rating: 3
    });
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
          favorite={this.props.favorites.some(el => el === dishId)}
          onFavPress={() => this.markFavorite(dishId)}
          onCommentPress={() => this.toggleModal()}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            x => x.dishId === dishId
          )}
        />
        <Modal
          animationType='slide'
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => {
            this.toggleModal();
            this.resetForm();
          }}
        >
          <View style={styles.modal}>
            <Text style={styles.modalText}></Text>
            <Text style={styles.modalText}></Text>
            <Rating
              showRating
              fractions='{1}'
              startingValue={this.state.rating}
            />
            <Text style={styles.modalText}></Text>
            <Input
              placeholder='Author'
              leftIcon={<Icon name='person' size={24} color='black' />}
              value={this.state.author}
              onChange={val => this.setState({ author: val })}
            />
            <Input
              placeholder='Comments'
              leftIcon={<Icon name='comment' size={24} color='black' />}
              value={this.state.comment}
              onChange={val => this.setState({ comment: val })}
            />
            <Text style={styles.modalText}></Text>
            <Button
              onPress={() => {
                this.props.postComment(
                  dishId,
                  this.state.author,
                  this.state.comment,
                  this.state.rating
                );
                this.toggleModal();
                this.resetForm();
              }}
              color='512da8'
              title='Submit'
            ></Button>
            <Text style={styles.modalText}></Text>
            <Button
              onPress={() => {
                this.toggleModal();
                this.resetForm();
              }}
              color='512da8'
              title='Calcel'
            ></Button>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512da8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20
  },
  modalText: {
    fontSize: 18,
    margin: 10
  }
});

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  };
};

const mapDispatchToProps = dispatch => ({
  postFavorite: dishId => dispatch(postFavorite(dishId)),
  postComment: (dishId, author, comment, rating) =>
    dispatch(postComment(dishId, author, comment, rating))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
