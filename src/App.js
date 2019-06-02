import React from "react";
import Header from "./components/Header";
import Article from "./components/Article";
import Profile from "./components/Profile";
import ArticlesContainer from "./components/ArticlesContainer";
import Topics from "./components/Topics";
import TopicPage from "./components/TopicPage.jsx";
import RouteError from "./components/RouteError";
import { Router, navigate } from "@reach/router";
import { axiosGetUser } from "./api/axios";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  route: {
    margin: "auto",
    maxWidth: "900px"
  }
});

class App extends React.Component {
  state = {
    loggedInUser: null,
    searchTerm: ""
  };

  componentDidMount() {
    const loggedInUser = localStorage.getItem("user");
    this.setState({ loggedInUser });
  }

  render() {
    const { loggedInUser, searchTerm } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.app}>
        <Header
          loggedInUser={loggedInUser}
          logOut={this.logOut}
          basicSearch={this.basicSearch}
          setUsername={this.setUsername}
        />

        <Router className={classes.route}>
          <Profile path='/users/:id' loggedInUser={loggedInUser} />
          <Topics path='/topics' loggedInUser={loggedInUser} />
          <TopicPage path='/topics/:id' loggedInUser={loggedInUser} />
          <ArticlesContainer
            path='/'
            searchTerm={searchTerm}
            basicSearch={this.basicSearch}
            loggedInUser={loggedInUser}
          />
          <Article path='/article/:id' loggedInUser={loggedInUser} />
          <RouteError path='/*' />
        </Router>
      </div>
    );
  }

  basicSearch = (searchTerm, paramObj = {}) => {
    this.setState({ searchTerm: searchTerm }, () => {
      navigate("/");
    });
  };

  setUsername = username => {
    axiosGetUser(username)
      .then(({ data: user }) =>
        this.setState({ loggedInUser: user[0].username }, () => {
          localStorage.setItem("user", user[0].username);
        })
      )
      .catch(err => {
        alert("Please enter a valid username.");
      });
  };

  logOut = () => {
    this.setState({ searchTerm: "", loggedInUser: null });
  };
}

export default withStyles(styles)(App);
