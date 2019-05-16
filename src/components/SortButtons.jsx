import React, { Component } from 'react';

class SortButtons extends Component {
	render() {
		return (
			<div className="sortButtons">
				<button
					onClick={() => {
						this.props.reSort({ ...this.props.query, sort_by: 'created_at' });
					}}
				>
					NEW
				</button>
				<button
					onClick={() => {
						this.props.reSort({ ...this.props.query, sort_by: 'votes' });
					}}
				>
					TOP
				</button>
				{this.props.context === 'articles' && (
					<button
						onClick={() => {
							this.props.reSort({ ...this.props.query, sort_by: 'comment_count' });
						}}
					>
						MOST COMMENTS
					</button>
				)}
			</div>
		);
	}
}

export default SortButtons;
