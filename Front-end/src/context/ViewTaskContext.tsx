import { createContext, FC, useState, ReactElement, PropsWithChildren } from "react";
import { ITaskApi } from "../components/tasksArea/interfaces/ITaskApi";
import { api } from "../utilities/api";

export const ViewTaskContext = createContext({
  task: {} as ITaskApi,
  setTask: (task: ITaskApi) => {},
  isOpen: false,
  toggleIsOpen: () => {},
  refresh: (id: number) => {},
});

export const ViewTaskContextProvider: FC<PropsWithChildren> = ({ children }): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState<ITaskApi | {}>({});

  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }
  function toggleTask(task: ITaskApi) {
    setTask(task);
  }
  async function refreshTask(id: number) {
    const task = await api("/tasks/" + id, "GET");
    if (task) {
      setTask(task);
    }
  }

  return (
    <ViewTaskContext.Provider
      value={{
        task: task as ITaskApi,
        isOpen: isOpen,
        setTask: toggleTask,
        toggleIsOpen: toggleIsOpen,
        refresh: refreshTask,
      }}
    >
      {children}
    </ViewTaskContext.Provider>
  );
};
