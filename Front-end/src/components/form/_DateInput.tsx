import { LocalizationProvider } from "@mui//x-date-pickers/LocalizationProvider";
import { TextField } from "@mui/material";
import { TextFieldProps as MuiTextFieldPropsType } from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import PropTypes from "prop-types";
import { FC, ReactElement } from "react";
import { IDateInput } from "./interfaces/IDateInput";

const DateInput: FC<IDateInput> = (props): ReactElement => {
  const { onChange = (date) => console.log(date), value, label = "" } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label={label}
        inputFormat="dd-MM-yyyy"
        value={value}
        onChange={onChange}
        renderInput={(params: MuiTextFieldPropsType) => (
          <TextField
            {...params}
            sx={{
              "& label": { color: "text.primary" },
              "& label.Mui-focused": { color: "primary.main" },
              "&:hover label": { color: "primary.main" },
              "& button": { color: "text.primary" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "text.primary" },
                "&:hover fieldset": { color: "primary.main", borderColor: "primary.main" },
                "&.Mui-focused fieldset": { color: "primary.main", borderColor: "primary.main" },
              },
              width: "100%",
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateInput;

DateInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.instanceOf(Date),
  label: PropTypes.string,
};
