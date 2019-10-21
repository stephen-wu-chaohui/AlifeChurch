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

export default function FacebookAlbumsScreen(screenProps) {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const source = screenProps.navigation.getParam("coversource");

  const fetchData = async () => {
    const token = 'EAANMfBlL3l4BAJZApetRfdcsAePxvLJfSjZAQabVPcPIWt21S5qtpAGuRvRdZBDRjZCJbqOqwPTq3ZC4atvgRC85Q2vSRwjhZAD0MV4uS9WHWnykZB2oAIaDfdzQNXi5mUtrrCa9bZAxmZCFQEieCgqtUZB4FOKK6QwIsmW1beVHg2SndqJ7buZBdJ4ZBtNjpXit5yxZAZCK0iYqkmKAbZChq0OqbSf'

    setLoading(true);
    const groupId = screenProps.navigation.getParam("id");
    fetch(`https://graph.facebook.com/v4.0/${groupId}/albums?access_token=${token}&fields=name,id`)
      .then(response => response.json())
      .then(responseJson => {
         const items = responseJson.data
         .map(album => {
           album.isSelect = false;
           album.selectedClass = styles.list;
           album.picture = album.photos && album.photos.length > 0 ? album.photos[0].picture : null;
           return album;
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
        Linking.openURL(`https://www.facebook.com/media/set/?set=a.${data.item.id}`);
      }}
      key={data.item.id}
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
            style={styles.welcomeImage}
            source={{uri: source}}
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

FacebookAlbumsScreen.navigationOptions = {
  title: 'Albums',
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
