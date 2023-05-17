import DoneIcon from "@mui/icons-material/Done";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { FC, ReactElement, useState } from "react";
import TextInput from "../form/_TextInput";
import { IToDoInput } from "./interface/IToDoInput";

const ToDoInput: FC<IToDoInput> = (props): ReactElement => {
  const { handleSave } = props;
  const [todo, setTodo] = useState<string | undefined>();
  const [selectInput, setSelectInput] = useState<number>(0);

  return (
    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
      {/* <Checkbox onChange={(e)=>setCheck(e.target.checked)}/> */}
      <TextInput
        label=""
        inputProps={{ style: { padding: 8 } }}
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
      <TextField
        sx={{
          "& svg": { color: "text.primary" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "text.primary" },
            "&:hover fieldset": { color: "primary.main", borderColor: "primary.main" },
            "&.Mui-focused fieldset": { color: "primary.main", borderColor: "primary.main" },
          },
          width: "80px",
          marginX: "10px",
        }}
        select
        size="small"
        onChange={(e) => setSelectInput(Number(e.target.value))}
        value={selectInput}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((o) => {
          return (
            <MenuItem key={o} value={o} sx={{ backgroundColor: "#EBB02D", fontWeight: "bold" }}>
              {o === 0 ? "-" : o}
            </MenuItem>
          );
        })}
      </TextField>
      <Button
        variant="contained"
        size="large"
        sx={{ width: "20px", color: "white" }}
        onClick={() => {
          todo && handleSave(todo, selectInput);
          setTodo(undefined);
        }}
      >
        <DoneIcon />
      </Button>
    </Box>
  );
};

export default ToDoInput;
