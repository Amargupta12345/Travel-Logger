import React from "react";
import { NavLink } from "react-router-dom";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";

import useStyles from "./styles.js";

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          <NavLink className={classes.tabs} to="/" exact>
            Travel Logger
          </NavLink>
          <NavLink className={classes.tabs} to="travel" exact>
            Travel Advisor
          </NavLink>
          <NavLink className={classes.tabs} to="location" exact>
            Weather
          </NavLink>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
