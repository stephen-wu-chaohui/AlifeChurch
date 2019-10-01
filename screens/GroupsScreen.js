import React, { useState, useEffect } from 'react';
import {
  Image,
	ScrollView,
	View,
	StyleSheet,
	Alert,
  SafeAreaView,
	FlatList,
	Linking,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import {CirclesLoader } from 'react-native-indicator';
import { useNavigation } from 'react-navigation-hooks';

import * as Facebook from 'expo-facebook';

export default function GroupsScreen() {
	const [loading, setLoading] = useState(false);
	const [dataSource, setDataSource] = useState([]);
	const { navigate } = useNavigation();

  const fetchData = async () => {
		setLoading(true);
    try {
			const type = 'success';
			const token = 'EAANMfBlL3l4BACrDFxc9Jv6ZAInYVHm0lAZAlqIBWcZCz042u4bH0XbsQzfpnKCmCsNBW53xzLqZBiwg4B2xDk6lkuLOxXKS92GaU8O7ZAXDyyEF66bE2lnNeLAeqnpVInnndiQLv3oDCWXBN3LbEejcjF6DZBNahpK6yIfRHji70J15q3NZC7h'
      // const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      //   '928520814190174',
      //   { permissions: ['public_profile'] }
			// );
			const userId = '2447699405508810';
			if (type === "success") {
				facebookToken = token;
				const url = `https://graph.facebook.com/v4.0/${userId}/groups?access_token=${token}&fields=name,privacy,owner,id,icon,cover&format=json&method=get&pretty=0&suppress_http_code=1&transport=cors`;
				fetch(url)
					.then(response => response.json())
					.then(responseJson => {
						 const items = responseJson.data
						 .filter(group => group.privacy === "CLOSED" && group.owner && group.owner.id === userId)
						 .map(group => {
							 group.isSelect = false;
							 group.selectedClass = styles.list;
							 return group;
						 });
						 setLoading(false);
						 setDataSource(items);
					}).catch(error => {
						this.setLoading(false);
				});
			} else {
				Alert.alert(
					`Failed - ${type}`,
					'Login was failed!',
				);
			}
    } catch (e) {
      Alert.alert(
        `Oops! - ${e.toString()}`,
        'Login failed!',
      );
		}
  };

	const renderItem = data => (
    <ListItem
			onPress={() => {
				data.item.token = this.facebookToken;
				data.item.coversource = data.item.cover.source;
				navigate('AlbumsScreen', data.item);
			}}
			key={data.item.id}
			leftAvatar={{ source: { uri: data.item.cover.source }, rounded: false }}
			title={data.item.name}
			bottomDivider
			chevron
		/>
	);

	useEffect(() => {
		fetchData();
	}, []);


    return (
    <View style={styles.container}>
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainer}>
				<View style={styles.welcomeContainer}>
					<Image
						source={require('../assets/images/groups.png')}
						style={styles.welcomeImage}
					/>
					{ loading && <CirclesLoader size={80} dotRadius={16} color='yellow'/> }
				</View>
				<SafeAreaView style={styles.container}>
					<FlatList
						data={dataSource}
						renderItem={renderItem}
						keyExtractor={item => item.id}
					/>
				</SafeAreaView>
			</ScrollView>
		</View>
    );
}

GroupsScreen.navigationOptions = {
  title: 'Groups',
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#96d1ff',
    paddingTop: 0,
	},
	loader : {
		alignSelf: 'center'
	},
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 0,
  },
  welcomeImage: {
		width: 380,
		height: 240,
	},
});
