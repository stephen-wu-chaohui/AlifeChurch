import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
	FlatList,
	Text,
	Linking,
	Dimensions,
} from 'react-native';
import {CirclesLoader } from 'react-native-indicator';
import Image from 'react-native-scalable-image';

export default function PostsScreen(screenProps) {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const coversource = screenProps.navigation.getParam("image");
  const posts = screenProps.navigation.getParam("posts");

  const renderItem = data => (
		<View style={styles.postItem}>
			<Image
				source={{uri: data.item.image}}
				style={styles.postImage}
				width={Dimensions.get('window').width}
			/>
			<View style={styles.titleContainer}>
        <Text style={styles.titleText}>{data.item.name}</Text>
      </View>
      <View style={styles.missionStatementContainer}>
				<Text style={styles.missionStatementText}>{data.item.missionStatement}</Text>
			</View>
		</View>
	);

  useEffect(() => {
		setDataSource(posts);
		setLoading(false)
	}, []);


  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
					{ loading &&
		        <View style={styles.welcomeContainer}>
		          <Image
		            style={styles.welcomeImage}
		            source={{uri: coversource}}
		          />
		          <CirclesLoader size={80} dotRadius={16} color='yellow'/>
		        </View>
					}
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

PostsScreen.navigationOptions = screenProps => ({
  title: screenProps.navigation.getParam('name')
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#96d1ff',
    paddingTop: 0,
  },
  loader : {
    alignSelf: 'center'
  },
  postItem: {
    alignItems: 'center',
    marginTop: 0,
		marginBottom: 14,
		paddingEnd: 10,
		borderColor: 'green',
		borderBottomWidth: 1,
  },
  postImage: {
    marginTop: 4,
	},
  titleContainer: {
    alignItems: 'flex-start',
    marginHorizontal: 10,
  },
  titleText: {
		fontSize: 22,
		fontStyle: 'italic',
		fontWeight: 'bold',
    color: 'navy',
    lineHeight: 24,
    textAlign: 'center',
	},
	missionStatementContainer: {
		alignSelf: 'stretch',
    alignItems: 'flex-start',
		marginHorizontal: 40,
		paddingTop: 30,
	},
	missionStatementText: {
		alignSelf: 'stretch',
		fontSize: 17,
		fontStyle: 'italic',
		fontWeight: 'bold',
    color: 'maroon',
    lineHeight: 24,
    textAlign: 'left',
	},
});
