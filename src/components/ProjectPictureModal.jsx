import React from "react";
import { Button, Modal } from "react-bootstrap";

const ProjectPictureModal = (props) => {
  const handlePictureSubmit = async (e) => {
    e.preventDefault();
    console.log(props.file);
    console.log(props.project.ID);
    try {
      const formData = new FormData();
      formData.append("projectPic", props.file);

      const response = await fetch(
        `http://localhost:3001/projects/${props.project.ID}/uploadPhoto`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        console.log("Project pic uploaded successfully");
        props.fetchProjects();
      } else {
        console.log("Error while adding project pic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Choose Project picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="text-center"
            style={{ color: "blue", cursor: "pointer" }}
          >
            {props.file.name}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary" onClick={handlePictureSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProjectPictureModal;
