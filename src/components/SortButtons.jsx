import React from 'react';
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
		<div className={classes.root}>
			<Button
				size="small"
				variant="text"
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
				variant="text"
				aria-label="Add"
				className={classes.fab}
				onClick={() => {
					reSort({ ...props.query, sort_by: 'votes' });
				}}
			>
				Most Likes!
			</Button>
			<div>
				{props.context !== 'comments' && (
					<Button
						size="small"
						variant="text"
						aria-label="Add"
						className={classes.fab}
						onClick={() => {
							reSort({ ...props.query, sort_by: 'comment_count' });
						}}
					>
						Most Comments!
					</Button>
				)}
			</div>
		</div>
	);
}

SortButtons.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SortButtons);
