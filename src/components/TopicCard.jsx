import React from 'react';
import { Link } from '@reach/router';
import { Typography, withStyles, Paper } from '@material-ui/core';

const styles = {
	wrapper: {
		display: 'block',
		textAlign: 'center',
		margin: '3vh',
		paddingTop: '5vh',
		paddingBottom: '5vh',
	},
	h4: {
		marginTop: '5vh',
	},
};
const TopicCard = ({ topic, classes }) => {
	return (
		<Paper className={classes.wrapper} key={topic.slug}>
			<Link className={classes.topic} to={`/topics/${topic.slug}`}>
				<Typography variant="h4">{topic.slug}</Typography>
				<Typography variant="h6"> {topic.description}</Typography>
			</Link>
		</Paper>
	);
};

export default withStyles(styles)(TopicCard);
