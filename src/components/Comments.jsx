import React from 'react';
import Axios from 'axios';
import { axiosGetArticleComments } from '../api/axios';
import VoteButtons from './VoteButtons';

class Comments extends React.Component {
	state = {
		comments: null,
		comment_count: 0,
	};
	componentDidMount() {
		axiosGetArticleComments(this.props.article).then(({ data: { comments } }) => {
			this.setState({ comments });
		});
	}
	render() {
		return (
			<div className="commentDiv">
				<div className="commentsHeader">Comments : </div>

				{this.state.comments &&
					this.state.comments.map(x => {
						let date = Date(x.created_at).split('G')[0];
						return (
							<div className="commentBody" key={x.comment_id}>
								<p>{x.body}</p>
								<VoteButtons />
								<span className="commentDetail">
									{date} -- {x.author} -- {x.votes}
								</span>
							</div>
						);
					})}
			</div>
		);
	}
}

export default Comments;
