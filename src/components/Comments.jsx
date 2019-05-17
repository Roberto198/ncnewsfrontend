import React from 'react';
import Axios from 'axios';
import { axiosGetArticleComments, axiosIncVotes, axiosRemove } from '../api/axios';
import VoteButtons from './VoteButtons';
import AddComment from './AddComment';
import SortButtons from './SortButtons';

class Comments extends React.Component {
	state = {
		comments: null,
		comment_count: null,
		vote: 0,
		p: 1,
		limit: 10,
		pages: null,
	};

	fetch() {}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.p !== this.state.p) {
			axiosGetArticleComments(this.props.article, { params: { p: this.state.p, limit: this.state.limit } }).then(
				({ data: { comments } }) => {
					this.setState({ comments });
				}
			);
		}
	}
	componentDidMount() {
		axiosGetArticleComments(this.props.article, { params: { p: this.state.p, limit: this.state.limit } }).then(
			({ data: { comments, comment_count } }) => {
				this.setState({ comments, comment_count, pages: Math.ceil(comment_count / this.state.limit) });
			}
		);
	}
	render() {
		return (
			<div className="commentDiv">
				{this.props.article && this.props.loggedInUser && (
					<div className="addCommentParentDiv">
						<AddComment
							id={this.props.article}
							pushComment={this.pushComment}
							loggedInUser={this.props.loggedInUser}
						/>
					</div>
				)}
				{this.state.comment_count ? <h3>Comments found: {this.state.comment_count}</h3> : null}
				Page: {this.state.p} of {this.state.pages} :{'  '}
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
				<SortButtons reSort={this.getNewComments} context="comments" query={{}} />
				{this.state.comments &&
					this.state.comments.map(comment => {
						let date = comment.created_at;
						return (
							<div className="commentBody" key={comment.comment_id}>
								<p>{comment.body}</p>
								{this.props.loggedInUser && (
									<VoteButtons
										loggedInUser={this.props.loggedInUser}
										voteFunc={this.vote}
										remove={this.remove}
										voteValue={this.state.vote}
										author={comment.author}
										path={this.props.path}
										id={comment.comment_id}
										media="comments"
									/>
								)}
								<span className="commentDetail">
									{date} -- {comment.author} -- {comment.votes}
								</span>
							</div>
						);
					})}
			</div>
		);
	}

	pushComment = newCommentObj => {
		console.log(newCommentObj, 'newCommentObj');
		this.setState(prevState => {
			let newComments = [newCommentObj, ...prevState.comments];
			console.log(newComments);
			return { comments: newComments };
		});
	};
	vote = (direction, id) => {
		axiosIncVotes(direction, 'comments', id);
		this.setState(prevState => {
			return { vote: prevState.vote + direction };
		});
	};
	remove = (media, id) => {
		axiosRemove(media, id);
		this.setState({
			comments: this.state.comments.filter(comment => {
				return comment.comment_id !== id;
			}),
		});
	};
	getNewComments = query => {
		console.log(query);
		let id = this.props.article;
		axiosGetArticleComments(id, { params: query }).then(({ data: { comments } }) => {
			this.setState({ comments });
		});
	};
	pageNav = int => {
		let { p, pages } = this.state;
		// console.log(int, '<-int');
		// console.log(this.state, '<-state');
		if (p + int <= pages && p + int > 0) {
			this.setState({ p: p + int }, () => {
				console.log(this.state);
			});
		}
	};
}

export default Comments;
