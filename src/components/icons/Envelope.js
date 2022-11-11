import * as React from "react";

const SvgEnvelope = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21.5 9.488v8.387a2.625 2.625 0 0 1-2.625 2.625H5.125A2.625 2.625 0 0 1 2.5 17.875V9.488l9.199 5.06a.625.625 0 0 0 .602 0l9.199-5.06Zm-2.625-4.775a2.625 2.625 0 0 1 2.624 2.562L12 12.5 2.501 7.275l.001-.045a2.625 2.625 0 0 1 2.623-2.517h13.75Z"
      fill="#03A9F4"
    />
  </svg>
);

export default SvgEnvelope;
