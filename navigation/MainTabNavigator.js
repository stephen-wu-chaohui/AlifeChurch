import React from 'react';
import { Platform } from 'react-native';

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SermonsScreen from '../screens/SermonsScreen';
import PlaylistScreen from '../screens/PlaylistScreen';
import GroupsScreen from '../screens/GroupsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

// HomeStack
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Church',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} image={require('../assets/images/cross.png')} />
	),
};

HomeStack.path = '';

// SermonsStack
const SermonsStack = createStackNavigator(
  {
		Home: {screen: SermonsScreen},
		PlaylistScreen: {screen: PlaylistScreen},
  },
  config
);

SermonsStack.navigationOptions = {
  tabBarLabel: 'Sermons',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} image={require('../assets/images/sermons.png')} />
	),
};

SermonsStack.path = '';

// GroupsStack
const GroupsStack = createStackNavigator(
  {
    Groups: GroupsScreen,
  },
  config
);

GroupsStack.navigationOptions = {
  tabBarLabel: 'Groups',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} image={require('../assets/images/group.png')} />
  ),
};

GroupsStack.path = '';

//SettingsStack
const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
		<TabBarIcon focused={focused} image={require('../assets/images/profile.png')} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  SermonsStack,
  GroupsStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
