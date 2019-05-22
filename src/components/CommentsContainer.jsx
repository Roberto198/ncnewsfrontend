import React from 'react';
import AddComment from './AddComment';
import SortButtons from './SortButtons';
import CommentCard from './CommentCard';
import { axiosGetArticleComments, axiosRemove } from '../api/axios';
import { withStyles, Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const style = {
	root: {
		width: '100%',
		maxWidth: 1000,
		textAlign: 'center',
	},
	pageInfo: {
		display: 'inline-block',
		margin: '1vh',
	},
};

class CommentsContainer extends React.Component {
	state = {
		comments: null,
		comment_count: null,
		vote: 0,
		p: 1,
		limit: 10,
		pages: null,
	};

	fetchComments = params => {
		return axiosGetArticleComments(this.props.article, params);
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevState.p !== this.state.p) {
			this.fetchComments({ params: { p: this.state.p, limit: this.state.limit } }).then(
				({ data: { comments } }) => {
					this.setState({ comments });
				}
			);
		}
	}
	componentDidMount() {
		this.fetchComments({ params: { p: this.state.p, limit: this.state.limit } }).then(
			({ data: { comments, comment_count } }) => {
				this.setState({ comments, comment_count, pages: Math.ceil(comment_count / this.state.limit) });
			}
		);
	}
	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				{this.props.article && this.props.loggedInUser && (
					<div className={classes.addComment}>
						<AddComment
							id={this.props.article}
							pushComment={this.pushComment}
							loggedInUser={this.props.loggedInUser}
						/>
					</div>
				)}
				{this.state.comment_count ? (
					<Typography variant="button" className={classes.pageInfo}>
						Comments found: {this.state.comment_count}
					</Typography>
				) : null}
				<Typography variant="button" className={classes.pageInfo}>
					Page: {this.state.p} of {this.state.pages} :{'  '}
				</Typography>
				<Button
					onClick={() => {
						this.pageNav(-1);
					}}
				>
					Prev
				</Button>
				<Button
					onClick={() => {
						this.pageNav(1);
					}}
				>
					Next
				</Button>
				<SortButtons reSort={this.getNewComments} context="comments" query={{}} />
				{this.state.comments &&
					this.state.comments.map(comment => (
						<CommentCard comment={comment} loggedInUser={this.props.loggedInUser} remove={this.remove} />
					))}
			</div>
		);
	}

	pushComment = newCommentObj => {
		this.setState(prevState => {
			return { comments: [newCommentObj, ...prevState.comments] };
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
		this.fetchComments({ params: query }).then(({ data: { comments } }) => {
			this.setState({ comments });
		});
	};

	pageNav = int => {
		let { p, pages } = this.state;
		if (p + int <= pages && p + int > 0) {
			this.setState({ p: p + int });
		}
	};
}

CommentsContainer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(style)(CommentsContainer);
