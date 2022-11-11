import React from "react";
import cn from "../utils/cn";

export default React.memo(
  ({
    src = "",
    desc,
    h,
    w,
    maxH,
    maxW,
    imgProps,
    style = {},
    className,
    ...props
  }) => {
    let newSrc;
    if (src.search(/^\//) >= 0) {
      newSrc = src;
    } else {
      newSrc = "/" + src;
    }

    if (process.env.NODE_ENV === "development") {
      newSrc = newSrc.replace(/^\/blog/, "");
    }

    return (
      <span
        className={cn("flex column", className)}
        style={{
          objectFit: "cover",
          maxWidth: maxW,
          ...style,
          height: h,
          width: w,
        }}
        {...props}
      >
        <img
          src={newSrc}
          className="fullsize top-0 left-0"
          style={{
            objectFit: "inherit",
            maxHeight: maxH,
            maxWidth: maxW,
            height: "inherit",
            width: "inherit",
            borderRadius: "inherit",
          }}
          alt={desc || "image"}
          {...imgProps}
        />
        {desc}
      </span>
    );
  }
);
