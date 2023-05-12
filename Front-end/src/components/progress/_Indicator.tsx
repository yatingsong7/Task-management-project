import React, { FC, ReactElement } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { IIndicator, INDICATOR_COLOR } from "./interfaces/IIndicator";
import PropTypes from "prop-types";

const Indicator: FC<IIndicator> = (props): ReactElement => {
  const { color = "primary", label = "To Do", count = 0, handleFilter = () => console.log() } = props;
  return (
    <Box
      display="flex"
      flexDirection="column"
      marginX={6}
      justifyContent="center"
      alignItems="center"
      position="relative"
      sx={{ cursor: "pointer" }}
      onClick={() => handleFilter(label)}
    >
      <CircularProgress color={color} variant="determinate" value={100} size={100}></CircularProgress>
      <Typography fontWeight={700} fontSize={30} position="absolute" top={28}>
        {count}
      </Typography>
      <Typography fontWeight={700} marginTop={1} fontSize={18}>
        {label}
      </Typography>
    </Box>
  );
};

export default Indicator;

const colorType = PropTypes.oneOf(Object.values(INDICATOR_COLOR) as INDICATOR_COLOR[]);

Indicator.propTypes = {
  color: colorType.isRequired,
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};
