import { Box, Button, Checkbox, Typography } from "@mui/material";
import { format } from "date-fns";
import { ReactElement, useContext, useState } from "react";
import { ViewTaskContext } from "../../context/ViewTaskContext";

const GenerateToDo = (): ReactElement => {
  const viewTaskContext = useContext(ViewTaskContext);
  const [includePre, setIncludePre] = useState<boolean>(false);
  const [includeChecked, setIncludeChecked] = useState<boolean>(false);

  return (
    <div>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
        <h2> {format(new Date(), "PPPP")}</h2>
        <Box display="flex" flexDirection="row" height={40}>
          <Button variant="contained" onClick={() => setIncludePre(!includePre)} sx={{ marginRight: "10px" }}>
            Include related Tasks?
          </Button>
          <Button variant="contained" onClick={() => setIncludeChecked(!includeChecked)}>
            Include Checked Todo?
          </Button>
        </Box>
      </Box>
      <Typography variant="h4" fontWeight={700} mt={2} textAlign="center">
        To Do List
      </Typography>

      <Box display="flex" flexDirection="column" marginX={60}>
        {includePre &&
          viewTaskContext.task.preTasks?.map((p) => (
            <>
              {p.todos.length !== 0 && (
                <Typography mt={1} fontSize={30}>
                  {p.title}
                </Typography>
              )}
              {p.todos.map((t) => {
                return !includeChecked ? (
                  t.checked === 0 && (
                    <Typography mt={1} fontSize={30}>
                      <Checkbox size="medium" checked={t.checked === 0 ? false : true} />
                      {t.title}
                    </Typography>
                  )
                ) : (
                  <Typography mt={1} fontSize={30}>
                    <Checkbox size="medium" checked={t.checked === 0 ? false : true} />
                    {t.title}
                  </Typography>
                );
              })}
            </>
          ))}
        <Typography mt={1} fontSize={30}>
          {viewTaskContext.task.title}
        </Typography>
        {viewTaskContext.task.todos?.map((t) => {
          return !includeChecked ? (
            t.checked === 0 && (
              <Typography mt={1} fontSize={30}>
                <Checkbox size="medium" checked={t.checked === 0 ? false : true} />
                {t.title}
              </Typography>
            )
          ) : (
            <Typography mt={1} fontSize={30}>
              <Checkbox size="medium" checked={t.checked === 0 ? false : true} />
              {t.title}
            </Typography>
          );
        })}
      </Box>
    </div>
  );
};

export default GenerateToDo;
