import React, { FC, ReactElement } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { ISelectField } from "./interfaces/ISelectorInput";
import PropTypes from "prop-types";

const SelectorInput: FC<ISelectField> = (props): ReactElement => {
  const {
    label = "label",
    labelId = "option-label",
    id = "Option",
    value = "Option...",
    options = [{ value: "", label: "Add Items" }],
    onChange,
  } = props;

  return (
    <FormControl
      fullWidth
      sx={{
        "& label": { color: "text.primary" },
        "& label.Mui-focused": { color: "primary.main" },
        "&:hover label": { color: "primary.main" },
        "& svg": { color: "text.primary" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "text.primary" },
          "&:hover fieldset": { color: "primary.main", borderColor: "primary.main" },
          "&.Mui-focused fieldset": { color: "primary.main", borderColor: "primary.main" },
        },
      }}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select labelId={labelId} id={id} value={value} label={label} onChange={onChange}>
        {options.map((o) => {
          return (
            <MenuItem key={o.label} value={o.value}>
              {o.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectorInput;

SelectorInput.propTypes = {
  label: PropTypes.string.isRequired,
  labelId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onChange: PropTypes.func,
};
