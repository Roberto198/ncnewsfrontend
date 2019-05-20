import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import { withStyles, Fab, Link as LinkUI } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
	card: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	delete: {
		display: 'inline',
	},
};

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
			<Card className="articleCard">
				<CardContent>
					<Typography variant="h5" component="h2">
						<Link to={`/article/${article.article_id}`}>
							<LinkUI>{article.title}</LinkUI>
						</Link>
					</Typography>
					<Typography className="body" color="textSecondary">
						Author:{' '}
						<Link to={`/users/${article.author}`}>
							<LinkUI>{article.author}</LinkUI>
						</Link>
					</Typography>
					<Typography className="body" color="textSecondary">
						Posted: {this.createDate(article.created_at)}
					</Typography>
					<Typography className="body" color="textSecondary">
						Topic:{' '}
						<Link to={`/topics/${article.topic}`}>
							<LinkUI>{article.topic}</LinkUI>
						</Link>
					</Typography>
					<Typography className="body" color="textSecondary">
						Votes: {article.votes}
					</Typography>
				</CardContent>
				<CardActions>
					{this.props.loggedInUser === this.props.article.author ? (
						<Fragment>
							<Typography variant="body" className="delete">
								Delete your article?{'  '}
							</Typography>
							<Fab size="small" onClick={this.remove}>
								<span role="img" aria-label="Remove!">
									❌
								</span>
							</Fab>
						</Fragment>
					) : null}
				</CardActions>
			</Card>

			// <div className="listedArticle" key={article.article_id}>
			// 	<Link to={`/article/${article.article_id}`}>
			// 		<span className="listedArticleTitle"></span>
			// 	</Link>
			// 	<hr />
			// 	<div className="articleCardDetail">
			// 		<div className="votes">
			// 			Votes: {article.votes + this.state.vote} {'  '}
			// 			{this.props.loggedInUser === this.props.article.author ? (
			// 				<button onClick={this.remove}>
			// 					<span role="img" aria-label="Remove!">
			// 						❌
			// 					</span>
			// 				</button>
			// 			) : null}
			// 		</div>

			// 		<div className="links">
			// 			<div className="author">
			// 				Author: <Link to={`/users/${article.author}`}>{article.author}</Link>
			// 			</div>
			// 			<div className="date">Published : {this.createDate(article.created_at)}</div>
			// 			<div className="topic">
			// 				Topic: <Link to={`/topics/${article.topic}`}>{article.topic}</Link>
			// 			</div>
			// 		</div>
			// 	</div>
			// </div>
		);
	}
	createDate(stamp) {
		return new Date(stamp).toDateString();
	}
}

export default ArticleCard;
