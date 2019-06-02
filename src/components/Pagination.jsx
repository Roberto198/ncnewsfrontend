import React, { Component } from "react";
import { Button, Typography, Grid } from "@material-ui/core";

class Pagination extends Component {
  state = {};
  render() {
    const { p, pages, pageNav, article_count } = this.props;
    return (
      <Grid container direction='row' justify='center' alignItems='center'>
        {this.props.searchTerm && this.props.searchTerm.length > 1 && (
          <Typography variant='h6'>
            Search :'{this.props.searchTerm}'
          </Typography>
        )}
        &nbsp;&nbsp;
        <Typography variant='h6'>
          Articles found: {article_count}. &nbsp; Page: {p} of {pages} :
        </Typography>
        &nbsp;&nbsp;
        {p > 1 && (
          <Button
            size='small'
            variant='primary'
            onClick={() => {
              pageNav(-1);
            }}
          >
            Prev
          </Button>
        )}
        {p < pages && (
          <Button
            size='small'
            onClick={() => {
              pageNav(1);
            }}
          >
            Next
          </Button>
        )}
      </Grid>
    );
  }
}

export default Pagination;
