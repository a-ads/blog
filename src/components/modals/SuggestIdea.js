import React from "react";

import ModalCollection, { MODAL_NAMES } from "../ModalCollection";
import { withModalConfig } from "../../hocs";
import FooterModal from "./footerModal";

export default () => {
  const id = MODAL_NAMES.SuggestIdea;
  const component = withModalConfig({
    body: (
      <FooterModal
        title="Suggest your idea!"
        endpoint="/api/v1/idea_suggestions"
        submittedUIProps={{
          imgSrc: "/images/idea-icon.svg",
          title: "Your idea has been sent!",
          btnText: "Suggest another idea",
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
