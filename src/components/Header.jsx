import React from 'react';
import '../css/index.css';
import Axios from 'axios';

class Header extends React.Component {
	state = {
		userProfile: {},
	};
	componentDidMount() {
		const url = `https://northcodersapinews.herokuapp.com/api/users/${this.props.username}`;
		Axios.get(url).then(({ data }) => {
			this.setState({ userProfile: data[0] });
		});
	}

	render() {
		return (
			<div className="wrapper">
				<div className="header">
					<div className="profileHeader">
						<h3>{this.props.username}</h3>
					</div>
					<div className="mainHeader">
						<h1>NCNews</h1>
						<hr />
						<span>
							Search: <input type="text" onChange={this.updateSearch} />
							<button type="submit">Submit</button>
							<span className="links">TOP -- NEWEST -- MOST COMMENTED </span>
						</span>
					</div>
				</div>
			</div>
		);
	}
	updateSearch() {
		console.log(this.target.value);
	}
}

export default Header;
