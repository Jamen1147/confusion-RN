import React from 'react';
import { Text, View } from 'react-native';

export default class ErrorShield extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}

	componentDidCatch(error, info) {
		console.log(error, info);
	}

	render() {
		if (this.state.hasError) {
			// Render custom fallback UI or Text if there is error
			return (
				<View>
					<Text>Something went wrong : {this.state.error}</Text>
				</View>
			);
		}
		return this.props.children;
	}
}
