import React from 'react';
import ArticleList from './ArticleList';

class Profile extends React.Component {
	state = {
		displayedUser: [],
		loadedUser: false,
		loadedArticle: false,
		articles: [],
	};

	// componentDidUpdate(prevState) {
	// 	if (prevState.loadedUser !== this.state.loadedUser) {
	// 		this.setState({ displayedUser: this.props.id });
	// 	}
	// }

	// componentDidMount() {
	// 	console.log(this.props);
	// 	let { articles } = this.props;
	// 	axiosGetRequest({}, `/users/${this.props.id}`).then(user => {
	// 		this.setState({
	// 			articles: articles,
	// 			displayedUser: user.data[0],
	// 			loadedArticle: true,
	// 			loadedUser: 'true',
	// 		});
	// 	});
	// }

	render() {
		return this.state.loaded === false ? (
			<h1>Loading...</h1>
		) : (
			<div>
				<h1>{this.props.id}</h1>
				<div className="">
					<img src={this.state.displayedUser.avatar_url} alt="" />
				</div>
				<h3>{this.state.displayedUser.username}'s articles:</h3>
				<ArticleList displayedUser={this.state.displayedUser.username} articles={this.state.articles} />
				<h3> users Comments</h3>
				{/* <Comments /> */}
			</div>
		);
	}
}

export default Profile;
