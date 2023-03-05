import { FC, ReactElement, useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui//x-date-pickers/LocalizationProvider";
import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Dayjs } from "dayjs";
import { TextFieldProps as MuiTextFieldPropsType } from "@mui/material/TextField";

const DateInput: FC = (): ReactElement => {
  const [value, setValue] = useState<Dayjs | null>();

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label="Date"
        inputFormat="dd-MM-yyyy"
        value={value}
        onChange={handleChange}
        renderInput={(params: MuiTextFieldPropsType) => (
          <TextField
            {...params}
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
        )}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
