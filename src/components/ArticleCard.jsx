import React from 'react';
import { Link } from '@reach/router';

class ArticleCard extends React.Component {
	state = {
		vote: 0,
	};

	componentDidUpdate(prevProps) {
		if (this.props.loggedInUser !== prevProps.loggedInUser)
			this.setState({ loggedInUser: this.props.loggedInUser });
	}

	componentDidMount() {
		this.setState({ loggedInUser: this.props.loggedInUser });
	}

	render() {
		let { article } = this.props;
		return (
			<div className="listedArticle" key={article.article_id}>
				<Link to={`/article/${article.article_id}`}>
					<span className="listedArticleTitle">{article.title}</span>
				</Link>
				<hr />
				<div className="articleCardDetail">
					<div className="votes">
						Votes: {article.votes + this.state.vote} {'  '}
						{this.props.loggedInUser === this.props.article.author ? (
							<button onClick={this.remove}>
								<span role="img" aria-label="Remove!">
									❌
								</span>
							</button>
						) : null}
					</div>

					<div className="links">
						<div className="author">
							Author: <Link to={`/users/${article.author}`}>{article.author}</Link>
						</div>
						<div className="date">Published : {this.createDate(article.created_at)}</div>
						<div className="topic">
							Topic: <Link to={`/topics/${article.topic}`}>{article.topic}</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
	createDate(stamp) {
		return new Date(stamp).toDateString();
	}
}

export default ArticleCard;
