import React from "react";
import _ from "lodash";

import Card from "./Card";
import cn from "../utils/cn";

export default ({
  posts = [],
  className,
  span = [0],
  amount = 5,
  canLoadMore,
  ...props
}) => {
  const [postAmount, setPostAmount] = React.useState(amount);

  if (posts.length <= 0) {
    return null;
  }

  return (
    <>
      <div
        className={cn("grid cols-3 m-cols-2 s-cols-1 gap-2", className)}
        {...props}
      >
        {posts.map(
          (post, i) =>
            i + 1 <= postAmount && (
              <Card
                key={post.node.frontmatter.title}
                className={`mb-2 s-mb-0 ${
                  Array.isArray(span) &&
                  span.includes(i) &&
                  "col-span-2 s-col-span-1"
                }`}
                link={post.node.fields.slug}
                readingTime={post.node.frontmatter.reading_time}
                {...post.node.frontmatter}
              />
            )
        )}
      </div>
      {canLoadMore && postAmount < posts.length && (
        <button
          className="load-btn btn-blue full-w mt-3 s-mt-2"
          onClick={() => setPostAmount((prev) => prev + 5)}
        >
          Load more
        </button>
      )}
    </>
  );
};
