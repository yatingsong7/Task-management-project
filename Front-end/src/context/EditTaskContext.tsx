import { createContext, FC, useState, ReactElement, PropsWithChildren } from "react";

export const EditTaskContext = createContext({
  isOpen: false,
  toggleIsOpen: () => {},
});

export const EditTaskContextProvider: FC<PropsWithChildren> = ({ children }): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <EditTaskContext.Provider
      value={{
        isOpen: isOpen,
        toggleIsOpen: toggleIsOpen,
      }}
    >
      {children}
    </EditTaskContext.Provider>
  );
};
