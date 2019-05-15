import React from 'react';

class VoteButtons extends React.Component {
	render() {
		return (
			<div>
				{this.props.loggedInUser ? (
					<div>
						<button
							disabled={this.props.voteValue > 0}
							onClick={() => {
								this.props.voteFunc(1);
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
								this.props.voteFunc(-1);
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
				) : null}

				{this.props.loggedInUser && this.props.loggedInUser.username === this.props.author ? (
					<button onClick={this.remove}>
						<span role="img" aria-label="Remove!">
							❌
						</span>
					</button>
				) : null}
			</div>
		);
	}
}

export default VoteButtons;
