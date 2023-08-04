import "./App.css";

import { Button, Modal } from "flowbite-react";

import { AppContext } from "./api/context";
import { Outlet } from "react-router-dom";
import React from "react";
import { Types } from "./api/reducer";

function App() {
  const {
    dispatch,
    state: { modal },
  } = React.useContext(AppContext);

  function closeModal() {
    dispatch({
      type: Types.close,
      payload: {
        ...modal,
        type: "Success",
        buttonOK: "OK",
        show: false,
      },
    });
  }

  function onOk(func: () => void | undefined) {
    func();
    closeModal();
  }

  return (
    <section className="w-[98vw] 3xl:container mx-auto">
      <Modal size="md" show={modal?.show} dismissible onClose={closeModal}>
        <Modal.Header className="text-sm">{modal.header}</Modal.Header>
        <Modal.Body
          className={`text-center p-0 ${
            modal.type == "Success"
              ? "text-green-700 dark:text-green-500"
              : modal.type == "Error"
              ? "text-red-700 dark:to-green-500"
              : ""
          }`}
        >
          <span className="text-sm text-center p-4">{modal.content}</span>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button
            size="xs"
            color={modal.type == "Error" ? "failure" : "success"}
            onClick={() => onOk(modal.onOk)}
          >
            {modal.buttonOK}
          </Button>
          <Button size="xs" color="gray" onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Outlet />
    </section>
  );
}

export default App;
