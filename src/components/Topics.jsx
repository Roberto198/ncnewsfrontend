import React from "react";
import { getAllTopics } from "../api/axios";
import TopicCard from "./TopicCard";
import { Typography } from "@material-ui/core";

class Topics extends React.Component {
  state = {};

  componentDidMount() {
    getAllTopics().then(({ data: { topics } }) =>
      this.setState({ topics, loggedInUser: this.props.loggedInUser })
    );
  }
  render() {
    const { topics } = this.state;
    return (
      <div className='topicBody'>
        <Typography variant='button'> Current Topics:</Typography>
        <div className='topicListWrapper'>
          {topics
            ? topics.map(topic => {
                return <TopicCard topic={topic} />;
              })
            : null}
        </div>
      </div>
    );
  }
}

export default Topics;
