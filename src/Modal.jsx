import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";

export const MyVerticallyCenteredModal = (props) => {
  const [name, setName] = useState("");

  function handleStartGame() {
    if (name.trim() !== "") {
      localStorage.setItem("playerName", name);
      localStorage.setItem("playerScore", 0);
      props.onHide();
    }
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter your Name
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="mx-5">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Name"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleStartGame} variant="primary" type="submit">
          Start Game
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
