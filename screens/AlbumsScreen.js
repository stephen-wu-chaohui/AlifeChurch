import React, { useState, useEffect } from 'react';
import {
  Image,
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Linking,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { CirclesLoader } from 'react-native-indicator';
import { useNavigation } from "react-navigation-hooks";

export default function AlbumsScreen(screenProps) {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const coversource = screenProps.navigation.getParam("image");
  const albums = screenProps.navigation.getParam("albums");
	const { navigate } = useNavigation();

  const renderItem = data => (
    <ListItem
      onPress={() => {
				navigate("PostsScreen", data.item);
      }}
      key={data.item.id}
			leftAvatar={{
				source: { uri: data.item.image },
				rounded: false
			}}
			title={data.item.name}
      bottomDivider
      chevron
    />
  );

  useEffect(() => {
		setDataSource(albums);
		setLoading(false)
	}, []);


  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            style={styles.welcomeImage}
            source={{uri: coversource}}
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

AlbumsScreen.navigationOptions = screenProps => ({
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
