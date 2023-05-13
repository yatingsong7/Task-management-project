import React, { FC, ReactElement, useContext, useEffect, useState } from "react";
import { EditTaskContext } from "../../context/EditTaskContext";

const EditPanel: FC = (): ReactElement => {
  const editTaskContext = useContext(EditTaskContext);

  return <div>{editTaskContext.task.id}</div>;
};

export default EditPanel;
