import React from "react";
import { Button, Modal } from "react-bootstrap";

const ProfilePictureModal = (props) => {
  const handlePictureSubmit = async (e) => {
    console.log(props.file);
    console.log(props.student.ID);
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("profilePic", props.file);

      const response = await fetch(
        `http://localhost:3001/students/${props.student.ID}/uploadPhoto`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        console.log("Profile pic uploaded successfully");
        props.fetchStudents();
        props.fetchProjects();
      } else {
        console.log("Error while adding profile pic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Choose file</Modal.Title>
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

export default ProfilePictureModal;
