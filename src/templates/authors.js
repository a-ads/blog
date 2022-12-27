import React from "react";
import { Link } from "gatsby";
import { graphql, withPrefix } from "gatsby";
import _ from "lodash";
import RootLayout from "../layouts";
import { Banner, Img } from "../components";

export default ({ location, data, pageContext }) => {
  const { authors } = pageContext;

  return (
    <RootLayout className="bg-primary-500">
      <main className="pt-2">
        <section className="container" aria-label="Authors">
          <h1 className="mt-1 mb-3 heading-1">Authors</h1>
          <div className="flex wrap s-column">
            {authors.map(({ node, articlesCount }) => (
              <Link
                key={node.fields.slug}
                to={node.fields.slug + "/"}
                className="flex y-center x-left gap-1n5 col-2 mb-2 s-full-w txt-primary-400"
              >
                <Img
                  src={node.frontmatter.image}
                  maxW={167}
                  className="s-col-4 m-wdth-100"
                />
                <div className="flex column body-1">
                  <h3 className="heading-3">{node.frontmatter.name}</h3>
                  <span className="txt-grey-200 mt-0n5 mb-1">
                    {node.frontmatter.position}
                  </span>
                  <span className="txt-grey-200">
                    Articles:{" "}
                    <span className="txt-grey-400">{articlesCount}</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <Banner className="mt-2" banner="promote" />
      </main>
    </RootLayout>
  );
};

// export const query = graphql`
//   query AuthorsQuery() {
//     markdownRemark(
//       filter: {fileAbsolutePath: {regex: "/^.*\/content\/authors\/.*\.md$/"}}
//     ) {
//       html
//       tableOfContents
//       frontmatter {
//         name
//       }
//       excerpt
//     }

//     site {
//       siteMetadata {
//         title
//         siteUrl
//       }
//     }
//   }
// `
