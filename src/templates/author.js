import React from "react";
import RootLayout from "../layouts";
import { Banner, Img, BlogPostGrid } from "../components";
import { useMedia } from "../hooks";

export default ({ location, data, pageContext: { author, posts } }) => {
  const medias = useMedia({ ids: author.node.frontmatter });

  return (
    <RootLayout className="bg-primary-500">
      <main className="pt-2">
        <section
          className="container"
          aria-label={author.node.frontmatter.description}
        >
          <div className="flex gap-2 s-column my-3">
            <Img
              src={author.node.frontmatter.image}
              style={{
                objectFit: "scale down",
              }}
              className="author-img not-desk-ml-0n5 radius-50"
            />
            <div className="l-w-70 m-w-50">
              <h1>{author.node.frontmatter.name}</h1>
              <p className="label bold f-secondary mt-0n5 mb-1 txt-grey-200">
                {author.node.frontmatter.position}
              </p>
              <span>{author.node.frontmatter.description}</span>
              <footer className="flex x-space-between mt-2 full-w">
                <div>Articles: {author.articlesCount}</div>
                <div className="flex gap-1n5 center">{medias}</div>
              </footer>
            </div>
          </div>
        </section>

        <h1 className="container overflow-hidden">
          {author.node.frontmatter.name}'s latest articles
        </h1>
        <BlogPostGrid posts={posts} className="mt-2 container" />
        <Banner banner="promote" className="mt-5" />
      </main>
    </RootLayout>
  );
};