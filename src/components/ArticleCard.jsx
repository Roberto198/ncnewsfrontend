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
				{this.props.loggedInUser && (
					<div>
						Votes: {article.votes + this.state.vote} {'  '}
						{this.props.loggedInUser.username === this.props.article.author ? (
							<button onClick={this.remove}>
								<span role="img" aria-label="Remove!">
									❌
								</span>
							</button>
						) : null}
					</div>
				)}
				<Link to={`/article/${article.article_id}`}>
					<h3>{article.title}</h3>
				</Link>

				<p>
					<Link to={`/users/${article.author}`}>{article.author}</Link> -{article.created_at} -{' '}
					<Link to={`/topics/${article.topic}`}>{article.topic}</Link>
				</p>
			</div>
		);
	}
}

export default ArticleCard;
