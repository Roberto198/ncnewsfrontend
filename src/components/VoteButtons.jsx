import React from 'react';
import { Button } from '@material-ui/core';

class VoteButtons extends React.Component {
	state = {
		addComment: false,
		commentField: '',
	};
	render() {
		return (
			<div>
				<div>
					<Button
						size="large"
						disabled={this.props.voteValue > 0}
						onClick={() => {
							this.props.voteFunc(1, this.props.id);
						}}
					>
						{this.props.voteValue < 1 ? (
							<span role="img" aria-label="UpVote!">
								👍
							</span>
						) : (
							<span role="img" aria-label="Voted!">
								✔
							</span>
						)}
					</Button>
					<Button
						size="large"
						disabled={this.props.voteValue < 0}
						onClick={() => {
							this.props.voteFunc(-1, this.props.id);
						}}
					>
						{this.props.voteValue > -1 ? (
							<span role="img" aria-label="UpVote!">
								👎
							</span>
						) : (
							<span role="img" aria-label="Voted!">
								✔
							</span>
						)}
					</Button>
					{this.props.loggedInUser && this.props.loggedInUser === this.props.author && (
						<Button
							size="large"
							onClick={() => {
								this.props.remove(this.props.media, this.props.id);
							}}
						>
							<span role="img" aria-label="Remove!">
								❌
							</span>
						</Button>
					)}
				</div>
			</div>
		);
	}
}

export default VoteButtons;
