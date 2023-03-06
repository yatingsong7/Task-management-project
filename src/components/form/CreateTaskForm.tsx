import React, { FC, ReactElement } from "react";
import { Typography, Box, Stack } from "@mui/material";
import TextArea from "./_TextArea";
import TextInput from "./_TextInput";
import SelectorInput from "./_SelectorInput";
import DateInput from "./_DateInput";
import { STATUS } from "./enums/STATUS";
import { PRIORITY } from "./enums/PRIORITY";

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
            value={STATUS.todo}
            options={[
              { label: STATUS.todo.toUpperCase(), value: STATUS.todo },
              { label: STATUS.inProgress.toUpperCase(), value: STATUS.inProgress },
              { label: STATUS.completed.toUpperCase(), value: STATUS.completed },
            ]}
          />
          <SelectorInput
            label="Priority"
            labelId="priority-label"
            id="priority"
            value={PRIORITY.low}
            options={[
              { label: PRIORITY.low.toUpperCase(), value: PRIORITY.low },
              { label: PRIORITY.medium.toUpperCase(), value: PRIORITY.medium },
              { label: PRIORITY.high.toUpperCase(), value: PRIORITY.high },
            ]}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default CreateTaskForm;
