import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import { FC, ReactElement, useContext, useEffect, useRef, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
import { ViewTaskContext } from "../../context/ViewTaskContext";
import { api } from "../../utilities/api";
import TextArea from "../form/_TextArea";
import TextInput from "../form/_TextInput";
import ToDoInput from "./_ToDoInput";

const EditPanel: FC = (): ReactElement => {
  const viewTaskContext = useContext(ViewTaskContext);
  const taskContext = useContext(TaskContext);
  const [editDescription, setEditDescription] = useState<boolean>(false);
  const [description, setDescription] = useState<string | undefined>(viewTaskContext.task.description);
  const [note, setNote] = useState<string | undefined>();
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
        const response: any = await api("/tasks/" + viewTaskContext.task.id, "PUT", { description: description });
        if (response.affected !== 0) {
          taskContext.toggle();
          viewTaskContext.task.description = description;
        }
      } catch (err) {
        console.log(err);
      } finally {
        setEditDescription(false);
      }
    }
  };

  const addNote = async () => {
    if (note) {
      try {
        const response: any = await api("/tasks/" + viewTaskContext.task.id + "/notes", "POST", { content: note });

        if (response.affected !== 0) {
          viewTaskContext.refresh(viewTaskContext.task.id);
          setNote("");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const deleteNote = async (id: number) => {
    try {
      const response: any = await api("/tasks/" + viewTaskContext.task.id + "/notes/" + id, "DELETE");
      if (response.affected !== 0) {
        viewTaskContext.refresh(viewTaskContext.task.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveToDo = async (todo: string, order: number | undefined) => {
    if (todo) {
      try {
        const response: any = await api("/tasks/" + viewTaskContext.task.id + "/todos", "POST", {
          title: todo,
          position: order && order,
        });

        if (response.affected !== 0) {
          viewTaskContext.refresh(viewTaskContext.task.id);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Box display="flex" flexDirection="row" marginTop={2}>
      <Box marginRight={2} width="1000px">
        <Typography variant="h4" fontWeight={700} mt={2} textAlign="center">
          {viewTaskContext.task.title}
        </Typography>
        <Typography variant="h5" mt={4}>
          <b>Due Date: </b>
          {viewTaskContext.task.date && format(new Date(viewTaskContext.task.date), "dd MMM yyyy")}
        </Typography>
        <Typography variant="h5" mt={2}>
          <b>Status: </b>
          {viewTaskContext.task.status}
        </Typography>
        <Typography variant="h5" mt={2}>
          <b>Priority: </b>
          {viewTaskContext.task.priority}
        </Typography>{" "}
        <Typography variant="h5" mt={2}>
          <b>
            Description: <EditIcon sx={{ paddingTop: "3px", cursor: "pointer" }} onClick={openDescriptionBox} />
          </b>
        </Typography>
        {!editDescription && (
          <Typography variant="h6" m={2} mt={1}>
            {viewTaskContext.task.description}
          </Typography>
        )}
        {editDescription && (
          <div style={{ position: "relative", marginTop: "15px", marginRight: "10px" }} ref={ref}>
            <TextArea
              label=""
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              defaultContent={viewTaskContext.task.description}
            />
            <DoneIcon
              fontSize="large"
              sx={{ position: "absolute", bottom: "10px", right: "10px", cursor: "pointer" }}
              onClick={saveEdit}
            />
          </div>
        )}
        <Typography variant="h5" mt={4}>
          <b>
            Pre-requisite tasks: <EditIcon sx={{ paddingTop: "3px", cursor: "pointer" }} onClick={openDescriptionBox} />
          </b>
        </Typography>
        <Typography variant="h5" mt={4}>
          <b>To do list: </b>
          <ToDoInput handleSave={handleSaveToDo} />
        </Typography>
        <Box mt={4}>
          <Typography variant="h5">
            <b>Notes: </b>
          </Typography>
          <div style={{ position: "relative" }}>
            <TextInput
              label=""
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
              inputProps={{ style: { padding: 8 } }}
            />
            <EditIcon
              sx={{ position: "absolute", right: "10px", bottom: "8px", cursor: "pointer" }}
              onClick={addNote}
            />
          </div>
          <Box>
            {viewTaskContext.task.notes &&
              viewTaskContext.task.notes.map((m, i) => {
                return (
                  <Box
                    display="flex"
                    flexDirection="column"
                    paddingX={2}
                    paddingY={1}
                    marginY={1}
                    borderRadius={1}
                    sx={{ backgroundColor: "#5C469C" }}
                    key={i}
                  >
                    <Typography fontSize={18}>{m.content}</Typography>
                    <small style={{ alignSelf: "end", fontStyle: "italic" }}>
                      {format(new Date(m.date), " dd MMM yyyy - HH:mm:ss")}
                      <span
                        style={{ marginLeft: "15px", textDecoration: "underline", cursor: "pointer" }}
                        onClick={() => deleteNote(m.id)}
                      >
                        Delete
                      </span>
                    </small>
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditPanel;
