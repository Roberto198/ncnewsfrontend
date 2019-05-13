import React from 'react';
import Axios from 'axios';

class CommentsById extends React.Component {
	state = {
		comments: [],
		comment_count: 0,
	};
	componentDidMount() {
		let url = `https://northcodersapinews.herokuapp.com/api/articles/${this.props.article}/comments`;
		Axios.get(url).then(({ data: { comments, comment_count } }) => {
			this.setState({ comments, comment_count });
		});
	}
	render() {
		return (
			<div className="commentDiv">
				<div className="commentsHeader">Comments : </div>

				{this.state.comments.map(x => {
					let date = Date(x.created_at).split('G')[0];
					return (
						<div className="commentBody" key={x.comment_id}>
							<p>{x.body}</p>
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

export default CommentsById;
