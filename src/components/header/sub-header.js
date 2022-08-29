import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  makeStyles,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Done } from "@material-ui/icons";
import { logDOM } from "@testing-library/react";
import { useSelector } from "react-redux";
import { environment } from "../../environment";
import { contractAddress } from "../../utils/constants";
const useStyles = makeStyles((theme) => ({
  Hcontainer: {
    display: "flex",
  },
  box: {
    paddingTop: 10,
    paddingBlockStart: 10,
    // paddingLeft: 20,
    // paddingRight: 20
  },
  btn: {
    backgroundColor: "#1282C2",
    borderRadius: 20,
    fontSize: 10,
    float: "right",
    color: "white",
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
    "&:hover": {
      backgroundColor: "#1282C2",
    },
    [theme.breakpoints.down("md")]: {
      float: "left",
      marginTop: 15,
    },
  },
  btnRef: {
    // float: "right",
    // marginRight: 10,
    color: "#ffff",

    // background: "linear-gradient(90deg, rgba(80,55,62,2) 26%, rgba(54,73,108,1) 53%, rgba(50,35,47,1) 84%)",
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
    [theme.breakpoints.down("md")]: {
      float: "left",
      marginTop: 15,
    },
    [theme.breakpoints.down("md")]: {
      float: "left",
      marginTop: 15,
    },
  },
  contactBox: {
    borderRadius: 0,
    transition: "all 0.20s ease-in-out",
    backgroundImage: "linear-gradient(45deg,#08d765 0%, #08d765 100%)",
    // boxShadow:
    //   "0 3px 6px rgba(0, 0, 0, .3), inset 0 0 10px 3px rgba(0, 0, 0, .2), 0 3px 20px #f6597282, 0 3px 35px rgba(250, 95, 59, 0.48)",

    backgroundSize: "ceover",
    backgroundColor: "#08d765",
    // width: "max-content",
    opacity: 0.8,
    position: "relative",
    textAlign: "center",
    justifyContent: "center",
  },

  Dashboard_boxButton: {
    // -webkit-appearance: "none",
    border: "0",
    outline: "0",
    // position: "relative",
    background:
      "linear-gradient(90deg, rgba(80,55,62,2) 26%, rgba(54,73,108,1) 53%, rgba(50,35,47,1) 84%)",
    // backgroundSize: "100% 100%",
    // borderRadius:"100px",
    fontSize: "1.3rem",
    lineHeight: "1.6rem",
    fontFamily: "Source Code Pro",
    borderRadius: "2px solid blue",
  },

  item2: {
    order: 3,
    [theme.breakpoints.up("sm")]: {
      order: 2,
    },
  },
  RLogo: {
    order: 2,
    [theme.breakpoints.up("sm")]: {
      order: 3,
    },
  },

  item3: {
    order: 3,
    [theme.breakpoints.up(780)]: {
      order: 3,
    },
  },
}));

function SubHeader() {
  const classes = useStyles();

  const [price1, setV1Price] = useState(0);
  const [price2, setV2Price] = useState(0);
  const isActive = useMediaQuery("(min-width:600px)");
  const getReducer = useSelector((state) => state.UserReducer);
  const { userAccountAddress } = getReducer;

  useEffect(() => {
    setV1Price(localStorage.getItem("chargeV1"));
    setV2Price(localStorage.getItem("chargeV2"));
  }, [localStorage.getItem("chargeV1"), localStorage.getItem("chargeV2")]);
  return (
    <Grid container alignItems="center">
      <Grid item lg={6} xs={12} md={6} sm={12} className="box">
        <Box display="flex" className={classes.box1} m={1}>
          {window.location.pathname !== "/swaping" ? (
            <Box
              style={{ width: "100%", justifyContent: "center" }}
              p={1}
              display="flex"
              flexDirection="row"
              className={classes.contactBox}
            >
              <p className="white m-0">
                Contact Address:&nbsp;
                <a
                  style={{ color: "#fff", textDecoration: "none" }}
                  target="_blank"
                  href={`https://shasta.tronscan.org/#/contract/${contractAddress}`}
                >
                  {contractAddress.slice(0, 8) +
                    "..." +
                    contractAddress.slice(
                      contractAddress.length - 6,
                      contractAddress.length
                    )}
                </a>
              </p>
            </Box>
          ) : (
            <Box
              style={{
                width: "100%",
                justifyContent: "center",
                color: "white",
              }}
              p={1}
              display="flex"
              flexDirection="row"
              className={classes.contactBox}
            >
              <p
                className="white m-0"
                style={{ fontSize: "20px", fontFamily: "Source Code Pro" }}
              >
                ChargeV1 price &nbsp;
              </p>
              <span
                style={{ fontSize: "20px", fontFamily: "Source Code Pro" }}
              >{` :  ${price1} trx`}</span>
            </Box>
          )}
        </Box>
      </Grid>

      <Grid item lg={6} xs={12} md={6} sm={12} className="box">
        <Box display="flex" className={classes.box1} m={1}>
          {window.location.pathname !== "/swaping" ? (
            <Box
              style={{
                width: "100%",
                justifyContent: "center",
                color: "white",
              }}
              p={1}
              display="flex"
              flexDirection="row"
              className={classes.contactBox}
            >
              Your Wallet Address:{" "}
              {userAccountAddress
                ? userAccountAddress.slice(0, 8) +
                  "..." +
                  userAccountAddress.slice(
                    userAccountAddress?.length - 6,
                    userAccountAddress?.length
                  )
                : "..."}
            </Box>
          ) : (
            <Box
              style={{
                width: "100%",
                justifyContent: "center",
                color: "white",
              }}
              p={1}
              display="flex"
              flexDirection="row"
              className={classes.contactBox}
            >
              <p
                className="white m-0"
                style={{ fontSize: "20px", fontFamily: "Source Code Pro" }}
              >
                ChargeV2 price &nbsp;
              </p>
              <span
                style={{ fontSize: "20px", fontFamily: "Source Code Pro" }}
              >{`  :  ${price2} trx`}</span>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default SubHeader;
