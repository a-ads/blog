import React, { useMemo } from "react";
import { graphql, withPrefix, Link } from "gatsby";
import { Helmet } from "react-helmet";
import _ from "lodash";
import Slider from "react-slick";

import RootLayout from "../layouts";
import { Nav, Img, Banner, Card, AntiAdBlockLink, Bullet } from "../components";
import { useMedia } from "../hooks";
import cn from "../utils/cn";

const ArticleOverview = ({ toc, className, authorLinks, ...props }) => {
  const medias = useMedia({
    ids: authorLinks,
    className: "blue",
    size: 36,
  });

  return (
    <aside
      className={cn("flex column x-left col-4 full-w", className)}
      {...props}
    >
      {medias.length > 0 && (
        <div className="overview-medias flex gap-2 not-desk-mt-3 mb-2 not-desk-d-none">
          {medias}
        </div>
      )}
      {toc && (
        <>
          {" "}
          <span
            className={`label weight-600 f-secondary ${
              medias.lenght ? "" : "not-desk-mt-2"
            }`}
          >
            Read in the article:
          </span>
          <div
            className={cn("toc body-1 mt-0n5 mb-2")}
            dangerouslySetInnerHTML={{ __html: toc }}
          />
        </>
      )}
      <div
        className={`below-1200-d-none ${!medias.length && !toc && "mt-2n2"}`}
        style={{
          backgroundImage: `url('${withPrefix("/images/small-banner.jpg")}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="p-2">
          <div className="flex column gap-1 txt-base-100">
            <Img src={withPrefix("/images/banner-logo.png")} maxW={71} />
            <h4 style={{ fontSize: 22 }}>
              Promote your crypto project with us!
            </h4>
            <AntiAdBlockLink
              href="https://a-ads.com/campaigns/new"
              className="btn-blue"
              style={{ width: 206 }}
            >
              Start now
            </AntiAdBlockLink>
          </div>
        </div>
      </div>
    </aside>
  );
};

export const Categories = ({ ids, className }) => (
  <ul className={`flex gap-1 mt-1 body-1 wrap ${className || ""}`}>
    {ids.map((label) => (
      <li key={label} className="p-1 bg-success-100">
        {label}
      </li>
    ))}
  </ul>
);

const BlogPost = ({ location, data, pageContext }) => {
  const medias = useMedia({
    ids: ["twitter", "fb", "btc"],
    size: 36,
    className: "blue",
  });
  const seo = useMemo(
    () => ({
      htmlTitle: `${data.markdownRemark.frontmatter.title}`,
      siteUrl: data.site.siteMetadata.siteUrl,
      post: data.markdownRemark,
      toc: data.markdownRemark.tableOfContents,
      timeToRead: data.markdownRemark.timeToRead,
    }),
    [data]
  );

  React.useEffect(() => {
    document
      .querySelectorAll(".js-anchor-target-blank a")
      .forEach((anchor) => (anchor.target = "_blank"));
  }, []);

  const navTags = [];
  navTags.push(_.take(data.markdownRemark.frontmatter.category_top_level, 1));
  navTags.push(
    _.take(data.markdownRemark.frontmatter.category_second_level, 1)
  );

  const restTags = [];
  restTags.push(
    ..._.drop(data.markdownRemark.frontmatter.category_top_level, 1)
  );
  restTags.push(
    ..._.drop(data.markdownRemark.frontmatter.category_second_level, 1)
  );

  const author = pageContext.author;

  return (
    <RootLayout>
      <Helmet>
        <title>{seo.htmlTitle}</title>
        <meta
          property="og:url"
          content={`${seo.siteUrl}${location.pathname}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.post.frontmatter.title} />
        <meta
          property="og:image"
          content={`${seo.siteUrl}${seo.post.frontmatter.thumbnail}`}
        />
        <meta property="og:site_name" content={data.site.siteMetadata.title} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:description" content={seo.post.excerpt} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@aads_network" />
        <meta
          name="twitter:url"
          content={`${seo.siteUrl}${location.pathname}`}
        />
        <meta name="twitter:title" content={seo.post.frontmatter.title} />
        <meta name="twitter:description" content={seo.post.excerpt} />
        <meta
          name="twitter:image"
          content={`${seo.siteUrl}${seo.post.frontmatter.thumbnail}`}
        />
        <meta
          name="description"
          content={seo.post.frontmatter.meta_description}
        />
        <meta name="keywords" content={seo.post.frontmatter.meta_keywords} />
        <script type="application/ld+json">
          {seo.post.frontmatter.json_ld}
        </script>
      </Helmet>

      <div className="bg-grey-300 mt-2 s-mt-20px bg-img blog-post-bg-position">
        <main className="flex column">
          <header className="grid cols-4 full-w container below-600-full-w overflow-visible">
            <div />
            <section className="col-span-3 below-1200-col-span-4">
              <Nav tags={navTags} />
              <h1 className="heading-1 mt-1 mb-0n5">{seo.htmlTitle}</h1>
              <Link
                className="uppercase txt-primary-200 bold body-1 f-secondary"
                to={`/categories/${_.kebabCase(navTags[0])}/`}
              >
                {_.isArray(seo.post.frontmatter.category_top_level)
                  ? seo.post.frontmatter.category_top_level[0]
                  : ""}
              </Link>
              <header
                className="flex y-center x-right gap-1 s-column s-x-left"
                style={{ marginBlock: 28 }}
              >
                <div className="flex y-center gap-0n5 full-w">
                  <Link to={author.node.fields.slug}>
                    <Img
                      src={author.node.frontmatter.image}
                      h={70}
                      w={70}
                      className="mr-0n5 radius-50"
                      alt={author.node.frontmatter.name}
                    />
                  </Link>
                  <div className="flex column full-w">
                    <Link
                      className="label bold f-secondary txt-base-200"
                      to={author.node.fields.slug}
                    >
                      {author.node.frontmatter.name}
                    </Link>
                    <div className="full-w flex x-space-between">
                      <Link
                        to={author.node.fields.slug}
                        className="body-1 txt-grey-200"
                      >
                        {author.node.frontmatter.position}
                      </Link>
                      <span className="flex y-center body-1 txt-grey-400 text-right s-d-none events-none">
                        Updated: {seo.post.frontmatter.date}{" "}
                        {seo.timeToRead && <Bullet className="txt-grey-200" />}{" "}
                        {seo.timeToRead} min read
                      </span>
                    </div>
                  </div>
                </div>
              </header>
              <span className="body-1 flex y-center txt-grey-400 desk-d-none mb-1">
                {seo.post.frontmatter.date}{" "}
                {seo.timeToRead && <Bullet className="txt-grey-200" />}{" "}
                {seo.timeToRead} min read{" "}
              </span>
            </section>
          </header>
          <section className="grid cols-4 container below-600-full-w overflow-visible">
            <div className="full-h below-1200-d-none">
              <ArticleOverview
                className="article-overview-desktop"
                toc={seo.toc}
                authorLinks={author.node.frontmatter}
              />
            </div>
            <div className="col-span-3 below-1200-col-span-4">
              <div className="relative">
                <Img src={seo.post.frontmatter.thumbnail} maxH={460} />
                <ArticleOverview
                  className="above-1200-d-none"
                  toc={seo.toc}
                  authorLinks={author.node.frontmatter}
                  style={{ marginTop: 28 }}
                />
              </div>
              <div
                className="post container pt-2-p px-0 flow js-anchor-target-blank"
                dangerouslySetInnerHTML={{ __html: seo.post.html }}
              />
              <div className="flex gap-2">
                {restTags.map((t) => (
                  <Link
                    key={_.kebabCase(t)}
                    to={`/categories/${_.kebabCase(t)}/`}
                  >
                    <div
                      key={t}
                      style={{ padding: "8px 12px" }}
                      className="bg-success-100 flex y-center body-1"
                    >
                      {_.capitalize(t)}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="l-d-none border-top pt-2 mt-2 pb-2 s-pb-0 flex gap-1n5 y-center s-p-0 s-mt-1">
                {medias}
              </div>
            </div>
          </section>
        </main>
        <div className="full-w related-articles not-desk-mt-2">
          <Banner banner="discover" className="l-my-3" />
          <section
            className="container pt-2 below-600-d-none"
            aria-label="Also read related articles"
          >
            <span className="h2 flex x-space-between mb-2 m-pt-2">
              Also read related articles
            </span>
            <Slider
              className="pb-4"
              slidesToShow={3}
              slidesToScroll={2}
              infinite
              variableWidth
              responsive={[
                {
                  breakpoint: 900,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: true,
                  },
                },
              ]}
            >
              {pageContext.relatedPosts.map(({ node }) => (
                <Card
                  key={node.frontmatter.title}
                  link={node.fields.slug}
                  thumbnail={node.frontmatter.thumbnail}
                  title={node.frontmatter.title}
                  category_top_level={node.frontmatter.category_top_level}
                  date={node.frontmatter.date}
                  readingTime={node.frontmatter.reading_time}
                />
              ))}
            </Slider>
          </section>
        </div>
      </div>
    </RootLayout>
  );
};

export default BlogPost;

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      tableOfContents
      timeToRead
      frontmatter {
        author
        category
        category_top_level
        category_second_level
        date(formatString: "DD MMMM, YYYY")
        json_ld
        meta_description
        meta_keywords
        tags
        thumbnail
        title
      }
      fields {
        thumbnailObject {
          src
          width
          height
        }
      }
      excerpt
    }

    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`;
