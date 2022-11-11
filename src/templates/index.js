import React from "react";
import RootLayout from "../layouts";
import BlogPostGrid from "../components/BlogPostGrid";
import Banner from "../components/Banner";
import _ from "lodash";

export default ({ pageContext }) => {
  const firstPosts = _.take(pageContext.blogPostsChunk, 5);
  const restPosts = _.drop(pageContext.blogPostsChunk, 5);

  return (
    <RootLayout className="bg-primary-500">
      <section
        className="bg-img home-page-bg-position"
        aria-label="Crypto Marketing & Trends"
      >
        <div className="container pb-3 m-pb-2 s-pb-1">
          <h1 className="home-page-y-offset">Crypto Marketing & Trends</h1>
          <BlogPostGrid posts={firstPosts} />
        </div>
        <Banner banner="discover" className="mt-1n5 mb-1n5" />
        <BlogPostGrid
          posts={restPosts}
          amount={10}
          className="container pt-3 m-pt-2 s-pt-1"
          canLoadMore
        />
      </section>
      <div className="most-popular-bg pb-2">
        <section className="container pt-5 s-pt-2n5" aria-label="Most popular">
          <h2 className="mb-2 s-mb-1n5 f-size-40px">Most popular</h2>
          <BlogPostGrid span={false} posts={pageContext.postsByPopularity} />
        </section>
      </div>
      <Banner banner="promote" />
    </RootLayout>
  );
};
