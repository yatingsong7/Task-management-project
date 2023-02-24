import React, { FC, ReactElement } from "react";
import { Typography, Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import TextArea from "../textArea/TextArea";
import TextInput from "../textInput/TextInput";
import SelectorInput from "../selectorInput/SelectorInput";
import DateInput from "../dateInput/DateInput";

const CreateTaskForm = () => {
  return (
    <Box my={4}>
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
      <Grid2 container>
        <SelectorInput />
        <SelectorInput />
      </Grid2>
    </Box>
  );
};

export default CreateTaskForm;
