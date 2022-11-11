import React from "react";
import { connect } from "react-redux";
import { Link, withPrefix } from "gatsby";
import _ from "lodash";

import Icon from "../components/Icon";
import { SearchIcon } from "../components/icons";
import cn from "../utils/cn";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.searchQueryInputRef = React.createRef();
    this.searchFormSubmitId = "search-form-submit";
    this.onSearchQueryInputChange = this.onSearchQueryInputChange.bind(this);
    this.onCrossClick = this.onCrossClick.bind(this);
    this.setSearchComponentRef = this.setSearchComponentRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    if (this.props.focus) {
      this.searchQueryInputRef.current.focus();
    }
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setSearchComponentRef(node) {
    this.searchComponentRef = node;
  }

  handleClickOutside(event) {
    if (this.isClickOutside(event) && this.props.onOutsideClick) {
      this.props.onOutsideClick();
    }
  }

  isClickOutside(event) {
    return (
      this.searchComponentRef && !this.searchComponentRef.contains(event.target)
    );
  }

  onSearchQueryInputChange(event) {
    this.props.changeSearchQuery(event.target.value);
  }

  isSearchQueryEmpty() {
    return !this.props.search.query;
  }

  onCrossClick() {
    this.clearSearchQuery();
    this.focusOnSearchQueryInput();
  }

  clearSearchQuery() {
    this.props.changeSearchQuery("");
  }

  render() {
    return (
      <form
        role="search"
        action={withPrefix("/search/")}
        method="get"
        className={cn("bg-grey-100 radius-4 flex center", this.props.className)}
        style={{ paddingInline: "1.75rem", maxHeight: 46 }}
      >
        <Icon
          i={<SearchIcon />}
          onClick={() => this.searchQueryInputRef.current.focus()}
        />
        <input
          name="search-query"
          value={this.props.search.query}
          onChange={this.onSearchQueryInputChange}
          type="text"
          ref={this.searchQueryInputRef}
          placeholder="Search Here"
          className="fullsize bg-transparent border-0 ml-1 body-1"
          autoComplete="off"
        />
      </form>
    );
  }
}

const Header = ({
  search,
  changeSearchQuery,
  style = {},
  categoriesTopLevel,
  ...props
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handler = () => mediaQuery.matches && setIsHamburgerOpen(false);

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <header
      className="flex y-center shadow-1 bg-base-100"
      style={{ height: isHamburgerOpen ? 176 : 88, ...style }}
      {...props}
    >
      <div
        className={`grid cols-3 header-container full-w ${
          isHamburgerOpen ? "fullsize" : "gap-2"
        }`}
      >
        <div className="flex y-center gap-3 col-span-2">
          <Link style={{ height: 46 }} to="/">
            <img
              src={withPrefix("/images/logo.svg")}
              alt="logo"
              width="90"
              height="50"
            />
          </Link>
          <nav
            className={`flex not-desk-d-none ${
              isHamburgerOpen
                ? "not-desk-flex column absolute z-layout bg-grey-300 full-w pt-1n5 pb-2 pass-down-not-desk-font-normal"
                : "gap-2"
            }`}
            style={{ top: isHamburgerOpen ? 176 : null }}
          >
            {categoriesTopLevel.nodes.map((node, i) => (
              <Link
                key={node.id}
                to={`/categories/${_.kebabCase(node.title)}`}
                className={`f-secondary txt-primary-400 body-1 bold ${
                  i === categoriesTopLevel.nodes.length - 1 && "border-none"
                } ${isHamburgerOpen ? "bb-grey-600 py-1" : ""}`}
                style={{ order: node.order }}
              >
                {node.title}
              </Link>
            ))}
          </nav>
        </div>
        <div
          className={`nav-hamburger ml-auto l-d-none  ${
            isHamburgerOpen ? "open mt-1n5" : "mb-1"
          }`}
          onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
          {...props}
        >
          <span />
          <span />
          <span />
        </div>
        <SearchBar
          search={search}
          changeSearchQuery={changeSearchQuery}
          className={`full-w not-desk-d-none ${
            isHamburgerOpen ? "not-desk-flex col-span-3 mt-1 mb-0n5" : ""
          }`}
        />
      </div>
    </header>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
