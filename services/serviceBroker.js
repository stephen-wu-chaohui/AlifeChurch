import { AsyncStorage } from 'react-native';
import axios from 'axios';

const backendUrl = 'https://stephen-api.azurewebsites.net/api/';

export default serviceBroker = {
	currentUser: any = { token: ''},

	authHeader(token) {
		return { headers: { Authorization: 'Bearer ' + (token || this.currentUser.token) }};
	},

	async loginDefault() {
		const jwt = await AsyncStorage.getItem('id_token');
		if (!jwt) {
			return '';
		}
		const response = await axios.get(backendUrl + 'disciples/me', this.authHeader(jwt));
		this.currentUser.email = response.data.email;
		this.currentUser.token = jwt;
		return response.data.email;
	},

	async loginUser(email, password) {
		const response = await axios.post(backendUrl + 'disciples/login', { email, password});
		await	AsyncStorage.setItem("id_token", response.data.token);
		this.currentUser = response.data;
	},

	async registerUser(userInfo) {
		const response = await axios.post(backendUrl + 'disciples/register', userInfo);
		await	AsyncStorage.setItem("id_token", response.data.token);
		this.currentUser = response.data;
	},

	async logout() {
		await AsyncStorage.setItem("id_token", '');
		this.currentUser.email = '';
		this.currentUser.token = '';
	},

	async getPublicGroups() {
		return await axios.get(backendUrl + 'groups/public');
	},

	async getMyGroups() {
		return await axios.get(backendUrl + 'groups', this.authHeader());
	}
}
