import React from "react";
import { Button } from "@material-ui/core";

class VoteButtons extends React.Component {
  state = {
    addComment: false,
    commentField: ""
  };
  render() {
    const {
      voteValue,
      voteFunc,
      id,
      loggedInUser,
      author,
      remove,
      media
    } = this.props;
    return (
      <div>
        <div>
          <Button
            size='large'
            disabled={voteValue > 0}
            onClick={() => {
              voteFunc(1, id);
            }}
          >
            {voteValue < 1 ? (
              <span role='img' aria-label='UpVote!'>
                👍
              </span>
            ) : (
              <span role='img' aria-label='Voted!'>
                ✔
              </span>
            )}
          </Button>
          <Button
            size='large'
            disabled={voteValue < 0}
            onClick={() => {
              voteFunc(-1, id);
            }}
          >
            {voteValue > -1 ? (
              <span role='img' aria-label='UpVote!'>
                👎
              </span>
            ) : (
              <span role='img' aria-label='Voted!'>
                ✔
              </span>
            )}
          </Button>
          {loggedInUser && loggedInUser === author && (
            <Button
              size='large'
              onClick={() => {
                remove(media, id);
              }}
            >
              <span role='img' aria-label='Remove!'>
                ❌
              </span>
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default VoteButtons;
