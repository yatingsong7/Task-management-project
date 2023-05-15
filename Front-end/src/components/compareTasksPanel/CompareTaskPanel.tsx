import React, { useContext } from "react";
import { ViewTaskContext } from "../../context/ViewTaskContext";

const CompareTaskPanel = () => {
  const viewTaskContext = useContext(ViewTaskContext);
  return <div>{viewTaskContext.task.id}</div>;
};

export default CompareTaskPanel;
