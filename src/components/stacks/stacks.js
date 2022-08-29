import React, { useEffect, useState } from "react";
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
import StakPopup from "../stakeModal/stakeModal";
import UnStakeModal from "../unStakeModal/unStakemodal";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import PausedTable from "../pausedTransactionsTable";
import {
  TableFooter,
  TablePagination,
  useTheme,
  IconButton,
} from "@material-ui/core";
import {
  LastPage,
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@material-ui/icons";
import { contractAddress } from "../../utils/constants";
import TronGrid from "trongrid";

import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider || "http://localhost8545");

const useStyles2 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  table: {
    minWidth: 500,
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
    // marginLeft: 30
  },
  table: {
    backgroundColor: "#222A31 !important",
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

  // typeoGrapyColor: theme.palette.text.secondary

  IconSvg: {
    // padding: theme.spacing(3, 2),
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
    borderRadius: "0px",
    /* opacity: 0.9; */
    /* background-position: cover; */
    backgroundSize: "cover",
    backgroundPosition: "bottom",
  },

  Dashboard_boxButton: {
    // -webkit-appearance: "none",
    transition: "all 0.20s ease-in-out",
    backgroundColor: "#08d765",
    // backgroundImage: "linear-gradient(45deg, #93c34a 0%, #52af4c 100%)",
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
  const [openStake, setOpenStake] = React.useState(false);
  const [openUnstake, setOpenUnStake] = React.useState(false);
  const [totalMaxRewards, setTotalMaxRewards] = React.useState(0);
  const [totalstakes, setStakes] = React.useState([]);

  const getReducer = useSelector((state) => state.UserReducer);

  const {
    atStake,
    userAccountAddress,
    metaMaskDecentralized,
    stakingDcentralized,
  } = getReducer;

  const [userAmountOfDeposits, setUserAmountOfDeposits] = useState(0);
  const [withdrawRef, setWithdrawRef] = useState(0);
  const [totalReward, setTotalReward] = useState(0);
  const [totalWithdrawn, setTotalWithdrawn] = useState(0);

  const [
    bonusBalanceAndAvailableRefReward,
    setBonusBalanceAndAvailableRefReward,
  ] = useState(0);

  const repeatedelyGetUserStake = async () => {
    if (metaMaskDecentralized && userAccountAddress && stakingDcentralized) {
      try {
        let contract = await window?.tronWeb?.contract().at(contractAddress);
        let userDiv = await contract
          .getUserDividends(userAccountAddress)
          .call();
        setTotalReward(userDiv?._hex / 1000000);
      } catch (error) {
        // User denied account access...
        console.log("error", error);
        toast.error(error);
      }
    }
  };
  const BuyTokenFunction = async () => {
    if (metaMaskDecentralized && userAccountAddress && stakingDcentralized) {
      try {
        let contract = await window?.tronWeb?.contract().at(contractAddress);
        let res = await contract
          .getUserReferralBonus(userAccountAddress)
          .call();
        let refusers = await contract.refusers(userAccountAddress).call();
        let userDiv = await contract
          .getUserDividends(userAccountAddress)
          .call();

        let UWithdraw = await contract
          .getUserTotalDeposits(userAccountAddress)
          .call();

        setTotalReward(userDiv?._hex / 1000000);
        setTotalWithdrawn(UWithdraw?._hex / 1000000);
        setWithdrawRef(refusers?.withdrawRef?._hex / 1000000);
        setBonusBalanceAndAvailableRefReward(res?._hex / 1000000);
      } catch (error) {
        // User denied account access...
        console.log("error", error);
        toast.error(error);
      }
    }
  };
  const handleUpdateValues = () => {
    BuyTokenFunction();
  };
  useEffect(() => {
    if (localStorage.getItem("reload") === true) {
      setTimeout(() => {
        BuyTokenFunction();
        localStorage.setItem("reload", false);
      }, 3000);
    }
  });
  React.useEffect(() => {
    BuyTokenFunction();
    setInterval(() => {
      repeatedelyGetUserStake();
    }, 5000);
  }, []);

  React.useEffect(() => {
    BuyTokenFunction();
  }, [metaMaskDecentralized, userAccountAddress, stakingDcentralized]);

  const handleCloseUnStake = () => {
    setOpenUnStake(false);
  };

  const handleOpenUnStake = () => {
    setOpenUnStake(true);
  };

  const handleCloseStake = () => {
    setOpenStake(false);
  };

  const handleOpenStake = () => {
    setOpenStake(true);
  };

  useEffect(() => {
    setInterval(() => {
      getContractTransferEventsByUser("NewDeposit");
    }, 300000);
    getContractTransferEventsByUser("NewDeposit");
  }, []);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [rows, setRows] = useState([]);
  const getContractTransferEventsByUser = async (eventName) => {
    let result = [];
    let tronGrid = new TronGrid(window?.tronWeb);
    try {
      let continueToken = "";
      let res = await tronGrid.contract.getEvents(contractAddress, {
        only_confirmed: true,
        event_name: eventName,
        limit: 200,
      });
      let newArr = [];
      let totalMaxReward = 0;
      res.data.forEach((element) => {
        if (
          window?.tronWeb?.address?.fromHex(element?.result?.user) ===
          userAccountAddress
        ) {
          let d = element?.result?.Duration;
          let amounT = element?.result?.amount;

          let calculatedMaxReward = (
            (amounT / 1000000) *
            (parseInt(d) === 7 ? 0.01 : parseInt(d) === 14 ? 0.02 : 0.03) *
            parseInt(d)
          ).toFixed(3);

          totalMaxReward =
            parseFloat(totalMaxReward) + parseFloat(calculatedMaxReward);
          newArr.push({
            transaction_id: element?.transaction_id,
            token: element?.result?.amount,
            duration: element?.result?.Duration,
            userId: window?.tronWeb?.address?.fromHex(element?.result?.user),
            timeStamp: element?.block_timestamp,
            maxReward: calculatedMaxReward,
          });
        }
      });
      setTotalMaxRewards(totalMaxReward);

      setRows([...newArr]);
    } catch (error) {
      console.error(error);
      console.log(error);
    } finally {
      return result;
    }
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Grid container alignItems="center">
        <Grid item lg={6} xs className="box">
          <Box display="flex" className={classes.box1} m={1}>
            <Box
              width="200px"
              borderRadius="20px 0px 0px 20px"
              style={{}}
              p={1}
            >
              <Box m="10px" height="70px" className={classes.boxColor}>
                <AccountBalanceWalletIcon />
              </Box>
            </Box>

            <Box
              width="100%"
              height="auto"
              borderRadius="20px 20px 20px 20px"
              style={{ color: "#ffff" }}
              pt={2}
              alignItems="center"
            >
              <Typography color="colorText.main !important">
                Your stake
              </Typography>
              <Typography variant="h5" color="colorText.main !important">
                {totalWithdrawn} ChargeV2
              </Typography>
              <Typography color="colorText.main !important">
                3% Daily Reward
              </Typography>
            </Box>
            <Box
              borderRadius="0px 20px 20px 0px"
              width="100px"
              className="box_two"
              p={2}
              textAlign="center"
              style={{ color: "#ffff", backgroundColor: "#51383F" }}
            >
              <Typography variant="h5">
                $ <sup>USD</sup>
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item lg={6} xs>
          <Box display="flex" className={classes.box1} m={1}>
            <Box
              width="200px"
              borderRadius="20px 0px 0px 20px"
              style={{}}
              p={1}
            >
              <Box
                m="10px"
                // borderRadius="10px"
                height="70px"
                className={classes.boxColor}
              >
                <AccountBalanceWalletIcon />
              </Box>
            </Box>

            <Box
              borderRadius="0px 20px 20px 0px"
              width="100%"
              height="auto"
              style={{ color: "#ffff" }}
              pt={3}
              alignItems="center"
            >
              <Typography color="colorText.main !important">
                Available Reward
              </Typography>
              <Typography variant="h5" color="colorText.main !important">
                {totalReward ? parseFloat(totalReward).toFixed(5) : 0} ChargeV2
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid lg={12} xs style={{ textAlign: "center" }}>
        <Box m="10px" color="#08d765">
          <Typography variant="h4" component="h4">
            Stake Your ChargeV2
          </Typography>
          <Typography>Earn Reward upto 3% Daily !</Typography>
        </Box>
      </Grid>

      <Grid container>
        <Grid item lg={6} xs>
          <Box
            className={classes.box1}
            borderRadius="20px 20px 20px 20px"
            style={{}}
            m={1}
          >
            <Box display="flex">
              <Box
                borderRadius="20px 0px 0px 0px"
                width="100px"
                style={{}}
                p={1}
              >
                <Box
                  m="10px"
                  // borderRadius="10px"
                  height="70px"
                  className={(classes.box_Ions, classes.boxColor)}
                >
                  <BiBasket fontSize="large" />
                </Box>
              </Box>

              <Box
                width="300px"
                height="auto"
                style={{ color: "#ffff" }}
                pt={3}
                alignItems="center"
              >
                <Typography variant="h6">
                  Get Daily Reward on your Stake. 3% Daily Reward
                </Typography>
              </Box>
            </Box>

            <Box textAlign="center" p={1}></Box>
          </Box>
        </Grid>
        <Grid item lg={6} xs>
          <Box
            className={classes.box1}
            borderRadius="20px 20px 20px 20px"
            style={{}}
            m={1}
          >
            <Box display="flex">
              <Box
                borderRadius="20px 0px 0px 0px"
                width="100px"
                style={{}}
                p={1}
              >
                <Box
                  m="10px"
                  // borderRadius="10px"
                  height="70px"
                  className={(classes.box_Ions, classes.boxColor)}
                >
                  <BiBasket fontSize="large" />
                </Box>
              </Box>

              <Box
                width="300px"
                height="auto"
                style={{ color: "#ffff" }}
                pt={3}
                alignItems="center"
              >
                <Typography variant="h6">
                  Maximum Reward
                  <br />
                  {totalMaxRewards} ChargeV2
                </Typography>
              </Box>
            </Box>

            <Box textAlign="center" p={1}></Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs>
          <Box
            className={classes.box1}
            borderRadius="20px 20px 20px 20px"
            style={{}}
            m={1}
          >
            <Box m="30px">
              <Button
                onClick={handleOpenStake}
                className={classes.Dashboard_boxButton}
                color="primary"
                variant="outlined"
                style={{
                  color: "#ffff",
                  padding: "5px 0px 5px 0px",
                }}
                fullWidth
              >
                Stake
              </Button>
            </Box>

            <Box textAlign="center" p={1}></Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Box className={classes.tableBox}>
            <div className={classes.top} style={{ marginTop: 20 }}>
              <h6 className="white">Recent Stake Transactions</h6>
            </div>
            <TableContainer
              component={Paper}
              className={classes.tableTransparnet}
            >
              <Table
                className={classes.table}
                aria-label="custom pagination table"
              >
                <TableHead className={classes.tableHeader}>
                  <TableRow>
                    <TableCell
                      style={{ width: 160, color: "white" }}
                      align="left"
                    >
                      Transaction ID
                    </TableCell>

                    <TableCell style={{ width: 160, color: "white" }}>
                      Source
                    </TableCell>
                    <TableCell
                      style={{ width: 160, color: "white" }}
                      align="left"
                    >
                      Date
                    </TableCell>
                    <TableCell
                      style={{ width: 160, color: "white" }}
                      align="left"
                    >
                      Amount
                    </TableCell>
                    <TableCell
                      style={{ width: 160, color: "white" }}
                      align="left"
                    >
                      Duration
                    </TableCell>
                    <TableCell
                      style={{ width: 160, color: "white" }}
                      align="left"
                    >
                      Max Reward
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={classes.tableBody}>
                  {(rowsPerPage > 0
                    ? rows.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : rows
                  ).map((row) => (
                    <TableRow key={row.name}>
                      <TableCell
                        style={{ color: "white" }}
                        component="th"
                        scope="row"
                      >
                        {row.transaction_id.slice(0, 8) +
                          "..." +
                          row.transaction_id.slice(56, 64)}
                      </TableCell>
                      <TableCell
                        style={{ width: 160, color: "white" }}
                        align="left"
                      >
                        {row.userId}
                      </TableCell>
                      <TableCell
                        style={{ width: 160, color: "white" }}
                        align="left"
                      >
                        {moment(row.timeStamp).format("MMM/DD/YYYY").toString()}
                      </TableCell>
                      <TableCell
                        style={{ width: 160, color: "white" }}
                        align="left"
                      >
                        {row.token / 1000000}
                      </TableCell>
                      <TableCell
                        style={{ width: 160, color: "white" }}
                        align="left"
                      >
                        {row.duration}
                      </TableCell>
                      <TableCell
                        style={{ width: 160, color: "white" }}
                        align="left"
                      >
                        {row?.maxReward}
                      </TableCell>
                    </TableRow>
                  ))}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      style={{ color: "white" }}
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={6}
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: { "aria-label": "rows per page" },
                        native: true,
                      }}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>

      <StakPopup
        handleUpdateValues={handleUpdateValues}
        open={openStake}
        handleClose={handleCloseStake}
      />
      <UnStakeModal open={openUnstake} handleClose={handleOpenUnStake} />
    </div>
  );
}
export default Stacks;

function TablePaginationActions(props) {
  const classes = useStyles2();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? (
          <LastPage style={{ color: "white" }} />
        ) : (
          <FirstPage style={{ color: "white" }} />
        )}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight style={{ color: "white" }} />
        ) : (
          <KeyboardArrowLeft style={{ color: "white" }} />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft style={{ color: "white" }} />
        ) : (
          <KeyboardArrowRight style={{ color: "white" }} />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? (
          <FirstPage style={{ color: "white" }} />
        ) : (
          <LastPage style={{ color: "white" }} />
        )}
      </IconButton>
    </div>
  );
}

function createData(number, calories, fat, amount) {
  return { number, calories, fat, amount };
}
