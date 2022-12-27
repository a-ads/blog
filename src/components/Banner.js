import React from "react";
import { Link } from "gatsby";
import _ from "lodash";

export default ({
  banner,
  title,
  subtitle,
  src,
  children,
  className,
  ...props
}) => {
  const banners = React.useMemo(
    () => ({
      discover: {
        title: (
          <>
            Discover value <br className="desk-d-none" /> of crypto ads
          </>
        ),
        subtitle: (
          <>
            Boost your crypto project or earn <br className="desk-d-none" />{" "}
            bitcoin on your traffic
          </>
        ),
        btn: (
          <a href="https://a-ads.com/campaigns/new" className="btn-white">
            Become a partner
          </a>
        ),
      },
      promote: {
        title: (
          <>
            Promote A-ADS <br className="desk-d-none" /> and earn crypto
          </>
        ),
        subtitle: "Get up to 10% of referred advertisers’ spedings",
        btn: (
          <a
            href="https://a-ads.com/blog/become-our-affiliate-partner-and-take-50-of-our-fees/"
            className="btn-white"
          >
            Get a referral link
          </a>
        ),
      },
    }),
    []
  );
  const getVal = (passedCustomVal, key) =>
    passedCustomVal || _.get(banners, `${banner}.${key}`, null);

  return (
    <div
      className={`banner ${banner} txt-base-100 ${className || ""}`}
      {...props}
    >
      <div>
        <div className="flex column">
          <span>{getVal(title, "title")}</span>
          <span className="body-2">{getVal(subtitle, "subtitle")}</span>
          {getVal(children, "btn")}
        </div>
      </div>
    </div>
  );
};
