import React from 'react';
import { getAllTopics } from '../api/axios';
import { Link } from '@reach/router';
import TopicCard from './TopicCard';

class Topics extends React.Component {
	state = {};

	componentDidMount() {
		getAllTopics().then(({ data: { topics } }) => this.setState({ topics, loggedInUser: this.props.loggedInUser }));
	}
	render() {
		const { topics } = this.state;
		return (
			<div className="topicBody">
				<h2> Current Topics:</h2>
				<div className="topicListWrapper">
					{topics
						? topics.map(topic => {
								return (
									<TopicCard topic={topic} />
									// <div className="topicCard" key={topic.slug}>
									// 	{' '}
									// 	<Link to={`/topics/${topic.slug}`}>
									// 		{' '}
									// 		<span className="topicTitle">{topic.slug}</span>
									// 		<p class="topicLinks">-- {topic.description}</p>
									// 	</Link>
									// </div>
								);
						  })
						: null}
				</div>
			</div>
		);
	}
}

export default Topics;
