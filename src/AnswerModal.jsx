import Modal from "react-bootstrap/Modal";

export const AnswerModal = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Answer</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.answer}</Modal.Body>
    </Modal>
  );
};
