import React from 'react';
import '../css/index.css';
import ArticleList from './ArticleList';

class Content extends React.Component {
	state = {};
	render() {
		return (
			<div className="content">
				<ArticleList />
			</div>
		);
	}
}

export default Content;
