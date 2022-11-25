import React from "react";
import { withPrefix } from "gatsby";
import { connect } from "react-redux";
import Axios from "axios";
import * as JsSearch from "js-search";

import RootLayout from "../layouts";
import { BlogPostGrid, Banner, Spinner } from "../components";
import { getCurrentURL, getURLParamValue } from "../helpers";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: [],
      isLoaded: false,
    };
    this.searchResults = [];
  }

  async componentDidMount() {
    this.changeSearchQueryFromURLParam();
    Axios.get(withPrefix("/search.json")).then((res) => {
      this.setState({
        postList: res.data,
        isLoaded: true,
      });
    });
  }

  changeSearchQueryFromURLParam() {
    const searchQuery = getURLParamValue("search-query", getCurrentURL());
    const isSearchQueryValid = !!searchQuery;
    if (isSearchQueryValid) {
      this.props.changeSearchQuery(searchQuery);
    }
  }

  setSearchResults = () => {
    const { postList } = this.state;
    const dataToSearch = new JsSearch.Search("title");
    dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy();
    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer();
    dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex("title");
    dataToSearch.addDocuments(postList);
    dataToSearch.addIndex("title");
    dataToSearch.addIndex("fullExcerpt");
    dataToSearch.addIndex("tags");
    this.searchResults = dataToSearch.search(this.props.search.query);
  };

  formatPosts = (searchResults) =>
    searchResults.map((r) => ({
      node: {
        fields: {
          slug: r.slug,
        },
        frontmatter: {
          thumbnail: r.thumbnail,
          title: r.title,
          category: r.tags[0],
          date: r.date,
        },
      },
    }));

  render() {
    this.setSearchResults();
    const isSearchValid = this.searchResults.length && this.state.isLoaded; // isLoaded has nothing to do with validity. We need a loading state design TODO

    return (
      <RootLayout>
        <div className="search-page-bg">
          {!this.state.isLoaded && (
            <div className="spinner-wrap">
              <Spinner />
            </div>
          )}

          {this.state.isLoaded && (
            <>
              <section className="container pb-1">
                <h1 className="mt-2 s-mt-1n5">
                  {isSearchValid
                    ? `Search results for «${this.props.search.query}»`
                    : "No results were found"}
                </h1>
                {Boolean(isSearchValid) && (
                  <span className="txt-grey-200 body-1">
                    {this.searchResults.length} articles found
                  </span>
                )}
                {isSearchValid ? (
                  <BlogPostGrid
                    posts={this.formatPosts(this.searchResults)}
                    className="mt-3 s-mt-1n5"
                    span={false}
                    amount={Infinity}
                  />
                ) : (
                  <p className="body-1 pb-6" style={{ marginTop: 6 }}>
                    Please, make sure your keywords are spelled correctly or try
                    different search query
                  </p>
                )}
              </section>
              <Banner banner="promote" className="mt-4" />
            </>
          )}
        </div>
      </RootLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.search,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeSearchQuery: (searchQuery) =>
      dispatch({
        //TODO сделать отдельный файл в actions
        type: "SEARCH_QUERY_CHANGE",
        payload: searchQuery,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
