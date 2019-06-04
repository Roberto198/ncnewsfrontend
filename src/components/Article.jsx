import React from "react";
import CommentsContainer from "./CommentsContainer";
import { axiosGetAllArticles, axiosRemove, axiosIncVotes } from "../api/axios";
import { Link, navigate } from "@reach/router";
import VoteButtons from "./VoteButtons";
import { Paper, Typography, withStyles } from "@material-ui/core";

const styles = {
  div: {
    padding: "10vh 5vh",
    margin: "5vw",
    maxWidth: "900px"
  },
  body: {
    textIndent: "20px",
    initialLetter: "2",
    maxWidth: "900px"
  },
  votediv: {
    maxWidth: "900px"
  },
  votes: {
    textAlign: "center",
    marginBottom: "0px",
    maxWidth: "900px"
  },
  detail: {
    display: "flex",
    justifyContent: "center",
    maxWidth: "900px"
  }
};

class Article extends React.Component {
  state = {
    article: null,
    vote: 0,
    isLoading: true,
    err: null
  };

  componentDidMount() {
    axiosGetAllArticles({}, this.props.id)
      .then(({ data: { article } }) => {
        this.setState({ article, isLoading: false });
      })
      .catch(({ response: { data } }) => {
        this.setState({ err: data, isLoading: false });
      });
  }

  render() {
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
    } else {
      const {
        title,
        body,
        votes,
        topic,
        author,
        comment_count,
        created_at
      } = this.state.article;
      const { vote } = this.state;
      const { classes, loggedInUser, id } = this.props;

      return (
        <div className={classes.wrapper}>
          <div>
            <Paper className={classes.div}>
              <Typography variant='h4' p='20px' gutterBottom>
                {title}
              </Typography>
              <Typography variant='subtitle2'>By {author} </Typography>
            </Paper>
            <Paper className={classes.div}>
              <div>
                <Typography className={classes.body} variant='h6' gutterBottom>
                  {body}
                </Typography>
              </div>
            </Paper>
            <Paper className={classes.votediv}>
              <Typography>
                By: <Link to={`/users/${author}`}>{author}</Link>
                <br />
                Topic: <Link to={`/topics/${topic}`}>{topic}</Link>
                <br />
                Votes: {votes + vote}
                <br />
                Comments: {comment_count}
                <br />
                Written: {new Date(created_at).toDateString()}
              </Typography>
              {this.props.loggedInUser && (
                <div className={classes.votes}>
                  <VoteButtons
                    loggedInUser={loggedInUser}
                    voteFunc={this.vote}
                    remove={this.remove}
                    voteValue={vote}
                    author={author}
                    id={id}
                    media='articles'
                  />
                </div>
              )}
            </Paper>
          </div>{" "}
          <Paper className={classes.detail}>
            <CommentsContainer article={id} loggedInUser={loggedInUser} />
          </Paper>
        </div>
      );
    }
  }

  vote = (direction, id) => {
    axiosIncVotes(direction, "articles", id);
    this.setState(prevState => {
      return { vote: prevState.vote + direction };
    });
  };

  remove = (media, id) => {
    axiosRemove(media, id).then(() => {
      navigate(`/users/${this.state.article.author}`);
    });
  };
}

export default withStyles(styles)(Article);
