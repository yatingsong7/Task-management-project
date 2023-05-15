import { FC, ReactElement, useContext, useRef, useState, useEffect } from "react";
import { EditTaskContext } from "../../context/EditTaskContext";
import { Box, Button, Typography } from "@mui/material";
import TextArea from "../form/_TextArea";
import DoneIcon from "@mui/icons-material/Done";
import { format } from "date-fns";
import { api } from "../../utilities/api";
import { TaskContext } from "../../context/TaskContext";
import EditIcon from "@mui/icons-material/Edit";

const EditPanel: FC = (): ReactElement => {
  const editTaskContext = useContext(EditTaskContext);
  const taskContext = useContext(TaskContext);
  const [editDescription, setEditDescription] = useState<boolean>(false);
  const [description, setDescription] = useState<string | undefined>(editTaskContext.task.description);
  const ref = useRef<HTMLDivElement>(null);

  const openDescriptionBox = () => {
    setEditDescription(true);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (editDescription && ref.current && !ref.current.contains(e.target as HTMLElement)) {
        setEditDescription(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [editDescription]);

  const saveEdit = async () => {
    if (description) {
      try {
        const response: any = await api("/tasks/" + editTaskContext.task.id, "PUT", { description: description });
        if (response.affected !== 0) {
          taskContext.toggle();
          editTaskContext.task.description = description;
        }
      } catch (err) {
        console.log(err);
      } finally {
        setEditDescription(false);
      }
    }
  };

  return (
    <Box display="flex" flexDirection="row" marginTop={2}>
      <Box marginRight={2} width="1000px">
        <Typography variant="h4" fontWeight={700} mt={2}>
          {editTaskContext.task.title}
        </Typography>
        <Typography variant="h5" mt={2}>
          <b>
            Description: <EditIcon sx={{ paddingTop: "3px", cursor: "pointer" }} onClick={openDescriptionBox} />
          </b>
        </Typography>
        {!editDescription && (
          <Typography variant="h6" m={2} mt={1}>
            {editTaskContext.task.description}
          </Typography>
        )}
        {editDescription && (
          <div style={{ position: "relative", marginTop: "15px", marginRight: "10px" }} ref={ref}>
            <TextArea
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              defaultContent={editTaskContext.task.description}
            />
            <DoneIcon
              fontSize="large"
              sx={{ position: "absolute", bottom: "10px", right: "10px", cursor: "pointer" }}
              onClick={saveEdit}
            />
          </div>
        )}
        <Typography variant="h5" mt={2}>
          <b>Due Date: </b>
          {editTaskContext.task.date && format(new Date(editTaskContext.task.date), "dd MMM yyyy")}{" "}
        </Typography>
        <Typography variant="h5" mt={2}>
          <b>Status: </b>
          {editTaskContext.task.status}
        </Typography>
        <Typography variant="h5" mt={2}>
          <b>Priority: </b>
          {editTaskContext.task.priority}
        </Typography>
        <Typography variant="h5" mt={2}>
          <b>Pre-requisite tasks: </b>
          {/* {editTaskContext.task.priority} */}
        </Typography>
        <Typography variant="h5" mt={2}>
          <b>To do list: </b>
          {/* {editTaskContext.task.priority} */}
        </Typography>
        <Typography variant="h5" mt={2}>
          <b>Notes: </b>
          {/* {editTaskContext.task.priority} */}
        </Typography>
      </Box>
      {/* <Box width="200px" marginTop={2}>
        <Button variant="contained" fullWidth onClick={openDescriptionBox}>
          Add Description
        </Button>
        <Button variant="contained" fullWidth sx={{ marginTop: "10px" }}>
          Add Notes
        </Button>
        <Button variant="contained" fullWidth sx={{ marginTop: "10px" }}>
          Add to-do list
        </Button>
      </Box> */}
    </Box>
  );
};

export default EditPanel;
