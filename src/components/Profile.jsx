import React from 'react';
import ArticleList from './ArticleList';
import { axiosGetUser } from '../api/axios';

class Profile extends React.Component {
	state = {
		displayedUser: null,
		loadedUser: false,
		loadedArticle: false,
		articles: [],
	};

	// componentDidUpdate(prevState) {
	// 	if (this.state.displayedUser != prevProps.) {
	// 		this.setState({ displayedUser: this.props.id });
	// 	}
	// }

	componentDidMount() {
		axiosGetUser(this.props.id).then(({ data }) => {
			//search for a users comments, Comments changed to have minimal state
			this.setState({ displayedUser: data[0], loggedInUser: this.props.loggedInUser });
		});
	}

	render() {
		let { loggedInUser } = this.props;
		return this.state.displayedUser ? (
			<div>
				<h1>{this.props.id}</h1>
				<div className="profilePicture">
					<img src={`${this.state.displayedUser.avatar_url}`} alt="profile" />
				</div>
				<h3>{this.state.displayedUser.username}'s articles:</h3>
				<ArticleList query={{ author: this.state.displayedUser.username }} loggedInUser={loggedInUser} />
				<h3> users Comments</h3>
			</div>
		) : null;
	}
}

export default Profile;
