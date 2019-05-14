import React from 'react';
import { axiosGetAllArticles } from '../api/axios';
import ArticleList from './ArticleList';

class TopicPage extends React.Component {
	state = {
		articles: null,
		searchTerm: null,
		loggedInUser: null,
	};

	componentDidUpdate(prevProps, prevState) {
		if (this.props.loggedInUser !== this.state.loggedInUser) {
			this.setState({ loggedInUser: this.props.loggedInUser });
		}
	}

	componentDidMount() {
		axiosGetAllArticles({ topic: this.props.id, limit: 999 }).then(({ data: { articles } }) => {
			this.setState({ articles, loggedInUser: this.props.loggedInUser });
		});
	}
	render() {
		return (
			<div>
				<h2>Articles under the topic '{this.props.id}':</h2>
				<h2>article list component below:</h2>
				<ArticleList query={{ topic: this.props.id }} loggedInUser={this.state.loggedInUser} />
			</div>
		);
	}
}

export default TopicPage;
