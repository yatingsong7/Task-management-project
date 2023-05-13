import { createContext, FC, useState, ReactElement, PropsWithChildren } from "react";
import { ITaskApi } from "../components/tasksArea/interfaces/ITaskApi";

export const EditTaskContext = createContext({
  task: {} as ITaskApi,
  setTask: (task: ITaskApi) => {},
  isOpen: false,
  toggleIsOpen: () => {},
});

export const EditTaskContextProvider: FC<PropsWithChildren> = ({ children }): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState<ITaskApi>({} as ITaskApi);

  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }
  function toggleTask(task: ITaskApi) {
    setTask(task);
  }

  return (
    <EditTaskContext.Provider
      value={{
        task: task,
        isOpen: isOpen,
        setTask: toggleTask,
        toggleIsOpen: toggleIsOpen,
      }}
    >
      {children}
    </EditTaskContext.Provider>
  );
};
