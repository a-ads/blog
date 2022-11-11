import { withPrefix } from "gatsby";
import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { Img } from "../../";
import modal from "./modal.module.scss";

/**
 * Modal cmp for both Suggest Idea & Report Bug modals
 */

export const UIWhenSubmitted = ({ backToModal, imgSrc, title, btnText }) => (
  <div className="flex center column gap-1 hght-400">
    <Img
      src={withPrefix(imgSrc)}
      h={70}
      w={70}
      style={{ objectFit: "contain" }}
    />
    <h3>{title}</h3>
    <button
      className="btn bg-transparent txt-primary-200"
      onClick={backToModal}
    >
      {btnText}
    </button>
  </div>
);

export default ({
  title,
  text,
  endpoint,
  isStatic,
  onClose,
  submittedUIProps,
}) => {
  const [submitted, setSubmitted] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const csrfToken = await fetch("/api/v1/authenticity_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const tokenJson = await csrfToken.json();
    const token = tokenJson?.data?.attributes?.base64;

    await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token,
      },
    });

    setSubmitted(true);
  };

  const fieldMap = {
    title: "Title",
    text: "Message",
    email: "Email",
    name: "Your name (optional)",
  };

  return (
    <>
      <header className={modal.title}>
        {!submitted && title}
        <div
          className={modal.closeCross}
          onClick={isStatic ? () => null : onClose}
        />
      </header>
      {submitted ? (
        <div className={modal.submittedBody}>
          <UIWhenSubmitted
            backToModal={() => {
              reset();
              setSubmitted(false);
            }}
            {...submittedUIProps}
          />
        </div>
      ) : (
        <div className="bg-base-100 px-2 py-1n5">
          <span>
            <p className="body-1">Please help us to improve our service</p>
            {text}
          </span>
          <form
            className="flex column mt-0n5"
            onSubmit={handleSubmit(onSubmit)}
          >
            {Object.keys(fieldMap).map((fieldName, i) => {
              const props = {
                key: fieldName,
                type: i === 1 ? null : i === 2 ? "email" : "text",
                placeholder: fieldMap[fieldName],
                className: `modal-input mt-1 ${
                  errors[fieldName] ? "error" : ""
                }`,
                ...register(fieldName, {
                  required: i !== 3 && "This field is required",
                }),
              };
              return (
                <>
                  {i === 1 ? <textarea {...props} /> : <input {...props} />}
                  <ErrorMessage
                    errors={errors}
                    name={fieldName}
                    render={({ message }) => (
                      <p className="error-msg">{message}</p>
                    )}
                  />
                </>
              );
            })}
            <button type="submit" className="btn-blue col-2 mt-1">
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};
