import React, { Component } from 'react';
import { axiosPostComment } from '../api/axios';
import { Button, TextField, withStyles, InputAdornment } from '@material-ui/core';

const styles = {
	wrapper: {
		display: 'flex',
		justifyItems: 'center',
		flexDirection: 'column',
	},
	form: {
		display: 'block',
		width: '95%',
		margin: 'auto',
	},
};

class AddComment extends Component {
	state = {
		addComment: false,
		commentField: null,
	};
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.wrapper}>
				<Button
					onClick={() => {
						this.setState({ addComment: !this.state.addComment });
					}}
				>
					Add A Comment!
				</Button>
				<br />
				{this.state.addComment && (
					<div>
						<form
							className={classes.form}
							onSubmit={e => {
								this.addComment(this.state.commentField, this.props.loggedInUser, this.props.id);
							}}
						>
							<TextField
								onChange={this.handleInput}
								fullWidth={true}
								label={this.props.loggedInUser}
								multiline
								rows="4"
								margin="normal"
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Button
												type="sumbit"
												onClick={e => {
													this.addComment(
														this.state.commentField,
														this.props.loggedInUser,
														this.props.id
													);
												}}
											>
												post
											</Button>
										</InputAdornment>
									),
								}}
							/>
						</form>
					</div>
				)}
			</div>
		);
	}

	handleInput = e => {
		this.setState({ commentField: e.target.value });
	};

	addComment = (body, username, id) => {
		if (body) {
			axiosPostComment(body, username, id);
			this.setState({ addComment: false, commentField: null }, () => {
				this.props.pushComment({
					author: username,
					body,
					created_at: new Date().toUTCString(),
					comment_id: new Date().toUTCString(),
					votes: 0,
				});
			});
		} else {
			alert('Please enter a comment to post.');
		}
	};
}

export default withStyles(styles)(AddComment);
