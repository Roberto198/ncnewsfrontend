import React, { Component } from 'react';
import { axiosPostComment } from '../api/axios';

class AddComment extends Component {
	state = {
		addComment: false,
	};
	render() {
		return (
			<div>
				<button
					onClick={() => {
						this.setState({ addComment: !this.state.addComment });
					}}
				>
					Add Comment!
				</button>
				<br />
				{this.state.addComment && (
					<div>
						<form
							onSubmit={e => {
								e.preventDefault();
								this.addComment(this.state.commentField, this.props.loggedInUser, this.props.id);
							}}
						>
							<input type="text" onChange={this.handleInput} />
							<button type="submit">Post!</button>
						</form>
					</div>
				)}
			</div>
		);
	}

	handleInput = e => {
		this.setState({ commentField: e.target.value });
	};

	addComment(body, username, id) {
		axiosPostComment(body, username, id);
		this.setState({ addComment: false }, () => {
			this.props.pushComment({
				author: username,
				body,
				created_at: new Date().toUTCString(),
				comment_id: new Date().toUTCString(),
				votes: 0,
			});
		});
	}
}

export default AddComment;
