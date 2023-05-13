import React, { FC, ReactElement } from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import customTheme from "./theme/customeTheme";
import Dashboard from "./pages/dashboard/Dashboard";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TaskContextProvider } from "./context/TaskContext";
import { EditTaskContextProvider } from "./context/EditTaskContext";

const queryClient = new QueryClient();

const App: FC = (): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <TaskContextProvider>
          <EditTaskContextProvider>
            <Dashboard />
          </EditTaskContextProvider>
        </TaskContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
