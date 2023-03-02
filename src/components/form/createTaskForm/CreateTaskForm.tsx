import React, { FC, ReactElement } from "react";
import { Typography, Box, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import TextArea from "../textArea/TextArea";
import TextInput from "../textInput/TextInput";
import SelectorInput from "../selectorInput/SelectorInput";
import DateInput from "../dateInput/DateInput";
import { Status } from "./enums/Status";
import { Priority } from "./enums/Priority";

const CreateTaskForm = () => {
  return (
    <Box my={4}>
      <Stack spacing={3}>
        <Typography sx={{ textTransform: "uppercase" }} fontWeight={700}>
          Create a task
        </Typography>

        <TextInput />

        <TextArea />

        <DateInput />

        <Box display="flex" flexDirection="row" gap={1}>
          <SelectorInput
            label="Status"
            labelId="status-label"
            id="status"
            value={Status.todo}
            options={[
              { label: Status.todo.toUpperCase(), value: Status.todo },
              { label: Status.inProgress.toUpperCase(), value: Status.inProgress },
              { label: Status.completed.toUpperCase(), value: Status.completed },
            ]}
          />
          <SelectorInput
            label="Priority"
            labelId="priority-label"
            id="priority"
            value={Priority.low}
            options={[
              { label: Priority.low.toUpperCase(), value: Priority.low },
              { label: Priority.medium.toUpperCase(), value: Priority.medium },
              { label: Priority.high.toUpperCase(), value: Priority.high },
            ]}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default CreateTaskForm;
