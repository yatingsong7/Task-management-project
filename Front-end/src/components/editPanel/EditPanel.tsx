import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import { format } from "date-fns";
import { FC, ReactElement, useContext, useEffect, useRef, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
import { ViewTaskContext } from "../../context/ViewTaskContext";
import { api } from "../../utilities/api";
import DateInput from "../form/_DateInput";
import SelectorInput from "../form/_SelectorInput";
import TextArea from "../form/_TextArea";
import TextInput from "../form/_TextInput";
import { ITaskApi } from "../tasksArea/interfaces/ITaskApi";
import ToDoInput from "./_ToDoInput";

const EditPanel: FC = (): ReactElement => {
  const viewTaskContext = useContext(ViewTaskContext);
  const taskContext = useContext(TaskContext);
  const [editDescription, setEditDescription] = useState<boolean>(false);
  const [description, setDescription] = useState<string | undefined>(viewTaskContext.task.description);
  const [note, setNote] = useState<string | undefined>();
  const [title, setTitle] = useState<string | undefined>(viewTaskContext.task.title);
  const [editDue, setEditDue] = useState<boolean>(false);
  const [addTodo, setAddTodo] = useState<boolean>(false);
  const [newDate, setNewDate] = useState<Date | null | undefined>(viewTaskContext.task.date);
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [addRelated, setAddRelated] = useState<boolean>(false);
  const [allTasks, setAllTasks] = useState<ITaskApi[] | undefined>();
  const [selectedTask, setSelectedTask] = useState<string | undefined>();
  const ref = useRef<HTMLDivElement>(null);
  const todoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (editDescription && ref.current && !ref.current.contains(e.target as HTMLElement)) {
        setEditDescription(false);
      }
      if (addTodo && todoRef.current && !todoRef.current.contains(e.target as HTMLElement)) {
        setAddTodo(false);
      }
      if (editTitle && titleRef.current && !titleRef.current.contains(e.target as HTMLElement)) {
        setEditTitle(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [editDescription, addTodo, editTitle]);

  const saveEdit = async (value: {}) => {
    if (value) {
      try {
        const response: any = await api("/tasks/" + viewTaskContext.task.id, "PUT", value);
        if (response.affected !== 0) {
          taskContext.toggle();
          viewTaskContext.refresh(viewTaskContext.task.id);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setEditDescription(false);
        setEditDue(false);
        setEditTitle(false);
      }
    }
  };

  const addNote = async () => {
    try {
      const response: any = await api("/tasks/" + viewTaskContext.task.id + "/notes", "POST", { content: note });

      if (response.affected !== 0) {
        viewTaskContext.refresh(viewTaskContext.task.id);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setNote(undefined);
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

  const handleCheckTodo = async (checked: boolean, todoId: number) => {
    try {
      const response: any = await api("/tasks/" + viewTaskContext.task.id + "/todos/" + todoId, "PUT", {
        checked: checked ? 1 : 0,
      });

      if (response.affected !== 0) {
        viewTaskContext.refresh(viewTaskContext.task.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTodo = async (todoId: number) => {
    try {
      const response: any = await api("/tasks/" + viewTaskContext.task.id + "/todos/" + todoId, "DELETE");
      if (response.affected !== 0) {
        viewTaskContext.refresh(viewTaskContext.task.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllTask = async () => {
    const response: any = await api("/tasks", "GET");
    setAllTasks(response);
  };

  const addRelatedTask = async () => {
    try {
      const response: any = await api("/tasks/" + viewTaskContext.task.id + "/related", "POST", {
        id: selectedTask,
      });
      if (response.affected !== 0) {
        viewTaskContext.refresh(viewTaskContext.task.id);
        setSelectedTask(undefined);
        setAddRelated(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box display="flex" marginTop={2}>
      <Box width="1000px">
        <div ref={titleRef} style={{ position: "relative", marginTop: "15px" }}>
          {!editTitle && (
            <Typography variant="h4" fontWeight={700} mt={2} textAlign="center">
              {viewTaskContext.task.title}
              <EditIcon sx={{ paddingTop: "3px", cursor: "pointer" }} onClick={() => setEditTitle(true)} />
            </Typography>
          )}
          {editTitle && (
            <Box>
              <TextInput
                label=""
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title ? title : viewTaskContext.task.title}
              />
              <DoneIcon
                fontSize="large"
                sx={{ position: "absolute", bottom: "10px", right: "10px", cursor: "pointer" }}
                onClick={() => saveEdit({ title: title })}
              />
            </Box>
          )}
        </div>
        <Typography variant="h5" mt={4}>
          <b>
            Due Date: <EditIcon sx={{ paddingTop: "3px", cursor: "pointer" }} onClick={() => setEditDue(!editDue)} />
          </b>
        </Typography>
        {!editDue && (
          <Typography variant="h6" m={2} mt={1} ml={4}>
            {viewTaskContext.task.date && format(new Date(viewTaskContext.task.date), "dd MMM yyyy")}
          </Typography>
        )}
        {editDue && (
          <Box display="flex" flexDirection="row">
            <DateInput onChange={(date) => setNewDate(date)} value={newDate ? newDate : viewTaskContext.task.date} />
            <Button
              variant="contained"
              size="medium"
              sx={{ marginLeft: "10px", width: "20px", color: "white" }}
              onClick={() => saveEdit({ date: newDate })}
            >
              <DoneIcon />
            </Button>
          </Box>
        )}
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
            Description:{" "}
            <EditIcon sx={{ paddingTop: "3px", cursor: "pointer" }} onClick={() => setEditDescription(true)} />
          </b>
        </Typography>
        {!editDescription && (
          <Typography variant="h6" m={2} mt={1} ml={4}>
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
              onClick={() => saveEdit({ description: description })}
            />
          </div>
        )}
        <Typography variant="h5" mt={4}>
          <b>Related tasks:</b>
          <Box display="flex" flexDirection="column">
            <Box marginLeft={4} marginBottom={2}>
              {viewTaskContext.task.preTasks?.map((p) => {
                return <Typography fontSize={20}>{p.title}</Typography>;
              })}
            </Box>
            {addRelated && (
              <Box display="flex" flexDirection="row">
                <SelectorInput
                  label=""
                  labelId=""
                  id="related"
                  value={selectedTask || ""}
                  options={
                    allTasks
                      ? allTasks.map((t) => {
                          return { label: t.title, value: t.id.toString() };
                        })
                      : [{ value: "", label: "Add Items" }]
                  }
                  onChange={(e) => setSelectedTask(e.target.value)}
                />
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ marginLeft: "10px", width: "20px", color: "white" }}
                  onClick={() => addRelatedTask()}
                >
                  <DoneIcon />
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ marginLeft: "10px", width: "20px", color: "black" }}
                  onClick={() => {
                    setAddRelated(false);
                  }}
                >
                  <ClearIcon />
                </Button>
              </Box>
            )}

            {!addRelated && (
              <Button
                variant="contained"
                sx={{ alignSelf: "end", marginTop: "10px" }}
                onClick={() => {
                  setAddRelated(true);
                  getAllTask();
                }}
              >
                Add a related task
              </Button>
            )}
          </Box>
        </Typography>
        <Typography variant="h5" mt={4}>
          <b>To do list: </b>
          <Box display="flex" flexDirection="column">
            {viewTaskContext.task.todos &&
              viewTaskContext.task.todos.map((t) => {
                return (
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    key={t.id}
                    padding="1px"
                    borderRadius={2}
                    sx={{ "&:hover": { backgroundColor: "#5C469C" } }}
                  >
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <Checkbox
                        onChange={(e) => handleCheckTodo(e.target.checked, t.id)}
                        checked={t.checked === 0 ? false : true}
                      />
                      <Typography fontSize={18} sx={{ textDecorationLine: t.checked && "line-through" }}>
                        {t.position !== 0 && t.position + ". "}
                      </Typography>
                      <Typography fontSize={18} sx={{ textDecorationLine: t.checked && "line-through" }}>
                        {t.title}
                      </Typography>
                    </Box>

                    <Typography
                      style={{
                        fontStyle: "italic",
                        textDecoration: "underline",
                        cursor: "pointer",
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                      onClick={() => handleDeleteTodo(t.id)}
                    >
                      Delete
                    </Typography>
                  </Box>
                );
              })}
            {!addTodo && (
              <Button variant="contained" sx={{ alignSelf: "end", marginTop: "5px" }} onClick={() => setAddTodo(true)}>
                Add an item
              </Button>
            )}
            {addTodo && (
              <div ref={todoRef}>
                <ToDoInput handleSave={handleSaveToDo} />
              </div>
            )}
          </Box>
        </Typography>
        <Box mt={4}>
          <Typography variant="h5">
            <b>Notes: </b>
          </Typography>
          <div style={{ position: "relative" }}>
            <TextInput
              label=""
              value={note || ""}
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
