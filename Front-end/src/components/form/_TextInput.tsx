import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import { FC, ReactElement } from "react";
import { IInputField } from "./interfaces/IInputField";

const TextInput: FC<IInputField> = (props): ReactElement => {
  const { label = "", onChange = (e) => console.log(e.target.value), value = "", inputProps = {} } = props;
  return (
    <TextField
      id={label}
      label={label}
      variant="outlined"
      value={value}
      inputProps={inputProps}
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
  value: PropTypes.string,
  inputProps: PropTypes.object,
};
