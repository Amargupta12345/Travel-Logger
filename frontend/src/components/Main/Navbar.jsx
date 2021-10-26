import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyle = makeStyles({
  header: {
    background: "#111111",
  },
  tabs: {
    color: "#FFFFFF",
    marginRight: 20,
    textDecoration: "none",
    fontSize: 20,
  },
});

const NavBar = () => {
  const classes = useStyle();
  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar>
        <NavLink className={classes.tabs} to="/" exact>
          Travel Logger
        </NavLink>
        <NavLink className={classes.tabs} to="travel" exact>
          Travel Advisor
        </NavLink>
        <NavLink className={classes.tabs} to="location" exact>
          Weather 
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
