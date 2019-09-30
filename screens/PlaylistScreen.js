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
import {CirclesLoader, PulseLoader, TextLoader, DotsLoader } from 'react-native-indicator';

export default function PlaylistScreen(screenProps) {
	const [loading, setLoading] = useState(false);
	const [dataSource, setDataSource] = useState([]);
	const id = screenProps.navigation.getParam("id");
	let thumbnailUrl = screenProps.navigation.getParam("thumbnailUrl")
	// Alert.alert(thumbnailUrl);

	const fetchData = () => {
		setLoading(true);
		fetch(`https://stephen-api.azurewebsites.net/api/playitems?playlistId=${id}`)
			.then(response => response.json())
			.then(responseJson => {
				 const items = responseJson.map(video => {
					 video.isSelect = false;
					 video.selectedClass = styles.list;
					 return video;
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
				Linking.openURL(`youtube://watch?v=${data.item.videoId}`);
			}}
			key={data.index}
			leftAvatar={{ source: { uri: data.item.thumbnailUrl }, rounded: false }}
			subtitle={data.item.text.substring(11)}
			title={data.item.text.substring(0, 10)}
			subtitleStyle={{ color: 'green' }}
			bottomDivider
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
	          style={styles.welcomeImage}
						source={{uri: thumbnailUrl}}
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

PlaylistScreen.navigationOptions = screenProps => ({
  title: screenProps.navigation.getParam("text")
});

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
		alignSelf: 'stretch',
		resizeMode: 'stretch',
		height: 240,
    marginTop: 0,
    marginLeft: 0,
	},
});
