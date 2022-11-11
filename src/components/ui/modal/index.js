import React from "react";

import modal from "./styles.module.scss";

const Modal = ({ body, onClose, isStatic, isVisible, ...props }) => (
  <div className={modal.fullScreenWrapper} {...props}>
    <div className={modal.backdrop} onClick={isStatic ? () => null : onClose} />
    <div className={modal.window}>{body}</div>
  </div>
);

export default Modal;
