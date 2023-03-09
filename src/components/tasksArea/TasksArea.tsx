import Grid2 from "@mui/material/Unstable_Grid2";
import React, { FC, ReactElement, useEffect, useState } from "react";
import { Alert, Box, LinearProgress, Typography } from "@mui/material";
import { format } from "date-fns";
import Progress from "../progress/Progress";
import Task from "../task/Task";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../utilities/api";
import { ITaskApi } from "./interfaces/ITaskApi";

const TasksArea: FC = (): ReactElement => {
  const { error, isLoading, data, refetch } = useQuery(["tasks"], async () => {
    return await api<ITaskApi[]>("/tasks", "GET");
  });

  return (
    <Grid2 xs={12} md={7}>
      <Box>
        <>
          <h2 style={{ marginBottom: "30px" }}>Status Of Tasks As On {format(new Date(), "PPPP")}</h2>
          {error && <Alert severity="error">There was an error fetching your tasks</Alert>}

          {!error && (
            <>
              <Progress />
              {!isLoading ? (
                data && data.length !== 0 ? (
                  data.map((d) => {
                    return (
                      <Task
                        id={d.id}
                        title={d.title}
                        date={new Date(d.date)}
                        priority={d.priority}
                        taskBody={d.description}
                        status={d.status}
                      />
                    );
                  })
                ) : (
                  <Alert severity="error">You don't have any tasks created yet.</Alert>
                )
              ) : (
                <LinearProgress />
              )}
            </>
          )}
        </>
      </Box>
    </Grid2>
  );
};

export default TasksArea;
