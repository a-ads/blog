import React from "react";
import { graphql, Link } from "gatsby";
import RootLayout from "../layouts";
import { Nav, Banner, BlogPostGrid } from "../components";
import _ from "lodash";

const CategoryPage = ({ pageContext, data }) => {
  const categoriesSecondLevel = pageContext.categoriesSecondLevel;

  const firstPosts = _.take(data.allMarkdownRemark.edges, 5);
  const restPosts = _.drop(data.allMarkdownRemark.edges, 5);

  return (
    <RootLayout>
      <div className="pass-down-container pb-5 bg-img category-page-bg-position">
        <Nav className="mt-2 mb-1" tags={[pageContext.category]} />

        <div className="flex gap-2 mb-2 overflow-y-scroll">
          <div
            className="flex pointer center px-2 py-1 max-wdth-200 bg-success-100 f-secondary weight-800 radius-4"
            style={{
              backgroundColor: "rgba(3, 169, 244, 0.1)",
              color: "#03A9F4",
            }}
          >
            All
          </div>

          {categoriesSecondLevel.map((category) => (
            <Link
              key={category.id}
              className="flex center px-2 py-1 max-wdth-200 txt-base-200 f-secondary weight-800 radius-4"
              to={`categories/${_.kebabCase(category.title)}`}
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
  query categoryTopLevelPageQuery($category: [String]) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category_top_level: { in: $category } } }
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
