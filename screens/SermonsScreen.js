import React, { useState, useEffect } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
	View,
	FlatList,
	Linking,
} from 'react-native';
import { ListItem } from 'react-native-elements';

import { useNavigation } from 'react-navigation-hooks';

export default function SermonsScreen() {
	const [loading, setLoading] = useState(false);
	const [dataSource, setDataSource] = useState([]);
	const { navigate } = useNavigation();

	const fetchData = () => {
		setLoading(true);
		fetch("https://stephen-api.azurewebsites.net/api/playlists?channelId=UCtcwkfeJL45qwR4MEJSHhYw")
			.then(response => response.json())
			.then(responseJson => {
				 const items = responseJson.map(playlist => {
					 playlist.isSelect = false;
					 playlist.selectedClass = styles.list;
					 return playlist;
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
				navigate('PlaylistScreen', data.item);
			}}
			key={data.index}
			leftAvatar={{ source: { uri: data.item.thumbnailUrl }, rounded: false }}
			title={data.item.text}
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
            source={require('../assets/images/sunday.png')}
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

SermonsScreen.navigationOptions = {
	title: 'Sermons',
	};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#96d1ff',
  },
  contentContainer: {
    paddingTop: 0,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 0,
  },
  welcomeImage: {
		resizeMode: 'stretch',
		height: 140,
    marginTop: 0,
    marginLeft: 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 22,
  },
});
