import React, { Component } from 'react';
import VoteButtons from './VoteButtons';
import { axiosIncVotes, axiosRemove } from '../api/axios';

class CommentCard extends Component {
	state = {
		vote: 0,
	};
	render() {
		let { comment } = this.props;
		let date = comment.created_at;
		return (
			<div className="commentBody" key={comment.comment_id}>
				<p>{comment.body}</p>
				{this.props.loggedInUser && (
					<VoteButtons
						loggedInUser={this.props.loggedInUser}
						voteFunc={this.vote}
						remove={this.props.remove}
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
	}

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
}

export default CommentCard;
