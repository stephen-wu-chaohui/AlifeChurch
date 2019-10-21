import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { Input, TextLink, Loading, Button } from './common';
import serviceBroker from '../services/serviceBroker';

class Login extends Component {
	constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    };

    this.loginUser = this.loginUser.bind(this);
	}

  loginUser() {
	  const { email, password } = this.state;
    this.setState({ error: '', loading: true });
		serviceBroker.loginUser(email, password)
		.then(response => {
			this.setState({
				error: '',
				loading: false,
				loggedIn: true
			});
			this.props.OnLoggedIn();
		})
		.catch(err => {
			console.log('err', err);
			this.setState({
				error: 'Login Failed',
				loading: false
			});
		})
  }

  render() {
    const { email, password, error, loading } = this.state;
    const { form, section, errorTextStyle, textLinkStyle } = styles;

    return (
      <Fragment>
        <View style={form}>
          <View style={section}>
            <Input
              placeholder="user@email.com"
              label="Email"
              value={email}
              onChangeText={email => this.setState({ email })}
            />
          </View>

          <View style={section}>
            <Input
              secureTextEntry
              placeholder="password"
              label="Password"
              value={password}
              onChangeText={password => this.setState({ password })}
            />
          </View>

          <Text style={errorTextStyle}>
            {error}
          </Text>

          {!loading ?
            <Button onPress={this.loginUser}>
              Login
            </Button>
            :
            <Loading size={'large'} />
          }

        </View>
        <TextLink style={textLinkStyle} onPress={this.props.authSwitch}>
          Don't have an account? Register!
        </TextLink>
      </Fragment>
    );
  }
}

const styles = {
  form: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  section: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  },
	textLinkStyle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'blue'
	}
};

export { Login };
