import Grid2 from "@mui/material/Unstable_Grid2";
import React, { FC, ReactElement, useContext, useEffect, useState } from "react";
import { Alert, Box, LinearProgress, Button } from "@mui/material";
import { format } from "date-fns";
import Progress from "../progress/Progress";
import Task from "../task/Task";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../utilities/api";
import { ITaskApi } from "./interfaces/ITaskApi";
import { STATUS } from "../form/enums/STATUS";
import { TaskContext } from "../../context/TaskContext";
import SelectorInput from "../form/_SelectorInput";
import { PRIORITY } from "../form/enums/PRIORITY";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const TasksArea: FC = (): ReactElement => {
  const { error, isLoading, data, refetch } = useQuery(["tasks"], async () => {
    return await api<ITaskApi[]>("/tasks", "GET");
  });
  const [filterResults, setFilterResults] = useState<Array<ITaskApi> | undefined>(undefined);
  const [showFilter, setShowFilter] = useState<Boolean>(false);
  const [filterByPriority, setFilterByPriority] = useState<PRIORITY | "">("");
  const [filterByDue, setFilterByDue] = useState<string>("");
  const [filterByStatus, setFilterByStatus] = useState<STATUS | "">("");

  const taskContext = useContext(TaskContext);

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

  const handleFilter = () => {
    let filterData = data;
    if (filterByStatus)
      filterData = filterData && filterData.filter((d) => d.status.toLowerCase() === filterByStatus.toLowerCase());

    if (filterByPriority)
      filterData = filterData && filterData.filter((d) => d.priority.toLowerCase() === filterByPriority.toLowerCase());

    if (filterByDue) {
      if (filterByDue === "Not due") {
        filterData = filterData && filterData.filter((d) => !d.date || new Date(d.date) > new Date());
      } else if (filterByDue === "Due today") {
        filterData = filterData && filterData.filter((d) => new Date(d.date) === new Date());
      } else if (filterByDue === "Overdue") {
        filterData = filterData && filterData.filter((d) => new Date(d.date) < new Date());
      }
    }

    setFilterResults(filterData);
  };

  return (
    <Grid2 xs={12} md={10}>
      <Box>
        <>
          <h2 style={{ marginBottom: "30px" }}>Status Of Tasks As On {format(new Date(), "PPPP")}</h2>
          {error && <Alert severity="error">There was an error fetching your tasks</Alert>}

          {!error && (
            <>
              <Progress
                todoCount={countTasks(STATUS.todo)}
                inProgressCount={countTasks(STATUS.inProgress)}
                completeCount={countTasks(STATUS.completed)}
                handleFilter={handleFilterByStatus}
              />
              <Box marginX={4} display="flex" flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ fontSize: "16px", fontWeight: "bold" }}
                  onClick={() => {
                    setShowFilter(!showFilter);
                    setFilterByDue("");
                    setFilterByPriority("");
                    setFilterByStatus("");
                  }}
                >
                  Filter by
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setFilterResults(undefined);
                  }}
                  disabled={!filterResults}
                  sx={{ fontSize: "16px", fontWeight: "bold" }}
                >
                  SHOW ALL
                </Button>
              </Box>
              {showFilter && (
                <Box marginX={4} marginTop={2} display="flex" flexDirection={"row"}>
                  <Box width="30%" mr={2}>
                    <SelectorInput
                      label="Filter by status"
                      labelId="filter-status"
                      id="filter-status"
                      value={filterByStatus}
                      options={[
                        { label: "None", value: "" },
                        { label: STATUS.todo.toUpperCase(), value: STATUS.todo },
                        { label: STATUS.inProgress.toUpperCase(), value: STATUS.inProgress },
                        { label: STATUS.completed.toUpperCase(), value: STATUS.completed },
                      ]}
                      onChange={(e) => setFilterByStatus(e.target.value as STATUS)}
                    />
                  </Box>
                  <Box width="30%" mr={2}>
                    <SelectorInput
                      label="Filter by priority"
                      labelId="filter-priority"
                      id="filter-priority"
                      value={filterByPriority}
                      options={[
                        { label: "None", value: "" },
                        { label: PRIORITY.low.toUpperCase(), value: PRIORITY.low },
                        { label: PRIORITY.medium.toUpperCase(), value: PRIORITY.medium },
                        { label: PRIORITY.high.toUpperCase(), value: PRIORITY.high },
                      ]}
                      onChange={(e) => setFilterByPriority(e.target.value as PRIORITY)}
                    />
                  </Box>
                  <Box width="30%" mr={1}>
                    <SelectorInput
                      label="Filter by due"
                      labelId="filter-due"
                      id="filter-due"
                      value={filterByDue}
                      options={[
                        { label: "None", value: "" },
                        { label: "NOT DUE", value: "Not due" },
                        { label: "DUE TODAY", value: "Due today" },
                        { label: "OVERDUE", value: "Overdue" },
                      ]}
                      onChange={(e) => setFilterByDue(e.target.value)}
                    />
                  </Box>
                  <Button color="primary" onClick={handleFilter}>
                    <FilterAltIcon fontSize="large" />
                  </Button>
                </Box>
              )}

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
