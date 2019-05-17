import React from 'react';
import { Link } from '@reach/router';
import { axiosArticlesRequest, axiosGetAllArticles } from '../api/axios';
import Article from './Article';
import ArticleCard from './ArticleCard';
import SortButtons from './SortButtons';

class ArticleList extends React.Component {
	state = {
		articles: null,
		searchTerm: '',
		p: 1,
		pages: null,
		limit: 10,
		loading: true,
	};

	fetch() {
		axiosArticlesRequest(
			{ params: { ...this.props.query, p: this.state.p, limit: this.state.limit } },
			this.props.searchTerm
		).then(({ data: { articles, article_count } }) => {
			this.setState({
				articles,
				searchTerm: this.props.searchTerm,
				article_count,
				pages: Math.ceil(article_count / this.state.limit),
				loading: false,
			});
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.loggedInUser !== this.props.loggedInUser) {
			this.setState({ loggedInUser: this.props.loggedInUser, loading: true });
		}
		if (prevState.p !== this.state.p) {
			this.fetch();
		}
		if (this.props.searchTerm !== this.state.searchTerm) {
			this.fetch();
		}
	}

	componentDidMount() {
		axiosArticlesRequest(
			{ params: { ...this.props.query, p: this.state.p, limit: this.state.limit } },
			this.props.searchTerm
		).then(({ data: { articles, article_count } }) => {
			console.log(articles);
			this.setState({
				articles,
				article_count,
				searchTerm: this.props.searchTerm,
				loggedInUser: this.props.loggedInUser,
				pages: Math.ceil(article_count / this.state.limit),
				loading: false,
			});
		});
	}

	render() {
		let { articles, loggedInUser, article_count, p, pages } = this.state;
		return (
			<div className="articlesListWrapper">
				<SortButtons reSort={this.getSortedArticles} query={this.props.query} context="articles" />
				{this.props.searchTerm && this.props.searchTerm.length > 1 ? (
					<h3>Search :'{this.props.searchTerm}'</h3>
				) : null}
				{article_count ? (
					<div className="listDetails">
						<span>
							Articles found: {article_count} Page: {p} of {pages} :
						</span>
						<button
							onClick={() => {
								this.pageNav(-1);
							}}
						>
							Prev
						</button>
						<button
							onClick={() => {
								this.pageNav(1);
							}}
						>
							Next
						</button>
					</div>
				) : null}
				<div className="listContainer">
					{articles ? (
						articles.length > 0 ? (
							articles.map(article => {
								return (
									<ArticleCard
										article={article}
										loggedInUser={loggedInUser}
										key={article.article_id}
									/>
								);
							})
						) : (
							<h3>No articles found!</h3>
						)
					) : (
						<h3>Loading...</h3>
					)}
				</div>
			</div>
		);
	}

	getSortedArticles = param => {
		if (!this.state.searchTerm) {
			axiosGetAllArticles({ params: param }).then(({ data: { articles } }) => {
				this.setState({ articles, p: 1 });
			});
		} else {
			axiosArticlesRequest({ params: param }, `/${this.state.searchTerm}`).then(({ data: { articles } }) => {
				this.setState({ articles, p: 1 });
			});
		}
	};
	pageNav = int => {
		let { p, pages } = this.state;
		if (p + int <= pages && p + int > 0) {
			this.setState({ p: p + int });
		}
	};
}

export default ArticleList;
