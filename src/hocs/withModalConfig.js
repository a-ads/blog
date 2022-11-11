import React, { cloneElement } from "react";

import { ModalCollection } from "../components";
import { Modal } from "../components/ui";

const withModalConfig = ({ id, body, ...props }) => {
  const ModalItem = ({ isVisible, ...modalBodyProps }) => {
    const onClose = () => ModalCollection.close(id);
    const BodyWithAccessToModalActions = cloneElement(body, {
      onClose,
      isVisible,
      ...body.props,
      ...modalBodyProps,
    });
    const modalProps = {
      ...props,
      body: BodyWithAccessToModalActions,
      onClose,
      isVisible,
    };

    return <Modal {...modalProps} />;
  };

  ModalItem.displayName = `${id}_modal`;
  return ModalItem;
};

export default withModalConfig;
