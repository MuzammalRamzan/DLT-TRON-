import React, { useRef } from "react";
import {
  makeStyles,
  BottomNavigation,
  BottomNavigationAction,
  Popover,
  Box,
  useTheme,
  Grid,
  Container,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Hidden,
} from "@material-ui/core";
import clsx from "clsx";
import { Link, useHistory, useLocation, NavLink } from "react-router-dom";
import { FaUsers, FaHandHoldingUsd, FaWallet } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";

import { MdSecurity, MdSettings, MdAssessment } from "react-icons/md";
import { AiTwotoneFileText } from "react-icons/ai";
import "./index.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import store from "../../redux/store";

const useStyles = makeStyles((theme) => ({
  root: {
    textDecoration: "none",
    color: "white",
    flexGrow: 1,
    width: "100%",
    "&:focus": {
      outline: "none",
      boxShadow: "none",
      border: "none",
      textDecoration: "none",
    },
    "&:hover": {
      textDecoration: "none",
    },
  },
  navbar: {
    position: "fixed",
    bottom: "0%",
    height: "74px",
    width: "100%",
    backgroundColor: "#27273D",
    boxShadow: "0px 4px 8px #04041747 !important",
  },
  favIcon: {
    borderRadius: 100,
    zIndex: 3000,
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      width: "4rem",
      bottom: 40,
      right: 40,
    },
    [theme.breakpoints.up("sm")]: {
      position: "absolute",
      bottom: 40,
      right: 40,
    },
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      bottom: 30,
      left: 1,
    },
  },

  selected: {
    color: "white",
  },
}));

export default function BottomNav() {
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { pathname } = useLocation();
  const ids = useRef("simple-popover");
  const anchorPositions = { top: 390, left: 900 };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem("_DTL_LOGIN_ADDRESS");
    store.dispatch({
      type: "LOGOUT",
    });
    window.location.reload();
  };

  return (
    <Container className="bottom_navi_gation">
      <Hidden mdUp>
        <AppBar>
          <Grid container mx>
            <Grid item xs={12}>
              <BottomNavigation
                value={value}
                onChange={handleChange}
                className={clsx(classes.navbar)}
                showLabels
              >
                <BottomNavigationAction
                  to="/wallet"
                  component={NavLink}
                  activeClassName={classes.selected}
                  label="Wallet"
                  value="nearby"
                  icon={<FaWallet />}
                  className={clsx(classes.root)}
                />
                <BottomNavigationAction
                  to="/transactions"
                  component={NavLink}
                  activeClassName={classes.selected}
                  label="Transactions"
                  value="favorites"
                  className={clsx(classes.root)}
                  icon={<BiTransfer style={{ fontSize: 20 }} />}
                />
                <BottomNavigationAction
                  to="/stakes"
                  component={NavLink}
                  activeClassName={classes.selected}
                  label="Stakes"
                  value="recents"
                  className={clsx(classes.root)}
                  icon={<MdSecurity style={{ fontSize: 20 }} />}
                />
                <BottomNavigationAction
                  to="/swaping"
                  component={NavLink}
                  activeClassName={classes.selected}
                  label="Swaping"
                  value="recents"
                  className={clsx(classes.root)}
                  icon={<SwapHorizIcon style={{ fontSize: 20 }} />}
                />
                <div
                  onClick={() => history.push("/")}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src="/wawelogo icon.png"
                    style={{
                      position: "relative",
                      top: -8,
                      width: "50px",
                      boxShadow:
                        "0 3px 6px rgba(0, 0, 0, .3), inset 0 0 10px 3px rgba(0, 0, 0, .2), 0 3px 20px #f6597282, 0 3px 35px rgba(250, 95, 59, 0.48)",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <BottomNavigationAction
                  to="/withdraw"
                  component={NavLink}
                  activeClassName={classes.selected}
                  label="Withdraw"
                  value="nearby"
                  icon={<MdSecurity style={{ fontSize: 20 }} />}
                  className={clsx(classes.root)}
                />
                <BottomNavigationAction
                  aria-describedby={ids}
                  onClick={handleLogout}
                  label="Logout"
                  value="folder"
                  icon={<ExitToAppIcon style={{ fontSize: 20 }} />}
                  className={clsx(classes.root, { [classes.selected]: open })}
                />
              </BottomNavigation>
            </Grid>
          </Grid>
        </AppBar>
      </Hidden>
    </Container>
  );
}
