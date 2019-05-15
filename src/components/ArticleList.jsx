import React from 'react';
import { Link } from '@reach/router';
import { axiosArticlesRequest, axiosGetAllArticles } from '../api/axios';
import Article from './Article';
import ArticleCard from './ArticleCard';

class ArticleList extends React.Component {
	state = {
		articles: null,
		searchTerm: '',
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevState.loggedInUser !== this.props.loggedInUser) {
			this.setState({ loggedInUser: this.props.loggedInUser });
		}

		if (this.props.searchTerm !== prevState.searchTerm) {
			if (!this.props.searchTerm) {
				axiosGetAllArticles({ params: this.props.query }).then(({ data: { articles } }) => {
					this.setState({ articles, searchTerm: this.props.searchTerm });
				});
			}
			if (this.props.id !== this.state.displayedUser) {
				this.setState({ displayedUser: this.props.id });
			}
			if (this.props.searchTerm !== prevProps.searchTerm) {
				axiosArticlesRequest({ params: this.props.query }, this.props.searchTerm).then(
					({ data: { articles } }) => {
						this.setState({
							articles,
							searchTerm: this.props.searchTerm,
							loggedInUser: this.props.loggedInUser,
						});
					}
				);
			}
		}
	}

	componentDidMount() {
		axiosArticlesRequest(this.props.query, this.props.searchTerm).then(({ data: { articles } }) => {
			console.log(this.props.query, 'at did mount');

			this.setState({ articles, searchTerm: this.props.searchTerm, loggedInUser: this.props.loggedInUser });
		});
	}

	render() {
		let { articles, loggedInUser } = this.state;
		return (
			<div>
				<div className="sortButtons">
					<button
						onClick={() => {
							this.getSortedArticles({ ...this.props.query, sort_by: 'created_at' });
						}}
					>
						NEW
					</button>
					<button
						onClick={() => {
							this.getSortedArticles({ ...this.props.query, sort_by: 'votes' });
						}}
					>
						TOP
					</button>
					<button
						onClick={() => {
							this.getSortedArticles({ ...this.props.query, sort_by: 'comment_count' });
						}}
					>
						MOST COMMENTS
					</button>
				</div>
				{this.props.searchTerm && this.props.searchTerm.length > 1 ? (
					<h3>Search :'{this.props.searchTerm}'</h3>
				) : null}

				{articles ? (
					articles.map(article => {
						return <ArticleCard article={article} loggedInUser={loggedInUser} />;
					})
				) : (
					<h1>Loading...</h1>
				)}
			</div>
		);
	}

	getSortedArticles = param => {
		if (!this.state.searchTerm) {
			axiosGetAllArticles({ params: param }).then(({ data: { articles } }) => {
				this.setState({ articles });
			});
		} else {
			axiosArticlesRequest({ params: param }, `/${this.state.searchTerm}`).then(({ data: { articles } }) => {
				this.setState({ articles });
			});
		}
	};
}

export default ArticleList;
