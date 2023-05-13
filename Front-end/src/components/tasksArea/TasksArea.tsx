import Grid2 from "@mui/material/Unstable_Grid2";
import React, { FC, ReactElement, useContext, useEffect, useState } from "react";
import { Alert, Box, LinearProgress } from "@mui/material";
import { format } from "date-fns";
import Progress from "../progress/Progress";
import Task from "../task/Task";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../utilities/api";
import { ITaskApi } from "./interfaces/ITaskApi";
import { STATUS } from "../form/enums/STATUS";
import { TaskContext } from "../../context/TaskContext";
import FilterGroup from "./_filterGroup";
import { EditTaskContext } from "../../context/EditTaskContext";

const TasksArea: FC = (): ReactElement => {
  const { error, isLoading, data, refetch } = useQuery(["tasks"], async () => {
    return await api<ITaskApi[]>("/tasks", "GET");
  });
  const [filterResults, setFilterResults] = useState<Array<ITaskApi> | undefined>(undefined);

  const taskContext = useContext(TaskContext);
  const editTaskContext = useContext(EditTaskContext);
  const [editError, setEditError] = useState<string>("");

  useEffect(() => {
    refetch();
  }, [taskContext.updated]);

  const countTasks = (status: STATUS): number => {
    if (data) {
      const totalCount = data.filter((d) => d.status === status);
      return totalCount.length;
    }

    return 0;
  };

  const handleMark = async (id: number) => {
    const task = { id: id, status: STATUS.completed };
    const response: any = await api("/tasks", "PUT", task);
    if (response.affected !== 0) {
      refetch();
    }
  };

  const handleSwitch = async (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const task = { id: id, status: e.target.checked ? STATUS.inProgress : STATUS.todo };
    const response: any = await api("/tasks", "PUT", task);
    if (response.affected !== 0) {
      refetch();
    }
  };

  const handleDelete = async (id: number) => {
    const response: any = await api("/tasks", "DELETE", { id: id });
    if (response.affected !== 0) {
      refetch();
    }
  };

  const handleFilterByStatus = (status: string) => {
    const filterData = data && data.filter((d) => d.status.toLowerCase() === status.toLowerCase());
    setFilterResults(filterData);
  };

  const handleManageTask = (id: number) => {
    const task = data?.find((d: ITaskApi) => d.id === id);
    if (task) {
      editTaskContext.setTask(task);
      editTaskContext.toggleIsOpen();
    } else {
      setEditError("There was an error fetching the task");
    }
  };

  return (
    <Grid2 xs={12} md={10}>
      <Box>
        <>
          <h2 style={{ marginBottom: "30px" }}>Status Of Tasks As On {format(new Date(), "PPPP")}</h2>
          {error && <Alert severity="error">There was an error fetching your tasks</Alert>}
          {editError && <Alert severity="error">{editError}</Alert>}

          {!error && (
            <>
              <Progress
                todoCount={countTasks(STATUS.todo)}
                inProgressCount={countTasks(STATUS.inProgress)}
                completeCount={countTasks(STATUS.completed)}
                handleFilter={handleFilterByStatus}
              />
              <FilterGroup filterResults={filterResults} data={data} setFilterResults={setFilterResults} />

              {!isLoading ? (
                filterResults ? (
                  filterResults.map((d, i) => {
                    return (
                      <Task
                        id={d.id}
                        title={d.title}
                        date={new Date(d.date)}
                        priority={d.priority}
                        taskBody={d.description}
                        status={d.status}
                        key={i}
                        inProgress={d.status === STATUS.inProgress ? true : false}
                        handleMark={handleMark}
                        handleSwitch={handleSwitch}
                        handleDelete={handleDelete}
                        handleManageTask={handleManageTask}
                      />
                    );
                  })
                ) : data && data.length !== 0 ? (
                  data.map((d, i) => {
                    return (
                      <Task
                        id={d.id}
                        title={d.title}
                        date={new Date(d.date)}
                        priority={d.priority}
                        taskBody={d.description}
                        status={d.status}
                        key={i}
                        inProgress={d.status === STATUS.inProgress ? true : false}
                        handleMark={handleMark}
                        handleSwitch={handleSwitch}
                        handleDelete={handleDelete}
                        handleManageTask={handleManageTask}
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
