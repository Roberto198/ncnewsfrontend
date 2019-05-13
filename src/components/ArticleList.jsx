import React from 'react';
import axios from 'axios';
import { Link } from '@reach/router';

class FullSizeArticle extends React.Component {
	state = {
		articles: [],
	};

	componentDidMount() {
		let url = 'https://northcodersapinews.herokuapp.com/api/articles';
		axios.get(url).then(({ data: { articles } }) => {
			this.setState({ articles: articles });
		});
	}
	render() {
		let { articles } = this.state;
		return (
			<div>
				{articles
					? articles.map(article => {
							return (
								<div className="listedArticle" key={article.article_id}>
									<Link to={`/article/${article.article_id}`}>
										<h3>{article.title}</h3>
									</Link>

									<p>
										{article.author} - {article.created_at}
									</p>
								</div>
							);
					  })
					: null}
			</div>
		);
	}
}

export default FullSizeArticle;
