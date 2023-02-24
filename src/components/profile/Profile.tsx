import React, { FC, ReactElement } from "react";
import { Avatar, Typography, Box } from "@mui/material";

export const Profile: FC = (props): ReactElement => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Avatar sx={{ bgcolor: "#3A1078", width: 80, height: 80, fontSize: 35 }} src="/broken-image.jpg">
        B
      </Avatar>
      <Typography variant="h4" mt={2}>
        Bella Song
      </Typography>
      <Typography variant="h6" mt={2}>
        email address
      </Typography>
    </Box>
  );
};

export default Profile;
