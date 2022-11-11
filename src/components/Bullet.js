import React from "react";

import cn from "../utils/cn";

export default ({ className }) => (
  <span
    style={{
      display: "inline-block",
      height: ".3em",
      width: ".3em",
      background: "currentcolor",
      marginInline: 10,
    }}
    className={cn("radius-50", className)}
  />
);
