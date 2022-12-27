import React from "react";
import { graphql, Link } from "gatsby";
import RootLayout from "../layouts";
import { Nav, Banner, BlogPostGrid } from "../components";
import _ from "lodash";

const CategoryPage = ({ pageContext, data, ...props }) => {
  const notEmptyCategories = [];
  const { activeSecondCategory, categoriesSecondLevel = [] } = pageContext;

  const firstPosts = _.take(data.allMarkdownRemark.edges, 5);
  const restPosts = _.drop(data.allMarkdownRemark.edges, 5);

  React.useEffect(() => {
    // console.log(pageContext);
    console.log(firstPosts);
  }, []);

  return (
    <RootLayout>
      <div className="pass-down-container pb-5 bg-img category-page-bg-position">
        {/* <Nav className="mt-2 mb-1" tags={[pageContext.category]} /> */}
        <h1 className="mt-3 mb-0n5">{pageContext.category}</h1>

        <div className="flex gap-2 mb-2 overflow-y-scroll">
          <Link
            className="flex center px-2 py-1 max-wdth-200 txt-base-200 f-secondary weight-800 radius-4"
            to={`categories/${_.kebabCase(pageContext.category)}/`}
          >
            All
          </Link>

          {categoriesSecondLevel.map((category) => (
            <Link
              key={category.id}
              className="flex center px-2 py-1 max-wdth-200 txt-base-200 f-secondary weight-800 radius-4 white-space-nowrap"
              to={`categories/${_.kebabCase(category.title)}/`}
              style={
                activeSecondCategory.title === category.title
                  ? {
                      backgroundColor: "rgba(3, 169, 244, 0.1)",
                      color: "#03A9F4",
                    }
                  : {}
              }
            >
              {category.title}
            </Link>
          ))}
        </div>

        <BlogPostGrid posts={firstPosts} />
      </div>

      <Banner banner="discover" className="mb-5" />

      <BlogPostGrid posts={restPosts} className="container" />
    </RootLayout>
  );
};

export default CategoryPage;

export const pageQuery = graphql`
  query categorySecondLevelPageQuery(
    $category: [String]
    $categorySecond: [String]
  ) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
          category_top_level: { in: $category }
          category_second_level: { in: $categorySecond }
        }
      }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            thumbnail
            category
            category_top_level
            category_second_level
            date(formatString: "DD MMMM YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
