import React from "react";
import { getAllTopics } from "../api/axios";
import TopicCard from "./TopicCard";
import { Typography } from "@material-ui/core";

class Topics extends React.Component {
  state = {
    topics: null
  };

  componentDidMount() {
    getAllTopics().then(({ data: { topics } }) => this.setState({ topics }));
  }
  render() {
    const { topics } = this.state;
    return (
      <div className='topicBody'>
        <Typography variant='button'> Current Topics:</Typography>
        <div className='topicListWrapper'>
          {topics &&
            topics.map(topic => {
              return <TopicCard topic={topic} />;
            })}
        </div>
      </div>
    );
  }
}

export default Topics;
