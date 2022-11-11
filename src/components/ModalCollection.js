import React from "react";

export const MODAL_NAMES = {
  ReportBug: "ReportBug",
  SuggestIdea: "SuggestIdea",
};

export default class ModalCollection extends React.Component {
  static ref = null;
  state = {};

  componentDidMount() {
    ModalCollection.ref = this;
  }

  componentWillUnmount() {
    delete ModalCollection.ref;
  }

  static open = ({ component, id, props }) => {
    const reference = ModalCollection.ref;
    const modalId = id || component.displayName;

    if (reference) {
      reference.setState({
        [modalId]: { component, props, id: modalId, isVisible: true },
      });
    }
  };

  static close = (id) => {
    const reference = ModalCollection.ref;
    if (reference && id) {
      reference.setState((state) => ({
        [id]: { ...state[id], isVisible: false },
      }));
    }
  };

  render() {
    const state = ModalCollection.ref?.state;
    const modalIds = state && Object.keys(state);

    return (
      <>
        {state && modalIds?.length
          ? modalIds.map((itemId) => {
              const { component, props, isVisible, id } = state[itemId];
              const ModalElement = component;
              return isVisible ? (
                <ModalElement key={id} {...props} isVisible />
              ) : null;
            })
          : null}
      </>
    );
  }
}
