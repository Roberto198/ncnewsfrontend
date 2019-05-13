import React from 'react';
import Axios from 'axios';
import CommentsById from './CommentsById';

class Article extends React.Component {
	state = {
		article: [],
	};

	componentDidMount() {
		let url = `https://northcodersapinews.herokuapp.com/api/articles/${this.props.id}`;
		Axios.get(url).then(({ data: { article } }) => {
			this.setState({ article: article });
		});
	}

	render() {
		const { title, body, vote, topic, author } = this.state.article;
		return (
			<div>
				<div className="article">
					<p className="title">{title}</p>
					<span className="detail">
						<span>By: {author}</span>
						<span>Topic: {topic}</span>
					</span>
					<span className="body">{body}</span>
					<nav className="nav">
						<span>{vote}</span>
					</nav>
				</div>
				<CommentsById article={this.props.id} />
			</div>
		);
	}
}

export default Article;
