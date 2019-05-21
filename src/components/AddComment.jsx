import React, { Component } from 'react';
import { axiosPostComment } from '../api/axios';
import { Button, FormControl, TextField, InputLabel, withStyles, InputAdornment, IconButton } from '@material-ui/core';

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
						<FormControl className={classes.form}>
							<TextField
								fullWidth="true"
								label={this.props.loggedInUser}
								multiline
								rows="4"
								margin="normal"
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton>post</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</FormControl>
						{/* <form
							onSubmit={e => {
								e.preventDefault();
								this.addComment(this.state.commentField, this.props.loggedInUser, this.props.id);
							}}
						>
							{' '}
							{this.props.loggedInUser} :{'  '}
							<input type="text" className="addCommentForm" onChange={this.handleInput} />
							<button type="submit">Post!</button>
						</form> */}
					</div>
				)}
			</div>
		);
	}

	handleInput = e => {
		this.setState({ commentField: e.target.value });
	};

	addComment(body, username, id) {
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
	}
}

export default withStyles(styles)(AddComment);
