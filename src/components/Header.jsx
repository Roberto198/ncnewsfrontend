import React from 'react';
import '../css/index.css';
import { Link } from '@reach/router';

class Header extends React.Component {
	state = {
		search: '',
		usernameInput: null,
	};

	// componentDidUpdate(prevState){
	// 	if(this.state.search !== prevState.search)

	// }

	render() {
		return (
			<div className="wrapper">
				<div className="header">
					<div className="mainHeader">
						{this.props.loggedInUser === null ? (
							<span className="loginControl">
								<form onSubmit={this.submitUsername}>
									Login :{' '}
									<input type="text" onChange={this.handleInput} defaultValue="E.g.: jessjelly" />
									<button type="submit">Go!</button>
								</form>
							</span>
						) : (
							<span className="loginControl">
								<Link to={`/users/${this.props.loggedInUser.username}`}>Profile.</Link>
								<span onClick={this.logOut}>Logout.</span>
							</span>
						)}
						<span>NCNews</span> <hr />{' '}
						<span className="searchBox">
							<form onSubmit={this.submitSearch}>
								<input type="text" onChange={this.updateSearch} value={this.state.search} />
								<button type="submit">Submit</button>
							</form>
							<button onClick={this.exitSearch}>Reset</button>
						</span>
						<Link to="/topics">
							<button>topics</button>
						</Link>
						<Link to="/">
							<button>Home</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
	updateSearch = e => {
		this.setState({ search: e.target.value });
	};

	submitSearch = e => {
		e.preventDefault();
		this.props.basicSearch(this.state.search);
		this.setState({ search: '' });
	};
	exitSearch = () => {
		this.props.basicSearch('');
		this.setState({ search: '' });
	};

	handleInput = e => {
		this.setState({ usernameInput: e.target.value });
	};

	submitUsername = e => {
		e.preventDefault();
		this.props.setUsername(this.state.usernameInput);
	};

	logOut = e => {
		this.props.logOut();
	};
}

export default Header;
