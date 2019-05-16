import React from 'react';
import Header from './components/Header';
import Article from './components/Article';
import Profile from './components/Profile';
import ArticleList from './components/ArticleList';
import Topics from './components/Topics';
import TopicPage from './components/TopicPage.jsx';
import './css/index.css';
import { Router, navigate } from '@reach/router';
import { axiosGetUser } from './api/axios';

class App extends React.Component {
	state = {
		loggedInUser: null,
		searchTerm: '',
	};

	componentDidMount() {
		const loggedInUser = localStorage.getItem('user');
		this.setState({ loggedInUser });
	}

	render() {
		let { loggedInUser, searchTerm } = this.state;

		return (
			<div className="App">
				<Router>
					<Header
						path="/*"
						loggedInUser={loggedInUser}
						logOut={this.logOut}
						basicSearch={this.basicSearch}
						setUsername={this.setUsername}
					/>
				</Router>
				<Router className="mediaArea">
					<Profile path="/users/:id" loggedInUser={loggedInUser} />
					<Topics path="/topics" loggedInUser={loggedInUser} />
					<TopicPage path="/topics/:id" loggedInUser={loggedInUser} />
					<ArticleList
						path="/*"
						searchTerm={searchTerm}
						basicSearch={this.basicSearch}
						loggedInUser={loggedInUser}
					/>
					<Article path="/article/:id" loggedInUser={loggedInUser} />
				</Router>
			</div>
		);
	}

	basicSearch = (searchTerm, paramObj = {}) => {
		this.setState({ searchTerm: searchTerm }, () => {
			navigate('/');
		});
	};

	setUsername = username => {
		axiosGetUser(username).then(({ data: user }) =>
			this.setState({ loggedInUser: user[0] }, () => {
				console.log(user);
				localStorage.setItem('user', user[0].username);
			})
		);
	};

	logOut = () => {
		this.setState({ searchTerm: '', loggedInUser: null });
	};
}

export default App;
