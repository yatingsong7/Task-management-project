import { Alert, Box, LinearProgress } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { FC, ReactElement, useContext, useEffect, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
import { ViewTaskContext } from "../../context/ViewTaskContext";
import { api } from "../../utilities/api";
import { STATUS } from "../form/enums/STATUS";
import Progress from "../progress/Progress";
import Task from "../task/Task";
import FilterGroup from "./_filterGroup";
import { ITaskApi } from "./interfaces/ITaskApi";

const TasksArea: FC = (): ReactElement => {
  const { error, isLoading, data, refetch } = useQuery(["tasks"], async () => {
    return await api<ITaskApi[]>("/tasks", "GET");
  });
  const [filterResults, setFilterResults] = useState<Array<ITaskApi> | undefined>(undefined);

  const taskContext = useContext(TaskContext);
  const editTaskContext = useContext(ViewTaskContext);
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
    const response: any = await api("/tasks/" + id, "PUT", { status: STATUS.completed });
    if (response.affected !== 0) {
      refetch();
    }
  };

  const handleSwitch = async (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const response: any = await api("/tasks/" + id, "PUT", {
      status: e.target.checked ? STATUS.inprogress : STATUS.todo,
    });
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

  const handleOpenEditPanel = (id: number) => {
    handleManageTask(id);
    editTaskContext.toggleIsOpen();
  };

  const handleManageTask = (id: number) => {
    editTaskContext.refresh(id);
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
                inProgressCount={countTasks(STATUS.inprogress)}
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
                        inProgress={d.status === STATUS.inprogress ? true : false}
                        handleMark={handleMark}
                        handleSwitch={handleSwitch}
                        handleDelete={handleDelete}
                        handleManageTask={handleManageTask}
                        handleOpenEditPanel={handleOpenEditPanel}
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
                        inProgress={d.status === STATUS.inprogress ? true : false}
                        handleMark={handleMark}
                        handleSwitch={handleSwitch}
                        handleDelete={handleDelete}
                        handleManageTask={handleManageTask}
                        handleOpenEditPanel={handleOpenEditPanel}
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
