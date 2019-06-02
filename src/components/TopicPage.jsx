import React from "react";
import { axiosGetAllArticles } from "../api/axios";
import ArticlesContainer from "./ArticlesContainer";
import { Typography } from "@material-ui/core";

class TopicPage extends React.Component {
  state = {
    articles: null,
    searchTerm: null,
    loggedInUser: null
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.loggedInUser !== this.state.loggedInUser) {
      this.setState({ loggedInUser: this.props.loggedInUser });
    }
  }

  componentDidMount() {
    axiosGetAllArticles({ topic: this.props.id, limit: 999 }).then(
      ({ data: { articles } }) => {
        this.setState({ articles, loggedInUser: this.props.loggedInUser });
      }
    );
  }
  render() {
    return (
      <div className='topics'>
        <Typography variant='button'>
          Articles under the topic '{this.props.id}':
        </Typography>
        <ArticlesContainer
          query={{ topic: this.props.id }}
          loggedInUser={this.state.loggedInUser}
          searchTerm=''
        />
      </div>
    );
  }
}

export default TopicPage;
