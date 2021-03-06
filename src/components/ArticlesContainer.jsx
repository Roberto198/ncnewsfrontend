import React from "react";
import { axiosArticlesRequest, axiosGetAllArticles } from "../api/axios";
import ArticlesList from "./ArticlesList";
import SortButtons from "./SortButtons";
import Pagination from "./Pagination";
import { axiosRemove } from "../api/axios";

class ArticlesContainer extends React.Component {
  state = {
    articles: null,
    searchTerm: "",
    p: 1,
    pages: null,
    limit: 10,
    loading: true
  };

  fetchArticles() {
    axiosArticlesRequest(
      {
        params: {
          ...this.props.query,
          p: this.state.p,
          limit: this.state.limit
        }
      },
      this.props.searchTerm
    ).then(({ data: { articles, article_count } }) => {
      this.setState({
        articles,
        searchTerm: this.props.searchTerm,
        article_count,
        pages: Math.ceil(article_count / this.state.limit),
        loading: false
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.p !== this.state.p ||
      this.props.searchTerm !== this.state.searchTerm
    ) {
      this.fetchArticles();
    }
  }

  componentDidMount() {
    this.fetchArticles();
  }

  render() {
    const { articles, article_count, p, pages } = this.state;
    return (
      <div>
        <div>
          <SortButtons
            style={{ zIndex: "0" }}
            reSort={this.getSortedArticles}
            query={this.props.query}
          />
        </div>

        <div className='articlesListWrapper'>
          {article_count && (
            <Pagination
              article_count={article_count}
              p={p}
              pages={pages}
              pageNav={this.pageNav}
              searchTerm={this.props.searchTerm}
            />
          )}

          <div>
            {!articles && <h3>Loading...</h3>}
            {articles && articles.length === 0 && <h3>No articles found!</h3>}

            {articles && (
              <ArticlesList
                remove={this.remove}
                articles={articles}
                loggedInUser={this.props.loggedInUser}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
  remove = id => {
    axiosRemove("articles", id).then(() => {
      this.setState(prevState => {
        return {
          articles: prevState.articles.filter(article => {
            return article.article_id !== id;
          })
        };
      });
    });
  };

  getSortedArticles = param => {
    if (!this.state.searchTerm) {
      axiosGetAllArticles({ params: param }).then(({ data: { articles } }) => {
        this.setState({ articles, p: 1 });
      });
    } else {
      axiosArticlesRequest({ params: param }, `/${this.state.searchTerm}`).then(
        ({ data: { articles } }) => {
          this.setState({ articles, p: 1 });
        }
      );
    }
  };
  pageNav = int => {
    const { p, pages } = this.state;
    if (p + int <= pages && p + int > 0) {
      this.setState({ p: p + int });
    }
  };
}

export default ArticlesContainer;
