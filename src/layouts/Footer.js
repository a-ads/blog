import React, { useEffect, useState } from "react";

import AntiAdBlockLink from "../components/AntiAdBlockLink";
import { useMedia } from "../hooks";
import { showReportBugModal, showSuggestIdeaModal } from "../components/modals";
import moment from 'moment'

export default () => {
  const medias = useMedia({
    ids: [
      "twitter",
      "fb",
      "reddit",
      "btc",
      "telegram",
      "linkedin",
      "instagram",
    ],
    size: 36,
  });
  const [seeMoreMedias, setSeeMoreMedias] = useState(false);

  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    setFormattedDate(moment.utc().format('D MMMM YYYY, HH:mm UTC'));
  }, []);

  return (
    <footer className="flex column bg-grey-300">
      <div className="container px-0 w-90 py-3 s-py-2 flex wrap l-x-space-evenly below-950-grid range-600-950-cols-3 below-600-cols-2 gap-2">
        {[
          {
            title: "Advertising",
            items: [
              // { name: 'Pay-per-Day', to: 'https://a-ads.com/campaigns/new' },
              // { name: 'Pay-for-Result', to: 'http://blog.anonymousads.com/2015/04/receive-free-traffic-pay-after-you-get.html' },
              { name: "Create Ad", to: "https://a-ads.com/campaigns/new" },
              { name: "Catalog of Ad Units", to: "https://a-ads.com/catalog" },
            ],
          },
          {
            title: "For partners",
            items: [
              { name: "Earn with us", to: "https://a-ads.com/ad_units/new" },
              {
                name: "Affiliate campaigns",
                to: "https://a-ads.com/affiliate_programs",
              },
              {
                name: "Our affiliate program",
                to: "https://a-ads.com/campaigns/1/rewards",
              },
            ],
          },
          {
            title: "Company",
            items: [
              { name: "Blog", to: "https://a-ads.com/blog/" },
              { name: "About us", to: "https://a-ads.com/about_us" },
              { name: "Contacts", to: "https://a-ads.com/contact_us" },
            ],
          },
          {
            title: "Information",
            items: [
              {
                name: "Terms of Service",
                to: "https://a-ads.com/terms_of_service",
              },
              {
                name: "Privacy Policy",
                to: "https://a-ads.com/privacy_policy",
              },
              { name: "Statistics", to: "https://a-ads.com/stats" },
            ],
          },
          {
            title: "Service",
            items: [
              { name: "Get Help", to: "https://help.a-ads.com/en/" },
              { name: "Report a bug", onClick: showReportBugModal },
              { name: "Suggest an idea", onClick: showSuggestIdeaModal },
              { name: "Status Page", to: "https://status.a-ads.com/en/" },
            ],
          },
        ].map(({ title, items }) => (
          <div key={title} className="flex column s-full-w">
            <span className="body-2 mb-12px txt-primary-200 bold f-secondary full-w flex">
              {title}
            </span>
            {items.map((i) => (
              <li
                key={i.name}
                className="footer-link txt-grey-200 hover pointer s-d-block"
              >
                {i.to ? (
                  <AntiAdBlockLink
                    href={i.to}
                    className="bg-transparent txt-grey-200 hover"
                  >
                    {i.name}
                  </AntiAdBlockLink>
                ) : (
                  <button
                    className="bg-transparent pointer txt-grey-200 hover"
                    onClick={i.onClick}
                  >
                    {i.name}
                  </button>
                )}
              </li>
            ))}
          </div>
        ))}
      </div>
      <div className="flex y-center gap-1n5 container mb-2 s-d-none">
        {medias}
        <span className="footer-date l-ml-2">{formattedDate}</span>
      </div>
      <span className="footer-date desk-d-none full-w text-center mb-2">
        {formattedDate}
      </span>
      <div
        className={`flex y-center gap-1n5 container mb-2 s-wrap desk-d-none ${
          seeMoreMedias ? "x-center" : ""
        }`}
      >
        {medias.map((m, i) =>
          React.cloneElement(m, {
            ...m.props,
            style: i > 2 && !seeMoreMedias ? { display: "none" } : {},
          })
        )}
        {!seeMoreMedias && (
          <button
            className="txt-primary-200 bg-transparent"
            style={{ fontSize: 16 }}
            onClick={() => setSeeMoreMedias(true)}
          >
            See more
          </button>
        )}
      </div>
      <span className="body-1 txt-grey-200 flex center line-h-2 text-center container full-w">
        The best advertising network with a great number of crypto currencies:
        {/* <br className='s-d-none' /> */} bitcoin, ethereum, litecoin,
        dogecoin, dash etc
        <br />
      </span>
      <span className="pt-0n5 pb-1 text-center body-1 txt-grey-200">
        &copy; A-ADS 2011-2022
      </span>
      {/* <span className='not-desk-d-none body-1 txt-grey-200 container full-w hght-50 flex center' style={{ marginBlock: '.5rem' }}>
            Select part of the text and press Ctrl+Enter to report an error.
        </span> */}
    </footer>
  );
};
