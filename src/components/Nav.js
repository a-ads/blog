import React from "react";
import { Link } from "gatsby";
import _ from "lodash";

import { Bullet } from "./";
import cn from "../utils/cn";

const Nav = ({ className, tags = [], ...props }) => {
  const _tags = ["blog", ...tags];

  return (
    <nav className={cn("full-w bg-grey-300 mt-1", className)} {...props}>
      <ul className="flex y-center wrap txt-grey-200 body-1 container px-0">
        {_tags.map(
          (tag, i) =>
            !_.isEmpty(tag) && (
              <React.Fragment key={tag}>
                {i % 2 !== 0 && <Bullet />}
                <li style={{ width: "auto" }}>
                  <Link
                    to={i === 0 ? "/" : `/categories/${_.kebabCase(tag)}`}
                    className="txt-grey-200 hover"
                  >
                    {_.capitalize(tag)}
                  </Link>
                </li>
                {i % 2 !== 0 && i + 1 !== _tags.length && <Bullet />}
              </React.Fragment>
            )
        )}
      </ul>
    </nav>
  );
};

export default Nav;
