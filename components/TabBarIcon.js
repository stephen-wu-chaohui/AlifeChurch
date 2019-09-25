import React from 'react';
import {
  Image,
} from 'react-native';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
		<Image
			source={props.image}
			style={{tintColor: props.focused ? Colors.tabIconSelected : Colors.tabIconDefault, marginBottom: -3}}
      size={26}
		/>
  );
}
