import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Manifesto = "to bring people to Jesus\nand membership in his family.\n\n" +
"develop them Christlike maturity\nand equip them for their ministry in the church\n\n" +
"and life mission in the world,\nin order to manify God's name.";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={require('../assets/images/church.png')}
            style={styles.welcomeImage}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Chinese Abundant Life Church</Text>
        </View>
        <View style={styles.manifestoContainer}>
					<Text style={styles.manifestoText}>{Manifesto}</Text>
				</View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#96d1ff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
		alignSelf: 'stretch',
		resizeMode: 'stretch',
		height: 240,
    marginTop: 0,
    marginLeft: 0,
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
	manifestoContainer: {
		alignSelf: 'stretch',
    alignItems: 'flex-start',
		marginHorizontal: 40,
		paddingTop: 30,
	},
	manifestoText: {
		alignSelf: 'stretch',
		fontSize: 17,
		fontStyle: 'italic',
		fontWeight: 'bold',
    color: 'maroon',
    lineHeight: 24,
    textAlign: 'left',
	},
});
