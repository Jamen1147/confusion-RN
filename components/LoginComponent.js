import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { Icon, Input, CheckBox, Button } from 'react-native-elements';
import {
  SecureStore,
  Permissions,
  ImagePicker,
  Asset,
  ImageManipulator
} from 'expo';
import { createBottomTabNavigator } from 'react-navigation';
import { baseUrl } from '../shared/baseUrl';

class LoginTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      remember: false
    };
  }

  componentDidMount() {
    SecureStore.getItemAsync('userinfo').then(userdata => {
      let userinfo = JSON.parse(userdata);
      if (userinfo) {
        this.setState({
          username: userinfo.username,
          password: userinfo.password,
          remember: true
        });
      }
    });
  }

  handleLogin() {
    console.log(JSON.stringify(this.state));
    if (this.state.remember) {
      SecureStore.setItemAsync(
        'userinfo',
        JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      ).catch(e => console.log('Could not save user info', e));
    } else {
      SecureStore.deleteItemAsync('userinfo').catch(e =>
        console.log('Could not delete user info', e)
      );
    }
  }

  static navigationOptions = {
    title: 'Login',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name='sign-in'
        type='font-awesome'
        size={24}
        iconStyle={{ color: tintColor }}
      />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder='Username'
          leftIcon={{ type: 'font-awesome', name: 'user-o' }}
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
          containerStyle={styles.formInput}
        ></Input>
        <Input
          placeholder='Password'
          leftIcon={{ type: 'font-awesome', name: 'key' }}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          containerStyle={styles.formInput}
        ></Input>
        <CheckBox
          title='Remember Me'
          checked={this.state.remember}
          center
          onPress={() => this.setState({ remember: !this.state.remember })}
          containerStyle={styles.formCheckbox}
        ></CheckBox>
        <View style={styles.formButton}>
          <Button
            onPress={() => this.handleLogin()}
            title='Login'
            icon={
              <Icon
                name='user-plus'
                size={24}
                type='font-awesome'
                color='white'
              />
            }
            buttonStyle={{ backgroundColor: '#512da8' }}
          ></Button>
        </View>
        <View>
          <Button
            onPress={() => this.props.navigation.navigate('Register')}
            title='Register'
            icon={
              <Icon
                name='user-plus'
                size={24}
                type='font-awesome'
                color='white'
              />
            }
            buttonStyle={{ backgroundColor: '#512da8' }}
          ></Button>
        </View>
      </View>
    );
  }
}

class RegisterTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      remember: false,
      firstname: '',
      lastname: '',
      email: '',
      imageUrl: baseUrl + 'images/logo.png'
    };
  }

  static navigationOptions = {
    title: 'Register',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name='user-plus'
        type='font-awesome'
        size={24}
        iconStyle={{ color: tintColor }}
      />
    )
  };

  processImage = async imageUri => {
    let processedImage = await ImageManipulator.manipulate(
      imageUri,
      [{ resize: { width: 400 } }],
      { format: 'png' }
    );
    this.setState({ imageUrl: processedImage.uri });
  };

  handleRegister() {
    console.log(JSON.stringify(this.state));
    if (this.state.remember) {
      SecureStore.setItemAsync(
        'userinfo',
        JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      ).catch(e => console.log('Could not save user info', e));
    }
  }

  getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (
      cameraPermission.status === 'granted' &&
      cameraRollPermission.status === 'granted'
    ) {
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspects: [4, 3]
      });

      if (!capturedImage.cancelled) {
        this.processImage(capturedImage.uri);
      }
    }
  };

  getImageFromGallery = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (
      cameraPermission.status === 'granted' &&
      cameraRollPermission.status === 'granted'
    ) {
      let capturedImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });

      if (!capturedImage.cancelled) {
        this.processImage(capturedImage.uri);
      }
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: this.state.imageUrl }}
              loadingIndicatorSource={require('./images/logo.png')}
              style={styles.image}
            />
            <Button title='Camera' onPress={this.getImageFromCamera} />
            <Button title='Gallery' onPress={this.getImageFromGallery} />
          </View>
          <Input
            placeholder='Username'
            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
            containerStyle={styles.formInput}
          ></Input>
          <Input
            placeholder='Password'
            leftIcon={{ type: 'font-awesome', name: 'key' }}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            containerStyle={styles.formInput}
          ></Input>
          <Input
            placeholder='Firstname'
            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
            onChangeText={firstname => this.setState({ firstname })}
            value={this.state.firstname}
            containerStyle={styles.formInput}
          ></Input>
          <Input
            placeholder='Lastname'
            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
            onChangeText={lastname => this.setState({ lastname })}
            value={this.state.lastname}
            containerStyle={styles.formInput}
          ></Input>
          <Input
            placeholder='Email'
            leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            containerStyle={styles.formInput}
          ></Input>
          <CheckBox
            title='Remember Me'
            checked={this.state.remember}
            center
            onPress={() => this.setState({ remember: !this.state.remember })}
            containerStyle={styles.formCheckbox}
          ></CheckBox>
          <View style={styles.formButton}>
            <Button
              onPress={() => this.handleRegister()}
              title='Register'
              icon={
                <Icon
                  name='user-plus'
                  size={24}
                  type='font-awesome'
                  color='white'
                />
              }
              buttonStyle={{ backgroundColor: '#512da8' }}
            ></Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const Login = createBottomTabNavigator(
  {
    Login: LoginTab,
    Register: RegisterTab
  },
  {
    tabBarOptions: {
      activeBackgroundColor: '#9575cd',
      inactiveBackgroundColor: '#d1c4e9',
      activeTintColor: 'white',
      inactiveTintColor: 'gray'
    }
  }
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 20
  },
  formInput: {
    margin: 20
  },
  formCheckbox: {
    margin: 20,
    backgroundColor: null
  },
  formButton: {
    margin: 60
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  image: {
    margin: 10,
    width: 80,
    height: 60
  }
});

export default Login;
