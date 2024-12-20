import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import { FC, ReactElement, useContext, useEffect, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
import { api } from "../../utilities/api";
import DateInput from "./_DateInput";
import SelectorInput from "./_SelectorInput";
import TextArea from "./_TextArea";
import TextInput from "./_TextInput";
import { PRIORITY } from "./enums/PRIORITY";
import { STATUS } from "./enums/STATUS";

const CreateTaskForm: FC = (): ReactElement => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [desc, setDesc] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<Date | null | undefined>(new Date());
  const [priority, setPriority] = useState<PRIORITY>(PRIORITY.low);
  const [status, setStatus] = useState<STATUS>(STATUS.todo);
  const [error, setError] = useState<string | undefined>(undefined);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const taskContext = useContext(TaskContext);

  const handleBtnClick = async () => {
    if (!title) {
      setError("Please enter a title");
      return;
    }

    if (!date) {
      setError("Please choose a date");
      return;
    }

    const task = { title: title, description: desc, date: date, priority: priority, status: status };
    const response = await api("/tasks", "POST", task);
    if (response) {
      setShowSuccess(true);
      setTitle(undefined);
      setDesc(undefined);
      taskContext.toggle();
    }
  };

  useEffect(() => {
    if (showSuccess) {
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
    return () => {};
  }, [showSuccess]);

  return (
    <Box my={20}>
      <Stack spacing={3}>
        <Typography sx={{ textTransform: "uppercase", textAlign: "center" }} fontWeight={700} fontSize={35}>
          Create a task
        </Typography>

        <TextInput label="Task Title" onChange={(e) => setTitle(e.target.value)} value={title} />

        <TextArea label="Description" onChange={(e) => setDesc(e.target.value)} />

        <DateInput onChange={(date) => setDate(date)} value={date} label="Due Date" />

        <Box display="flex" flexDirection="row" gap={1}>
          <SelectorInput
            label="Status"
            labelId="status-label"
            id="status"
            value={status}
            options={[
              { label: STATUS.todo.toUpperCase(), value: STATUS.todo },
              { label: STATUS.inprogress.toUpperCase(), value: STATUS.inprogress },
              { label: STATUS.completed.toUpperCase(), value: STATUS.completed },
            ]}
            onChange={(e) => setStatus(e.target.value as STATUS)}
          />
          <SelectorInput
            label="Priority"
            labelId="priority-label"
            id="priority"
            value={priority}
            options={[
              { label: PRIORITY.low.toUpperCase(), value: PRIORITY.low },
              { label: PRIORITY.medium.toUpperCase(), value: PRIORITY.medium },
              { label: PRIORITY.high.toUpperCase(), value: PRIORITY.high },
            ]}
            onChange={(e) => setPriority(e.target.value as PRIORITY)}
          />
        </Box>
        <Button variant="contained" size="large" onClick={handleBtnClick}>
          Create a Task
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
        {showSuccess && <Alert severity="success">Task created</Alert>}
      </Stack>
    </Box>
  );
};

export default CreateTaskForm;
