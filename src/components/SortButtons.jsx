import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button } from '@material-ui/core';

const styles = theme => ({
	root: {
		width: '100%',
		display: 'flex',
		margin: 'auto',
		justifyContent: 'center',
	},
	toolbar: theme.mixins.toolbar,
	fab: {
		margin: theme.spacing.unit,
	},
	extendedIcon: {
		marginRight: theme.spacing.unit,
	},
	Grid: {
		display: 'block',
	},
});

function SortButtons(props) {
	const { classes, reSort } = props;

	return (
		<Fragment className={classes.root}>
			<Button
				size="small"
				color="primary"
				variant="extended"
				aria-label="Add"
				className={classes.fab}
				onClick={() => {
					reSort({ ...props.query, sort_by: 'created_at' });
				}}
			>
				New!
			</Button>
			<Button
				size="small"
				color="primary"
				variant="extended"
				aria-label="Add"
				className={classes.fab}
				onClick={() => {
					reSort({ ...props.query, sort_by: 'comment_count' });
				}}
			>
				Most Comments!
			</Button>
			<Button
				size="small"
				color="primary"
				variant="extended"
				aria-label="Add"
				className={classes.fab}
				onClick={() => {
					reSort({ ...props.query, sort_by: 'votes' });
				}}
			>
				Most Likes!
			</Button>
		</Fragment>
	);
}

SortButtons.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SortButtons);
