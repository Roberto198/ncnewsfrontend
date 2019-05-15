import React from 'react';
import { axiosArticlesRequest, axiosGetAllArticles } from '../api/axios';

class ArticleList extends React.Component {
	state = {
		loggedInUser: null,
		articles: [],
		searchTerm: null,
	};

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			this.setState({});
		}
	}

	componentDidMount() {
		if (this.props.query) {
			axiosGetAllArticles({ params: this.props.query }).then(({ data: { articles } }) => {
				console.log(articles, 'from has query');
				this.setState({ articles, searchTerm: null });
			});
		} else if (this.props.searchTerm && this.props.searchTerm !== this.state.searchTerm) {
			console.log(this.props.searchTerm);
			axiosArticlesRequest(this.props.searchTerm).then(res => {
				console.log(res, 'from has searchTerm');

				// this.setState({ articles, searchTerm: this.props.searchTerm });
			});
		} else {
			axiosGetAllArticles().then(({ data: { articles } }) => {
				console.log(articles, 'from else statement');

				this.setState({ articles });
			});
		}
	}

	render() {
		return (
			<div>
				<ul>
					{this.state.articles.length > 0
						? this.state.articles.map(x => {
								return <li key={x.article_id}>{x.title}</li>;
						  })
						: null}
				</ul>
			</div>
		);
	}
}

export default ArticleList;
