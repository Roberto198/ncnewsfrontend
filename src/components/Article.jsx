import React from 'react';
import Axios from 'axios';
import Comments from './Comments';
import { axiosGetAllArticles, axiosRemove, axiosGetArticleComments } from '../api/axios';
import { axiosIncVotes } from '../api/axios';
import { Link } from '@reach/router';
import VoteButtons from './VoteButtons';
import AddComment from './AddComment';

class Article extends React.Component {
	state = {
		article: undefined,
		vote: 0,
		loggedInUser: null,
		newComment: null,
		isLoading: true,
	};

	componentDidMount() {
		axiosGetAllArticles({}, this.props.id).then(({ data: { article } }) => {
			this.setState({ article, loggedInUser: this.props.loggedInUser, isLoading: false });
		});
	}

	componentDidUpdate(prevProps) {
		if (this.props.loggedInUser !== prevProps.loggedInUser)
			this.setState({ loggedInUser: this.props.loggedInUser });
	}

	render() {
		if (this.state.isLoading) {
			return <h3> Loading...</h3>;
		} else {
			const { title, body, votes, topic, author } = this.state.article;

			return (
				<div>
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

							{this.props.loggedInUser && (
								<div>
									<VoteButtons
										loggedInUser={this.props.loggedInUser}
										voteFunc={this.vote}
										remove={this.remove}
										voteValue={this.state.vote}
										author={this.state.article.author}
										path={this.props.path}
										id={this.props.id}
										media="articles"
									/>
								</div>
							)}
						</div>
						<Comments article={this.props.id} loggedInUser={this.props.loggedInUser} />
						{}
					</div>
				</div>
			);
		}
	}

	vote = (direction, id) => {
		axiosIncVotes(direction, 'articles', id);
		this.setState(prevState => {
			return { vote: prevState.vote + direction };
		});
	};

	remove = (media, id) => {
		axiosRemove(media, id).then(res => console.log(res));
	};
}

export default Article;
