import React from 'react';
import Header from './components/Header';
import Article from './components/Article';
import Profile from './components/Profile';
import './css/index.css';
import { Router } from '@reach/router';
import ArticleList from './components/ArticleList';

class App extends React.Component {
	state = {
		username: 'tickle122',
	};
	render() {
		return (
			<div className="App">
				<Header path="/*" username={this.state.username} />
				<Router>
					<ArticleList path="/" />
					<Article path="/article/:id" />
				</Router>
			</div>
		);
	}
}

export default App;
