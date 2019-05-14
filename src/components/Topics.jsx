import React from 'react';
import { getAllTopics } from '../api/axios';
import { Link } from '@reach/router';

class Topics extends React.Component {
	state = {};

	componentDidMount() {
		getAllTopics().then(({ data: { topics } }) => this.setState({ topics, loggedInUser: this.props.loggedInUser }));
	}
	render() {
		const { topics } = this.state;
		return (
			<div>
				<h2> Current Topics:</h2>
				<ul>
					{topics
						? topics.map(topic => {
								return (
									<li key={topic.slug}>
										{' '}
										<Link to={`/topics/${topic.slug}`}>
											{' '}
											{topic.slug}
											<p>-- {topic.description}</p>
										</Link>
									</li>
								);
						  })
						: null}
				</ul>
			</div>
		);
	}
}

export default Topics;
