import React from 'react';
import { Text, View, FlatList, ScrollView } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

function RenderHistory() {
  return (
    <Card title='Our History'>
      <Text style={{ margin: 10 }}>
        Started in 2010, Ristorante con Fusion quickly established itself as a
        culinary icon par excellence in Hong Kong. With its unique brand of
        world fusion cuisine that can be found nowhere else, it enjoys patronage
        from the A-list clientele in Hong Kong. Featuring four of the best
        three-star Michelin chefs in the world, you never know what will arrive
        on your plate the next time you visit us.
      </Text>
      <Text style={{ margin: 10 }}>
        The restaurant traces its humble beginnings to The Frying Pan, a
        successful chain started by our CEO, Mr. Peter Pan, that featured for
        the first time the world's best cuisines in a pan.
      </Text>
    </Card>
  );
}

const renderMenuItem = ({ item, index }) => {
  return (
    <ListItem
      key={index}
      title={item.name}
      subtitle={item.description}
      hideChevron={true}
      leftAvatar={{ source: { uri: baseUrl + item.image } }}
    />
  );
};

function RenderLeaders({ leaders }) {
  if (leaders.isLoading) {
    return (
      <Card title='Corporate Leadership'>
        <Loading />
      </Card>
    );
  } else if (leaders.errMess) {
    <Card title='Corporate Leadership'>
      <Text>{leaders.errMess}</Text>
    </Card>;
  }
  return (
    <Card title='Corporate Leadership'>
      <FlatList
        data={leaders}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id.toString()}
      />
    </Card>
  );
}

class About extends React.Component {
  static navigationOptions = {
    title: 'About'
  };

  render() {
    return (
      <ScrollView>
        <RenderHistory />
        <RenderLeaders leaders={this.props.leaders.leaders} />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    leaders: state.leaders
  };
};

export default connect(mapStateToProps, {})(About);
