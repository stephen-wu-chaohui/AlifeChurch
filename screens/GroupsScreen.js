import React, { useState, useEffect } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import {
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
	View,
	FlatList,
	Linking,
	Alert,
} from 'react-native';
import { ListItem } from 'react-native-elements';

export default function GroupsScreen(screenProps) {
	const [loading, setLoading] = useState(false);
	const [dataSource, setDataSource] = useState([]);
	const id = screenProps.navigation.getParam("id");

	const fetchData = () => {
		setLoading(true);
		fetch(`https://stephen-api.azurewebsites.net/api/groups/public?visibility=Any`)
			.then(response => response.json())
			.then(responseJson => {
				 const items = responseJson.map(group => {
					 group.isSelect = false;
					 group.selectedClass = styles.list;
					 // group.fbGroupId = '665038070571836';
					 return group;
				 });
				 setLoading(false);
				 setDataSource(items);
			}).catch(error => {
				this.setLoading(false);
		});
	};

	const renderItem = data => (
    <ListItem
			onPress={() => {
				Linking.openURL(`fb://profile/${data.item.fbGroupId}?ref=share`);
			}}
			key={data.index}
			leftAvatar={{ source: { uri: data.item.image }, rounded: false }}
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
