import React from 'react';
import { axiosPostComment } from '../api/axios';

class VoteButtons extends React.Component {
	state = {
		addComment: false,
		commentField: '',
	};
	render() {
		return (
			<div>
				<div>
					<button
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
					</button>
					<button
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
					</button>
				</div>

				{this.props.loggedInUser && this.props.loggedInUser.username === this.props.author ? (
					<button
						onClick={() => {
							this.props.remove(this.props.media, this.props.id);
						}}
					>
						<span role="img" aria-label="Remove!">
							❌
						</span>
					</button>
				) : null}
				{}
			</div>
		);
	}
}

export default VoteButtons;
