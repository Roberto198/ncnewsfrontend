import Axios from 'axios';

let url = 'https://northcodersapinews.herokuapp.com/api';

export const axiosGetAllArticles = (query = {}) => {
	return Axios.get(`${url}/articles`, query);
};
export const axiosArticlesRequest = (query = {}, searchTerm) => {
	return Axios.get(`${url}/search/${searchTerm}`, query);
};
export const axiosGetUser = user => {
	return Axios.get(`${url}/users/${user}`);
};
export const getAllTopics = () => {
	return Axios.get(`${url}/topics`);
};

// const axiosSearchArticles =

// default.exports = { axiosArticlesRequest, axiosGetAllArticles };
