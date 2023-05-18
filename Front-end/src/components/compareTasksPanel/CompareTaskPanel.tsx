import { useContext } from "react";
import { ViewTaskContext } from "../../context/ViewTaskContext";
import TaskCard from "./_taskCard";

const CompareTaskPanel = () => {
  const viewTaskContext = useContext(ViewTaskContext);
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <TaskCard task={viewTaskContext.task} isMain={true} />
      {viewTaskContext.task.preTasks?.map((p) => {
        return <TaskCard task={p} isMain={false} />;
      })}
    </div>
  );
};

export default CompareTaskPanel;
