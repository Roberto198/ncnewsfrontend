import React, { Component } from "react";
import VoteButtons from "./VoteButtons";
import { axiosIncVotes, axiosRemove } from "../api/axios";
import { Typography, Paper, withStyles } from "@material-ui/core";
import { Link } from "@reach/router";

const styles = {
  commentBody: {
    padding: "3vh"
  },
  comment: {
    padding: "3vh",
    display: "block",
    backgroundColor: "#f5f5f5	"
  }
};
class CommentCard extends Component {
  state = {
    vote: 0
  };
  render() {
    const { comment, classes } = this.props;
    const date = comment.created_at;
    return (
      <Paper className={classes.commentBody} key={comment.comment_id}>
        <Typography className={classes.comment}>{comment.body}</Typography>
        {this.props.loggedInUser && (
          <VoteButtons
            loggedInUser={this.props.loggedInUser}
            voteFunc={this.vote}
            remove={this.props.remove}
            voteValue={this.state.vote}
            author={comment.author}
            path={this.props.path}
            id={comment.comment_id}
            media='comments'
          />
        )}
        <span className='commentDetail'>
          <Typography>
            {this.createDate(date)} --{" "}
            <Link to={`/users/${comment.author}`}>{comment.author}</Link> --{" "}
            {comment.votes} Votes!
          </Typography>
        </span>
      </Paper>
    );
  }

  vote = (direction, id) => {
    axiosIncVotes(direction, "comments", id);
    this.setState(prevState => {
      return { vote: prevState.vote + direction };
    });
  };
  remove = (media, id) => {
    axiosRemove(media, id);
    this.setState({
      comments: this.state.comments.filter(comment => {
        return comment.comment_id !== id;
      })
    });
  };
  createDate(stamp) {
    return new Date(stamp).toDateString();
  }
}

export default withStyles(styles)(CommentCard);
