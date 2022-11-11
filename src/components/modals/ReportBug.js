import React from "react";

import ModalCollection, { MODAL_NAMES } from "../ModalCollection";
import { withModalConfig } from "../../hocs";
import FooterModal from "./footerModal";

export default () => {
  const id = MODAL_NAMES.ReportBug;
  const component = withModalConfig({
    body: (
      <FooterModal
        title="Report a bug"
        text={
          <p className="body-1">
            See our{" "}
            <a
              href="https://a-ads.com/blog/bug-bounty-program/"
              className="txt-primary-200"
            >
              Bug Bounty Program
            </a>
          </p>
        }
        endpoint="/api/v1/bug_reports"
        submittedUIProps={{
          imgSrc: "/images/report-bug.svg",
          title: "Your bug has been sent!",
          btnText: "Report another bug",
        }}
      />
    ),
    id,
  });

  ModalCollection.open({
    component,
    id,
  });
};
