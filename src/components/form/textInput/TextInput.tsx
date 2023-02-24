import React, { FC, ReactElement } from "react";
import { TextField } from "@mui/material";

const TextInput: FC = (): ReactElement => {
  return (
    <TextField
      id="Task Title"
      label="Task Title"
      variant="outlined"
      sx={{
        "& label": { color: "text.primary" },
        "& label.Mui-focused": { color: "primary.main" },
        "& label:hover": { color: "primary.main" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "text.primary" },
          "&:hover fieldset": { color: "primary.main", borderColor: "primary.main" },
          "&.Mui-focused fieldset": { color: "primary.main", borderColor: "primary.main" },
        },
        width: "100%",
      }}
    />
  );
};

export default TextInput;
