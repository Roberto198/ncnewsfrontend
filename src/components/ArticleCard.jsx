import React from 'react';
import { Link } from '@reach/router';

class ArticleCard extends React.Component {
	state = {};

	componentDidUpdate() {
		if (
			this.props.article !== this.state.article ||
			this.props.loggedInUser !== this.state.loggedInUser ||
			this.props.id !== this.state.id
		) {
			this.setState({ article: this.props.article, loggedInUser: this.props.loggedInUser });
		}
	}

	componentDidMount() {
		let { article, loggedInUser } = this.props;
		this.setState({ article, loggedInUser });
	}

	render() {
		let { article } = this.props;
		return (
			<div className="listedArticle" key={article.article_id}>
				{this.state.loggedInUser && (
					<div>
						Votes: {article.votes} {'  '}
						<button onClick={this.voteUp}>👍</button>
						<button onClick={this.voteUp}>👎</button>
						<button onClick={this.voteUp}>❌</button>
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

	voteUp = () => {};
}

export default ArticleCard;
