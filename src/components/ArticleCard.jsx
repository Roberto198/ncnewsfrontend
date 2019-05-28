import React from 'react';
import { withStyles, Fab, Link } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
	card: {
		display: 'flex',
		minWidth: 350,
		maxWidth: 600,
		flexGrow: 1,
		flexBasis: 0,
		margin: '20px',
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	actions: {
		position: 'relative',
	},
	deleteArticle: {
		position: 'absolute',
		bottom: 0,
	},
};

class ArticleCard extends React.Component {
	state = {
		vote: 0,
	};

	render() {
		const { article, classes } = this.props;
		return (
			<Card className={classes.card}>
				<CardContent className={classes.content}>
					<Typography variant="h5" component="h2">
						<Link href={`/article/${article.article_id}`}>{article.title}</Link>
					</Typography>
					<Typography className="body" color="textSecondary">
						Author: <Link href={`/users/${article.author}`}>{article.author}</Link>
					</Typography>
					<Typography className="body" color="textSecondary">
						Posted: {this.createDate(article.created_at)}
					</Typography>
					<Typography className="body" color="textSecondary">
						Topic: <Link href={`/topics/${article.topic}`}>{article.topic}</Link>
					</Typography>
					<Typography className="body" color="textSecondary">
						Votes: {article.votes}
					</Typography>
				</CardContent>
				<CardActions className="actions">
					{this.props.loggedInUser === this.props.article.author ? (
						<div className="deleteArticle">
							<Typography variant="body1" className="delete">
								Delete your article?{'  '}
							</Typography>
							<Fab size="small" onClick={this.remove}>
								<span role="img" aria-label="Remove!">
									❌
								</span>
							</Fab>
						</div>
					) : null}
				</CardActions>
			</Card>
		);
	}

	createDate(stamp) {
		return new Date(stamp).toDateString();
	}
}

export default withStyles(styles)(ArticleCard);
