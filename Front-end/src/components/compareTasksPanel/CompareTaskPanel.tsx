import { Box, Checkbox, Typography } from "@mui/material";
import { format } from "date-fns";
import { useContext } from "react";
import { ViewTaskContext } from "../../context/ViewTaskContext";

const CompareTaskPanel = () => {
  const viewTaskContext = useContext(ViewTaskContext);
  return (
    <Box
      display="flex"
      flexDirection="column"
      margin={2}
      width="460px"
      padding={2}
      borderRadius={5}
      sx={{ backgroundColor: "primary.main", color: "black" }}
    >
      <Typography variant="h4" fontWeight={700} textAlign="center">
        {viewTaskContext.task.title}
      </Typography>
      <Typography variant="h5" mt={2}>
        <b>Due Date:</b>
      </Typography>
      <Typography variant="h6" m={2} mt={1} ml={4}>
        {viewTaskContext.task.date && format(new Date(viewTaskContext.task.date), "dd MMM yyyy")}
      </Typography>
      <Typography variant="h5">
        <b>Status: </b>
        {viewTaskContext.task.status}
      </Typography>
      <Typography variant="h5" mt={2}>
        <b>Priority: </b>
        {viewTaskContext.task.priority}
      </Typography>{" "}
      <Typography variant="h5" mt={2}>
        <b>Description: </b>
      </Typography>
      <Typography variant="h6" m={2} mt={1} ml={4}>
        {viewTaskContext.task.description}
      </Typography>
      <Typography variant="h5">
        <b>To do list: </b>
        <Box display="flex" flexDirection="column">
          {viewTaskContext.task.todos && viewTaskContext.task.todos.length !== 0 ? (
            viewTaskContext.task.todos.map((t) => {
              return (
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                  key={t.id}
                  padding="1px"
                  borderRadius={2}
                >
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <Checkbox checked={t.checked === 0 ? false : true} sx={{ color: "black" }} color="success" />
                    <Typography fontSize={18} sx={{ textDecorationLine: t.checked && "line-through" }}>
                      {t.position !== 0 && t.position + ". "}
                    </Typography>
                    <Typography fontSize={18} sx={{ textDecorationLine: t.checked && "line-through" }}>
                      {t.title}
                    </Typography>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Typography variant="h6" m={2} mt={1} ml={4}>
              None
            </Typography>
          )}
        </Box>
      </Typography>
    </Box>
  );
};

export default CompareTaskPanel;
