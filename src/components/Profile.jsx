import React from 'react';
import ArticlesContainer from './ArticlesContainer';
import { axiosGetUser } from '../api/axios';
import CommentsContainter from './CommentsContainer';

class Profile extends React.Component {
	state = {
		displayedUser: null,
		loadedUser: false,
		loadedArticle: false,
		articles: [],
		loggedInUser: null,
		isLoading: true,
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.loggedInUser !== this.props.loggedInUser) {
			this.setState({ loggedInUser: this.props.loggedInUser });
		}
	}

	componentDidMount() {
		axiosGetUser(this.props.id)
			.then(({ data }) => {
				this.setState({ displayedUser: data[0], loggedInUser: this.props.loggedInUser, isLoading: false });
			})
			.catch(({ response: { data } }) => {
				this.setState({ err: data, isLoading: false });
			});
	}

	render() {
		let { loggedInUser } = this.props;
		if (this.state.isLoading) {
			return <h3> Loading...</h3>;
		}
		if (this.state.err) {
			return (
				<div className="err">
					{' '}
					<h3> Error: {this.state.err.msg}</h3>
				</div>
			);
		} else
			return this.state.displayedUser ? (
				<div className=" profileWrapper">
					<h1>{this.props.id}</h1>
					<div className="profilePicture">
						<img src={`${this.state.displayedUser.avatar_url}`} alt="profile" />
					</div>
					<h3>{this.state.displayedUser.username}'s articles:</h3>
					<div className="profilesArticlesContainer" />
					<ArticlesContainer
						query={{ author: this.state.displayedUser.username }}
						searchTerm=""
						loggedInUser={loggedInUser}
					/>
				</div>
			) : null;
	}
}

export default Profile;
