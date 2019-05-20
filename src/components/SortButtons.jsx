import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Fab } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	root: {
		flexGrow: 1,
		display: 'flex',
	},
	toolbar: theme.mixins.toolbar,
	fab: {
		margin: theme.spacing.unit,
	},
	extendedIcon: {
		marginRight: theme.spacing.unit,
	},
});

function SortButtons(props) {
	const { classes } = props;

	return (
		<div>
			<div className="classes.toolbar" />
			<div className={classes.root}>
				{/* <AppBar position="static" color="default"> */}
				<Toolbar>
					<Fab
						size="small"
						color="primary"
						variant="extended"
						aria-label="Add"
						className={classes.fab}
						onClick={() => {
							props.reSort({ ...props.query, sort_by: 'created_at' });
						}}
					>
						New!
					</Fab>
					<Fab
						size="small"
						color="primary"
						variant="extended"
						aria-label="Add"
						className={classes.fab}
						onClick={() => {
							props.reSort({ ...props.query, sort_by: 'comment_count' });
						}}
					>
						Most Comments!
					</Fab>
					<Fab
						size="small"
						color="primary"
						variant="extended"
						aria-label="Add"
						className={classes.fab}
						onClick={() => {
							props.reSort({ ...props.query, sort_by: 'votes' });
						}}
					>
						Most Likes!
					</Fab>
					{/* <Fab color="primary" variant="extended" aria-label="Add" className={classes.fab}>
							Prev!
						</Fab>
						<Fab color="primary" variant="extended" aria-label="Add" className={classes.fab}>
							Next!
						</Fab> */}
				</Toolbar>
				{/* </AppBar> */}
			</div>
		</div>
	);
}

SortButtons.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SortButtons);
