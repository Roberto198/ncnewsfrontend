import React from 'react';
import ArticleCard from './ArticleCard';

const ArticlesList = props => {
	let { articles, loggedInUser } = props;
	return articles.map(article => {
		return <ArticleCard article={article} loggedInUser={loggedInUser} key={article.article_id} />;
	});
};

export default ArticlesList;
