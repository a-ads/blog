import React from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql, withPrefix, Link } from "gatsby";
import _ from "lodash";

import Header from "./Header";
import Footer from "./Footer";
import { Icon, AntiAdBlockLink, ModalCollection } from "../components";
import { Horn, Wallet } from "../components/icons";
import { useMedia } from "../hooks";
import cn from "../utils/cn";
import "../sass/main.scss";

const AskUs = () => {
  const medias = useMedia({
    ids: ["tg", "fbmessenger", "support"],
    className: "s-x-left",
    text: true,
  });

  return (
    <div
      className="bg-grey-300 pt-3 pb-2 bb-grey-500 container"
      style={{ width: "95%" }}
    >
      <div className="flex column center l-container m-container s-x-left gap-2">
        <h2>
          <span className="txt-primary-200">Ask us</span> any questions
        </h2>
        <div className="flex s-wrap l-y-center s-column s-full-w gap-4 not-desk-gap-1n5 body-1 txt-base-200">
          {medias}
        </div>
      </div>
    </div>
  );
};

const AdvertiserBlocks = () => {
  const Bullet = (
    <div className="full-h">
      <span
        style={{
          display: "inline-block",
          height: ".5em",
          width: ".5em",
          background: "#03A9F4",
          marginInline: 10,
        }}
        className="radius-50"
      />
    </div>
  );

  return (
    <div className="bg-primary-500 l-py-5 py-3">
      <div className="flex center container s-wrap gap-2 s-px-1">
        {[
          {
            icon: <Horn />,
            title: "Get more paying customers",
            to: "https://a-ads.com/campaigns/new",
            li: [
              "CPD, CPA and Revenue sharing models",
              "Global audience coverage",
              "Payments using various cryptocurrencies",
            ],
          },
          {
            icon: <Wallet />,
            title: "Earn crypto on your website",
            to: "https://a-ads.com/ad_units/new",
            li: [
              "Simple HTML code embeddable in any website",
              "We don't collect your users' personal data",
              "Transparent payouts and live statistics",
            ],
          },
        ].map(({ icon, title, to, li }, i) => (
          <div
            key={title}
            className="flex column bg-base-100 l-col-2 m-w-40 s-full-w py-2 px-3 not-desk-px-1n5 radius-8 shadow-2 m-hght-550 m-min-wdth-350"
          >
            <Icon i={icon} size={60} className="mb-1" />
            <h3 className="my-1">{title}</h3>
            <ul className="mb-1">
              {li.map((s) => (
                <li key={s} className="flex gap-0n5 mb-12px">
                  {Bullet}
                  {s}
                </li>
              ))}
            </ul>
            <AntiAdBlockLink
              href={to}
              className="btn-blue l-w-70 mt-1n5 not-desk-mt-auto"
            >
              Become a{i === 0 ? "n advertiser" : " publisher"}
            </AntiAdBlockLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ({ children, className, ...props }) => {
  return (
    <StaticQuery
      query={graphql`
        query RootLayout {
          site {
            siteMetadata {
              title
              description
              siteUrl
            }
          }

          categoriesTopLevel: allBlogCategoriesTopLevelYaml {
            nodes {
              title
              id
              order
            }
          }

          blogPostsGroupedByCategory: allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "//(blog)//" } }
          ) {
            group(field: frontmatter___category) {
              fieldValue
            }
          }
        }
      `}
      render={(data) => (
        <>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-WGWBHFS"
              style={{
                display: "none",
                visibility: "hidden",
                height: 0,
                width: 0,
              }}
            />
          </noscript>
          <Helmet
            htmlAttributes={{
              lang: "en",
            }}
          >
            <title>{data.site.siteMetadata.title}</title>
            <meta
              name="description"
              content={data.site.siteMetadata.description}
            />
            <link
              rel="shortcut icon"
              type="image/jpg"
              href={withPrefix("/favicon.png")}
            />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="true"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Poppins:wght@500;600;700&display=swap"
              rel="stylesheet"
            />
            <script src={withPrefix("/google-tag-script.js")}></script>
            <body className={cn("bg-grey-300", className)} {...props} />
          </Helmet>
          <Header categoriesTopLevel={data.categoriesTopLevel} />
          {children}
          <ModalCollection />
          <AdvertiserBlocks />
          <AskUs />
          <Footer />
        </>
      )}
    />
  );
};
