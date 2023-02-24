import React, { FC, ReactElement } from "react";
import { Typography, Box, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import TextArea from "../textArea/TextArea";
import TextInput from "../textInput/TextInput";
import SelectorInput from "../selectorInput/SelectorInput";
import DateInput from "../dateInput/DateInput";

const CreateTaskForm = () => {
  return (
    <Box my={4}>
      <Stack spacing={2}>
        <Typography sx={{ textTransform: "uppercase" }} fontWeight={700}>
          Create a task
        </Typography>

        {/* Task Title */}
        <TextInput />

        {/* Task description */}
        <TextArea />

        {/* Due date */}
        <DateInput />

        {/* Priority & status [TO DO, In progress, Done] */}
        <Box display="flex" flexDirection="row" gap={1}>
          <SelectorInput />
          <SelectorInput />
        </Box>
      </Stack>
    </Box>
  );
};

export default CreateTaskForm;
