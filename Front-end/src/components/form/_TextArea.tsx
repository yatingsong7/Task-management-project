import React, { FC, ReactElement } from "react";
import { TextField } from "@mui/material";
import { IInputField } from "./interfaces/IInputField";
import PropTypes from "prop-types";

const TextArea: FC<IInputField> = (props): ReactElement => {
  const { label = "", onChange = (e) => console.log(e.target.value), defaultContent = "" } = props;

  return (
    <TextField
      id={label}
      label={label}
      variant="outlined"
      defaultValue={defaultContent && defaultContent}
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
      multiline
      rows={4}
      onChange={onChange}
    />
  );
};

export default TextArea;

TextArea.propTypes = {
  onChange: PropTypes.func,
};
