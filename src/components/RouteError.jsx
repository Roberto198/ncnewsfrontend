import React from 'react';
import { Link } from '@reach/router';

const RouteError = props => {
	return (
		<div className="err">
			<h3>Route not found : {props.location.pathname}</h3>
			<h3>
				<Link to="/">Home</Link>
			</h3>
		</div>
	);
};

export default RouteError;
