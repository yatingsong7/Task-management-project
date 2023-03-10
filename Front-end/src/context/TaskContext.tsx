import { createContext, FC, useState, ReactElement, PropsWithChildren } from "react";

export const TaskContext = createContext({
  updated: false,
  toggle: () => {},
});

export const TaskContextProvider: FC<PropsWithChildren> = ({ children }): ReactElement => {
  const [updated, setUpdated] = useState(false);

  function toggleHandler() {
    updated ? setUpdated(false) : setUpdated(true);
  }

  return (
    <TaskContext.Provider
      value={{
        updated: updated,
        toggle: toggleHandler,
      }}>
      {children}
    </TaskContext.Provider>
  );
};
