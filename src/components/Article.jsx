import React from 'react';
import Axios from 'axios';
import Comments from './Comments';
import { axiosGetAllArticles } from '../api/axios';
import { axiosIncVotes } from '../api/axios';
import { Link } from '@reach/router';
import VoteButtons from './VoteButtons';

class Article extends React.Component {
	state = {
		article: [],
		vote: 0,
		loggedInUser: null,
	};

	componentDidMount() {
		// axiosGetAllArticles({article_id : })
		let url = `https://northcodersapinews.herokuapp.com/api/articles/${this.props.id}`;
		Axios.get(url).then(({ data: { article } }) => {
			this.setState({ article: article, loggedInUser: this.props.loggedInUser });
		});
	}

	componentDidUpdate(prevProps) {
		if (this.props.loggedInUser !== prevProps.loggedInUser)
			this.setState({ loggedInUser: this.props.loggedInUser });
	}

	render() {
		const { title, body, votes, topic, author } = this.state.article;
		return (
			<div>
				<div className="article">
					<p className="title">{title}</p>
					<span className="detail">
						By: <Link to={`/users/${author}`}>{author}</Link>
						{'     '}
						Topic: <Link to={`/topics/${topic}`}>{topic}</Link>
						{'  '}
						Votes: {votes + this.state.vote}
					</span>

					<span className="body">{body}</span>

					<VoteButtons
						loggedInUser={this.props.loggedInUser}
						voteFunc={this.vote}
						voteValue={this.state.vote}
						author={this.state.article.author}
						path={this.props.path}
					/>
				</div>
				<Comments article={this.props.id} />
			</div>
		);
	}

	vote = direction => {
		axiosIncVotes(direction, 'articles', this.state.article.article_id);
		this.setState(prevState => {
			return { vote: prevState.vote + direction };
		});
	};
}

export default Article;
