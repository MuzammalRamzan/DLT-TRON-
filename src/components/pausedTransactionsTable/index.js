import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Box, Button, Typography, createMuiTheme } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { BiBasket } from "react-icons/bi";
import UnStakeModal from "../unStakeModal/unStakemodal";
import StakPopup from "../stakeModal/stakeModal";
import { UstakeToken } from "../../userDataFunctions";
// import { environment } from "../../environment";
// import TronHelper from "../../utils/TronHelper";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import SyncAltIcon from "@material-ui/icons/SyncAlt";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  box: {
    borderRadius: 50,
    width: 50,
    style: { width: "5rem", height: "5rem" },
  },

  IconSvg: {
    height: 200,
    verticalAlign: "middle",
  },

  box_Ions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "white",
    alignItems: "center",
  },

  boxColor: {
    backgroundColor: "#08d765",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "white",

    alignItems: "center",
  },

  box1: {
    // backgroundColor: "#27273d",
    // backgroundImage:
    //   "linear-gradient(90deg, rgba(57,55,62,1) 26%, rgba(54,73,108,1) 53%, rgba(28,35,47,1) 84%)",
    borderRadius: "20px",
    /* opacity: 0.9; */
    /* background-position: cover; */
    backgroundSize: "cover",
    backgroundPosition: "bottom",
  },

  Dashboard_boxButton: {
    // -webkit-appearance: "none",
    transition: "all 0.20s ease-in-out",
    backgroundImage: "linear-gradient(45deg, #93c34a 0%, #52af4c 100%)",
    border: "0",
    outline: "0",
    position: "relative",
    backgroundSize: "100% 100%",
    borderRadius: "100px",
    fontSize: "1.3rem",
    lineHeight: "1.6rem",
    fontFamily: "Source Code Pro",
    borderRadius: "2px solid blue",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    background:
      "linear-gradient(90deg, rgba(57,55,62,1) 26%, rgba(54,73,108,1) 53%",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function Stacks() {
  const classes = useStyles();

  const getReducer = useSelector((state) => state.UserReducer);

  const { allRecentStake } = getReducer;

  return (
    <div className={classes.root}>
      <Grid container alignItems="center">
        <Grid container>
          <Grid item xs={12}>
            <Box style={{ color: "white" }} m={1} className={classes.box1}>
              <Box
                className="table_top_border"
                textAlign="left"
                p={3}
                borderBottom={1}
                borderColor="red"
              >
                <Typography variant="h6"> Paused</Typography>
              </Box>

              <Box m={1}>
                <TableContainer>
                  <Table
                    className={classes.table}
                    aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>#</StyledTableCell>
                        <StyledTableCell align="right">Amount</StyledTableCell>
                        <StyledTableCell align="right">
                          Start Date
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          Due Date
                        </StyledTableCell>
                        <StyledTableCell align="right">Days</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{
                            color: "#77BD4A",
                          }}
                        >
                          Reward
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {allRecentStake.length
                        ? allRecentStake.map((i, index) => {
                            return (
                              <StyledTableRow>
                                <StyledTableCell
                                  align="left"
                                  style={{ color: "white" }}
                                >
                                  {" "}
                                  {+index + +1}{" "}
                                </StyledTableCell>
                                <StyledTableCell
                                  align="right"
                                  style={{ color: "white" }}
                                >
                                  {i.amount}
                                </StyledTableCell>
                                <StyledTableCell
                                  align="right"
                                  style={{ color: "white" }}
                                >
                                  {moment
                                    .unix(i.startDate)
                                    .format("MMM/DD/YYYY")}
                                </StyledTableCell>
                                <StyledTableCell
                                  align="right"
                                  style={{ color: "white" }}
                                >
                                  {moment
                                    .unix(i.dueDate)
                                    .add(i.daysSelected, "days")
                                    .format("MMM/DD/YYYY")}
                                </StyledTableCell>
                                <StyledTableCell
                                  align="right"
                                  style={{ color: "white" }}
                                >
                                  {i.daysSelected}
                                </StyledTableCell>
                                <StyledTableCell
                                  // align="right"
                                  style={{
                                    color: "white",
                                    textAlign: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {moment
                                      .unix(i.dueDate)
                                      .add(i.daysSelected, "days")._d ===
                                    Date() ? (
                                      <div
                                        style={{
                                          width: 8,
                                          height: 8,
                                          backgroundColor: "#82BF4A",
                                          borderRadius: "50%",
                                        }}
                                      ></div>
                                    ) : (
                                      <div
                                        style={{
                                          width: 8,
                                          height: 8,
                                          backgroundColor: "#C5485E",
                                          borderRadius: "50%",
                                        }}
                                      ></div>
                                    )}
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell
                                  // align="right"
                                  style={{
                                    color: "white",
                                    textAlign: "center",
                                    color: "#77BD4A",
                                  }}
                                >
                                  {i.reward}
                                </StyledTableCell>
                              </StyledTableRow>
                            );
                          })
                        : null}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default Stacks;
