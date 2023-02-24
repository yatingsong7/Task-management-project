import React, { FC, ReactElement } from "react";
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";

const SelectorInput: FC = (): ReactElement => {
  return (
    <FormControl
      fullWidth
      sx={{
        "& label": { color: "text.primary" },
        "& label.Mui-focused": { color: "primary.main" },
        "& label:hover": { color: "primary.main" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "text.primary" },
          "&:hover fieldset": { color: "primary.main", borderColor: "primary.main" },
          "&.Mui-focused fieldset": { color: "primary.main", borderColor: "primary.main" },
        },
      }}>
      <InputLabel id="priority-label">Priority</InputLabel>
      <Select
        labelId="priority-label"
        id="priority"
        value={"todo"}
        label="Priority"
        onChange={(e: SelectChangeEvent) => console.log(e)}>
        <MenuItem value={"todo"}>To Do</MenuItem>
        <MenuItem value={"inProgress"}>In Progress</MenuItem>
        <MenuItem value={"Done"}>Done</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectorInput;
