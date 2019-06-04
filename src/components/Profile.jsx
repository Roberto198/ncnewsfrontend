import React from "react";
import ArticlesContainer from "./ArticlesContainer";
import { axiosGetUser } from "../api/axios";
import { Typography, Paper, withStyles } from "@material-ui/core";

const styles = {
  profile: {
    textAlign: "center",
    justifyContent: "center",
    padding: "3vh",
    marginBottom: "3vh	"
  },
  profileContent: {
    display: "block"
  },
  username: {
    display: "block",
    paddingBottom: "2vh",
    borderBottom: "1px solid black"
  },
  articles: {
    padding: "3vh"
  }
};

class Profile extends React.Component {
  state = {
    displayedUser: null,
    isLoading: true
  };

  componentDidMount() {
    axiosGetUser(this.props.id)
      .then(({ data }) => {
        this.setState({ displayedUser: data[0], isLoading: false });
      })
      .catch(({ response: { data } }) => {
        this.setState({ err: data, isLoading: false });
      });
  }

  render() {
    const { loggedInUser, classes } = this.props;
    if (this.state.isLoading) {
      return <h3> Loading...</h3>;
    }
    if (this.state.err) {
      return (
        <div className='err'>
          {" "}
          <h3> Error: {this.state.err.msg}</h3>
        </div>
      );
    } else
      return (
        this.state.displayedUser && (
          <div className='profileWrapper'>
            <Paper className={classes.profile}>
              <Typography className={classes.username} variant='h3'>
                {this.props.id}
              </Typography>
              <div className={classes.profileContent}>
                <img
                  src={`${this.state.displayedUser.avatar_url}`}
                  alt='profile'
                />
              </div>
            </Paper>
            <Paper className={classes.articles}>
              <Typography variant='h5'>
                {this.state.displayedUser.username}'s articles:
              </Typography>
              <div className='profilesArticlesContainer' />
              <ArticlesContainer
                query={{ author: this.state.displayedUser.username }}
                searchTerm=''
                loggedInUser={loggedInUser}
              />
            </Paper>
          </div>
        )
      );
  }
}

export default withStyles(styles)(Profile);
