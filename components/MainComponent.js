import React, { Component } from 'react';
import { View } from 'react-native';

import { DISHES } from '../shared/dishes';

import ErrorShield from './ErrorShieldComponent';

import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dishes: DISHES,
			selectedDishId: null
		};
	}

	onDishSelect(dishId) {
		this.setState({ selectedDish: dishId });
	}

	render() {
		return (
			<ErrorShield>
				<View>
					<Menu dishes={this.state.dishes} onPress={(dishId) => this.onDishSelect(dishId)} />
					<Dishdetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
				</View>
			</ErrorShield>
		);
	}
}

export default Main;
