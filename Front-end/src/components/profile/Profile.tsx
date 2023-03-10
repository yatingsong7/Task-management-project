import React, { FC, ReactElement } from "react";
import { Avatar, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";

interface IProfile {
  name?: string;
  email?: string;
}

export const Profile: FC<IProfile> = (props: any): ReactElement => {
  const { name = "User", email = "user@xx.com" } = props;
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" m={3}>
      <Avatar sx={{ bgcolor: "text.secondary", width: 80, height: 80, fontSize: 35 }} src="/broken-image.jpg">
        {`${name.substring(0, 1)}`}
      </Avatar>
      <Typography variant="h5" mt={2}>
        {`Welcome, ${name}`}
      </Typography>
      <Typography mt={2}>{email}</Typography>
    </Box>
  );
};

export default Profile;

Profile.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
};