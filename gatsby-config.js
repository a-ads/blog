const PATH_PREFIX = "/blog";

module.exports = {
  pathPrefix: PATH_PREFIX,
  siteMetadata: {
    title: "A-ADS Blog",
    description: `A-ADS is a pioneer crypto advertising network. It offers ethical privacy-aware CPA, CPD, CPM ads and accepts over 20 major crypto-currencies, including Bitcoin.`,
    // image: `static/favicon.png`,
    siteUrl: "https://a-ads.com",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        enableIdentityWidget: false,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: "content",
      },
    },
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-yaml",
    `gatsby-plugin-sitemap`,
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1140,
            },
          },
          "gatsby-remark-numbered-list-fix",
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: "Table of Contents",
              tight: false,
              ordered: false,
              fromHeading: 1,
              toHeading: 6,
              className: "table-of-contents",
            },
          },
          `gatsby-remark-autolink-headers`,
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_self",
              rel: "nofollow"
            }
          }
        ],
      },
    },

    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                siteUrl
                
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url:
                    site.siteMetadata.siteUrl +
                    PATH_PREFIX +
                    edge.node.fields.slug,
                  guid:
                    site.siteMetadata.siteUrl +
                    PATH_PREFIX +
                    edge.node.fields.slug,
                  custom_elements: [
                    {
                      "content:encoded": edge.node.html,
                    },
                  ],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                      html
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Your Site's RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted

            // match: "^/blog/",
          },
        ],
      },
    },
  ],
};
