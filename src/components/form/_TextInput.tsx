import React, { FC, ReactElement } from "react";
import { TextField } from "@mui/material";
import { IInputField } from "./interfaces/IInputField";
import PropTypes from "prop-types";

const TextInput: FC<IInputField> = (props): ReactElement => {
  const { onChange = (e) => console.log(e.target.value) } = props;
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
      onChange={onChange}
    />
  );
};

export default TextInput;

TextInput.propTypes = {
  onChange: PropTypes.func,
};
