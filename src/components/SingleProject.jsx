import React, { useState } from "react";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Button } from "react-bootstrap";

const SingleProject = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [projectPic, setProjectPic] = useState("");

  const handlePictureSubmit = async (e) => {
    e.preventDefault();
    console.log(projectPic);

    console.log(props.project.ID);
    const formData = new FormData();
    formData.append("projectPic", projectPic);
    try {
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

  const handleDelete = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/projects/" + props.project.ID,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Project deleted");
        props.fetchProjects();
        props.fetchStudents();
      } else {
        console.log("Error while deleting project");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <tr>
        <td>
          <img
            src={props.project.imageUrl}
            alt="project - pic"
            width="80px"
            height="80px"
          />
          <Button onClick={handlePictureSubmit}>Upload</Button>
          <label htmlFor="file"></label>
          <input
            // style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setProjectPic(e.target.files[0])}
          />
        </td>

        <td>{props.project.name}</td>
        <td>{props.project.description}</td>
        <td>{props.project.repoURL}</td>
        <td>{props.project.liveURL}</td>
        <td
          className="d-flex justify-content-between"
          style={{ cursor: "pointer" }}
        >
          <DeleteForeverIcon onClick={handleDelete} />
          <BorderColorIcon onClick={() => setIsEdit(!isEdit)} />
        </td>
      </tr>
    </>
  );
};

export default SingleProject;
