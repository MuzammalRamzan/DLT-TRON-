import {
  Grid,
  Paper,
  makeStyles,
  Box,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  useTheme,
  IconButton,
  TableHead,
} from "@material-ui/core";
import { toast } from "react-toastify";

import {
  LastPage,
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@material-ui/icons";
import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { useStyles } from "./styles";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import Web3 from "web3";
import { contractAddress } from "../../utils/constants";
import TronGrid from "trongrid";
const web3 = new Web3(Web3.givenProvider || "http://localhost8545");
// table data & styling

const useStyles2 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  table: {
    minWidth: 500,
  },
}));

function Wallet() {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const getReducer = useSelector((state) => state.UserReducer);

  const { metaMaskDecentralized, userAccountAddress, stakingDcentralized } =
    getReducer;
  const [withdrawRef, setWithdrawRef] = useState(0);
  const [userPersonalBalance, setUserPersonalBalance] = useState(0);
  const [atStake, SetAtStake] = useState(0);

  const [
    bonusBalanceAndAvailableRefReward,
    setBonusBalanceAndAvailableRefReward,
  ] = useState(0);

  const BuyTokenFunction = async () => {
    if (metaMaskDecentralized && userAccountAddress && stakingDcentralized) {
      try {
        let contract = await window?.tronWeb?.contract().at(contractAddress);
        let res = await contract
          .getUserReferralBonus(userAccountAddress)
          .call();
        let userDiv = await contract.balanceOf(userAccountAddress).call();

        let UWithdraw = await contract
          .getUserTotalDeposits(userAccountAddress)
          .call();

        setUserPersonalBalance(userDiv?._hex / 1000000);
        SetAtStake(UWithdraw?._hex / 1000000);
        setBonusBalanceAndAvailableRefReward(res?._hex / 1000000);
      } catch (error) {
        // User denied account access...
        console.log("error", error);
        toast.error(error);
      }
    }
  };
  //
  React.useEffect(() => {
    BuyTokenFunction();
  }, []);

  React.useEffect(() => {
    BuyTokenFunction();
  }, [metaMaskDecentralized, userAccountAddress, stakingDcentralized]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    getContractTransferEventsByUser("Sell");
    setInterval(() => {
      getContractTransferEventsByUser("Sell");
    }, 300000);
  }, []);

  const [rows, setRows] = useState([]);
  const getContractTransferEventsByUser = async (eventName) => {
    let result = [];
    let tronGrid = new TronGrid(window?.tronWeb);
    try {
      let continueToken = "";
      let res = await tronGrid.contract.getEvents(contractAddress, {
        only_confirmed: true,
        event_name: eventName,
        limit: 30,
        filters: { id: userAccountAddress },
      });
      let res2 = await tronGrid.contract.getEvents(contractAddress, {
        only_confirmed: true,
        event_name: "Buy",
        limit: 30,
        filters: { id: userAccountAddress },
      });
      let res3 = await tronGrid.contract.getEvents(contractAddress, {
        only_confirmed: true,
        event_name: "Withdrawan",
        limit: 30,
        filters: { id: userAccountAddress },
      });

      let newArr = [];
      res2.data.forEach((element) => {
        newArr.push({
          transaction_id: element?.transaction_id,
          token: element?.result[0],
          source: element?.block_timestamp,
        });
      });
      res3.data.forEach((element) => {
        newArr.push({
          transaction_id: element?.transaction_id,
          token: element?.result[0],
          source: element?.block_timestamp,
        });
      });
      res.data.forEach((element) => {
        newArr.push({
          transaction_id: element?.transaction_id,
          token: element?.result[0],
          source: element?.block_timestamp,
        });
      });
      let newAr = newArr.sort((a, b) => b.source - a.source);
      setRows([...newAr]);
    } catch (error) {
      console.error(error);
      console.log(error);
    } finally {
      return result;
    }
  };

  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item xs={12} sm={6} lg={4}>
        <Paper className={classes.card}>
          <div className={classes.left}></div>
          <div className={classes.right}>
            <p className="margin-none white">Total ChargeV2 Balance</p>
            <h6 className="white">
              {userPersonalBalance ? userPersonalBalance : 0} ChargeV2
            </h6>
            <p className="margin-none small-para white">
              Stake and earn up to 3% Per Month, Stake Now
            </p>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <Paper className={classes.card}>
          <div className={classes.left}></div>
          <div className={classes.right}>
            <p className="margin-none white">Deposit Stakes</p>
            <h6 className="white">{atStake ? atStake : 0} ChargeV2</h6>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <Paper className={classes.card}>
          <div className={classes.left}></div>
          <div className={classes.right}>
            <p className="margin-none white">Bonus Balance</p>
            <h6 className="white">
              {bonusBalanceAndAvailableRefReward
                ? bonusBalanceAndAvailableRefReward
                : 0}{" "}
              ChargeV2
            </h6>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Box className={classes.tableBox}>
          <div className={classes.top}>
            <h6 className="white">Recent Wallet Transactions</h6>
            <Button className={classes.btn}>Active</Button>
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
                  <TableCell style={{ width: 160, color: "white" }}>
                    #
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
                    Transaction ID
                  </TableCell>
                  <TableCell
                    style={{ width: 160, color: "white" }}
                    align="left"
                  >
                    amount
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
                ).map((row, index) => (
                  <TableRow key={row.transaction_id}>
                    <TableCell style={{ color: "white" }} align="left">
                      {index + 1}
                    </TableCell>
                    <TableCell style={{ color: "white" }} align="left">
                      {moment(row.source).format("MMM/DD/YYYY").toString()}
                    </TableCell>
                    <TableCell style={{ color: "white" }} scope="row">
                      {row.transaction_id.slice(0, 8) +
                        "..." +
                        row.transaction_id.slice(56, 64)}
                    </TableCell>

                    <TableCell style={{ color: "white" }} align="left">
                      {row.token / 1000000}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    style={{ color: "white" }}
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={4}
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
  );
}

export default Wallet;

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

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onChangePage: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };

function createData(number, calories, fat, amount) {
  return { number, calories, fat, amount };
}
