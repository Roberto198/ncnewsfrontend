import Axios from 'axios';

let url = 'https://northcodersapinews.herokuapp.com/api';

export const axiosGetAllArticles = (query = {}, articleID = '') => {
	return Axios.get(`${url}/articles/${articleID}`, query);
};
export const axiosArticlesRequest = (query = {}, searchTerm) => {
	console.log(query, '<-query	');
	return Axios.get(`${url}/search/${searchTerm}`, query);
};
export const axiosGetUser = user => {
	return Axios.get(`${url}/users/${user}`).then(user => {
		return user;
	});
};
export const getAllTopics = () => {
	return Axios.get(`${url}/topics`);
};

export const getUserComments = (query = {}) => {
	return Axios.get(`${url}/comments`, query);
};
export const axiosGetArticleComments = (id, query) => {
	return Axios.get(`${url}/articles/${id}/comments`, query);
};

export const axiosIncVotes = (value, mediaType, mediaID) => {
	return Axios.patch(`${url}/${mediaType}/${mediaID}`, { inc_votes: value });
};

export const axiosRemove = (media, id) => {
	return Axios.delete(`${url}/${media}/${id}`);
};

export const axiosPostComment = (body, username, id) => {
	return Axios.post(`${url}/articles/${id}/comments`, { username, body });
};

// const axiosSearchArticles =

// default.exports = { axiosArticlesRequest, axiosGetAllArticles };
