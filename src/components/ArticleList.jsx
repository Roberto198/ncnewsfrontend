import React from 'react';
import { Link } from '@reach/router';
import { axiosArticlesRequest, axiosGetAllArticles } from '../api/axios';

class ArticleList extends React.Component {
	state = {
		articles: [],
		searchTerm: '',
	};

	componentDidUpdate(prevProps, prevState) {
		if (this.props.searchTerm !== prevState.searchTerm) {
			if (!this.props.searchTerm) {
				axiosGetAllArticles({ params: this.props.query }).then(({ data: { articles } }) => {
					this.setState({ articles, searchTerm: this.props.searchTerm });
				});
			}
			if (this.props !== prevProps) {
				console.log(this.props, '<-props from update');
				this.setState({ loggedInUser: this.props.loggedInUser });
			}
			//  else {
			// 	axiosArticlesRequest({ params: this.props.query }, this.props.searchTerm).then(
			// 		({ data: { articles } }) => {
			// 			this.setState({ articles, searchTerm: this.props.searchTerm });
			// 		}
			// 	);
			// }
		}
	}

	componentDidMount() {
		axiosGetAllArticles({ params: this.props.query }).then(({ data: { articles } }) => {
			this.setState({ articles, searchTerm: this.props.searchTerm, loggedInUser: this.props.loggedInUser });
		});
	}

	render() {
		let { articles } = this.state;
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
				{this.props.searchTerm !== '' ? <h3>Search :'{this.props.searchTerm}'</h3> : null}
				{articles.length > 1 ? (
					articles.map(article => {
						return (
							// <ArticleTagLine />
							<div className="listedArticle" key={article.article_id}>
								{this.state.loggedInUser && <h2>loggedIn!</h2>}
								<Link to={`/article/${article.article_id}`}>
									<h3>{article.title}</h3>
								</Link>

								<p>
									<Link to={`/users/${article.author}`}>{article.author}</Link> -{article.created_at}{' '}
									- <Link to={`/topics/${article.topic}`}>{article.topic}</Link>
								</p>
							</div>
						);
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
