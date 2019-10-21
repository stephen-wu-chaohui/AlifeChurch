import React from 'react';
import { Platform } from 'react-native';

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CellGroupsScreen from '../screens/CellGroupsScreen';
import AlbumsScreen from '../screens/AlbumsScreen';
import PostsScreen from '../screens/PostsScreen';
import SermonsScreen from '../screens/SermonsScreen';
import PlaylistScreen from '../screens/PlaylistScreen';
import FacebookGroupsScreen from '../screens/FacebookGroupsScreen';
import FacebookAlbumsScreen from '../screens/FacebookAlbumsScreen';
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
		Home: { screen: SermonsScreen},
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

// facebookGroupsStack
const FacebookGroupsStack = createStackNavigator(
  {
    FaceBookGroups: FacebookGroupsScreen,
		AlbumsScreen: {screen: FacebookAlbumsScreen},
  },
  config
);

FacebookGroupsStack.navigationOptions = {
  tabBarLabel: 'Facebook',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} image={require('../assets/images/group.png')} />
  ),
};

FacebookGroupsStack.path = '';

// cellGroupsStack
const CellGroupsStack = createStackNavigator(
  {
		CellGroups: CellGroupsScreen,
		AlbumsScreen: {screen: AlbumsScreen},
		PostsScreen: {screen: PostsScreen}
  },
  config
);

CellGroupsStack.navigationOptions = {
  tabBarLabel: 'My Groups',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} image={require('../assets/images/surfing.png')} />
  ),
};

CellGroupsStack.path = '';

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
	CellGroupsStack
});

tabNavigator.path = '';

export default tabNavigator;
