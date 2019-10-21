import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { Input, TextLink, Loading, Button } from './common';
import serviceBroker from '../services/serviceBroker';

class Registration extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      error: '',
			loading: false
    };

    this.registerUser = this.registerUser.bind(this);
	}

  registerUser() {
    const { preferName, formalName, email, password } = this.state;
    this.setState({ error: '', loading: true });
		serviceBroker.registerUser({preferName, formalName, email, password})
		.then(response => {
			this.setState({
				error: '',
				loading: false,
				loggedIn: true
			});
			this.props.OnLoggedIn();
		})
		.catch(err => {
			this.setState({
				error: 'Registration Failed',
				loading: false
			});
		})
  }

  render() {
    const { preferName, formalName, email, password, password_confirmation, error, loading } = this.state;
    const { form, section, errorTextStyle, textLinkStyle } = styles;

    return (
      <Fragment>
        <View style={form}>
				<View style={section}>
            <Input
              placeholder="Steve"
              label="Prefer name"
              value={preferName}
              onChangeText={preferName => this.setState({ preferName })}
            />
          </View>

          <View style={section}>
            <Input
              placeholder="Stephen Wu"
              label="Formal Name"
              value={formalName}
              onChangeText={formalName => this.setState({ formalName })}
            />
          </View>

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

          <View style={section}>
            <Input
              secureTextEntry
              placeholder="confirm password"
              label="Confirm Password"
              value={password_confirmation}
              onChangeText={password_confirmation => this.setState({ password_confirmation })}
            />
          </View>

          <Text style={errorTextStyle}>
            {error}
          </Text>

          {!loading ?
            <Button onPress={this.registerUser}>
              Register
            </Button>
            :
            <Loading size={'large'} />
          }
        </View>
        <TextLink style={textLinkStyle} onPress={this.props.authSwitch}>
          Already have an account? Log in!
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

export { Registration };
