import React, { useState, useEffect } from 'react';
import { View, Image, SafeAreaView, FlatList, Alert, TouchableOpacity } from 'react-native';
import { ListItem } from "react-native-elements";
import { CirclesLoader } from "react-native-indicator";
import { useNavigation } from "react-navigation-hooks";

import { Login, Registration } from '../components';
import serviceBroker from '../services/serviceBroker';

export default function CellGroupsScreen(props)
{
	useEffect(() => serviceBroker.loginDefault(), []);

	const [showContext, setShowContext] = useState(false);
	const [showLogin, setShowLogin] = useState(true);
	const [loading, setLoading] = useState(false);
	const [dataSource, setDataSource] = useState([]);
	const { navigate } = useNavigation();

  const whenLoggedIn = async () => {
		setShowContext(true);
		await fetchData();
	};

  const authSwitch = () => setShowLogin(!showLogin);

	const authenticationForm = () => (
		showLogin? (<Login OnLoggedIn={whenLoggedIn} authSwitch={authSwitch} />)
		: (<Registration OnLoggedIn={whenLoggedIn} authSwitch={authSwitch}/>)
	);

	const groupListView = () => (
		loading ? (<CirclesLoader size={80} dotRadius={16} color="yellow"/>)
		: (<SafeAreaView style={styles.container}>
				<FlatList data={dataSource} renderItem={renderItem} keyExtractor={item => item.id} />
			</SafeAreaView>)
	);

	const fetchData = async () => {
		setLoading(true);
		serviceBroker.getMyGroups()
			.then(response => {
				setDataSource(response.data);
				setLoading(false);
			})
			.catch(err =>{
				console.log(err);
			});
	};

	const renderItem = data => (
		<ListItem
			onPress={() => {
				data.item.token = this.facebookToken;
				navigate("AlbumsScreen", data.item);
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

	const signupAgain = async () =>
	{
		if (!showContext) {
			return;
		}
		Alert.alert(
			'For demo only',
			'Are you sure to switch user ?',
			[
				{ text: 'I am sure', onPress: () => setShowContext(false) },
				{	text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
			],
			{ cancelable: true },
		);
	}

  return(
    <View style={styles.container}>
			{ !showContext && authenticationForm() }
			<TouchableOpacity onPress={signupAgain}>
				<Image style={styles.welcomeImage} source={require("../assets/images/groups.png")} />
			</TouchableOpacity>
			{ showContext && groupListView() }
    </View>
  );
}

CellGroupsScreen.navigationOptions = {
	title: "My Groups"
};

const styles = {
	container: {
		flex: 1,
		backgroundColor: "#96d1ff",
    justifyContent: 'space-between',
		padding: 5
	},
	loader: {
		alignSelf: "center"
	},
	welcomeContainer: {
		alignItems: "center",
		marginTop: 0,
		marginBottom: 0
	},
	welcomeImage: {
		width: 380,
		height: 240
	}
};