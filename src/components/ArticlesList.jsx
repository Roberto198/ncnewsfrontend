import React from "react";
import ArticleCard from "./ArticleCard";
import { Grid, withStyles } from "@material-ui/core";

const styles = {
  Grid: {
    display: "flex",
    direction: "row",
    alignItems: "center"
  }
};

const ArticlesList = props => {
  const { articles, loggedInUser } = props;
  return (
    <div>
      <Grid container justify='center'>
        {articles.map(article => {
          return (
            <ArticleCard
              article={article}
              loggedInUser={loggedInUser}
              key={article.article_id}
            />
          );
        })}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(ArticlesList);
