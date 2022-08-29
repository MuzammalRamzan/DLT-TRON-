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
  TextField,
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
import {
  contractAddress,
  swapingAddress,
  swapingAbi,
  swapingEvent,
} from "../../utils/constants";
import TronGrid from "trongrid";
import SwipeModal from "../swipeModal/swipeModal";
const useStyles2 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  table: {
    minWidth: 500,
  },
}));

function Swaping() {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openStake, setOpenStake] = React.useState(false);

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
        let contract = await window?.tronWeb?.contract().at(swapingAddress);
        let resChargeV2 = await contract.PriceOfChargeV2().call();
        let resChargeV1 = await contract.PriceOfChargeV1().call();
        localStorage.setItem("chargeV1", resChargeV1 / 1000000);
        localStorage.setItem("chargeV2", resChargeV2 / 1000000);
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
    getContractTransferEventsByUser();
    setInterval(() => {
      getContractTransferEventsByUser();
    }, 300000);
  }, []);

  const [rows, setRows] = useState([]);
  const getContractTransferEventsByUser = async () => {
    let result = [];
    let tronGrid = new TronGrid(window?.tronWeb);
    try {
      let continueToken = "";
      let res = await tronGrid.contract.getEvents(swapingEvent, {
        only_confirmed: true,
        event_name: "Swapping",
        limit: 30,
      });

      let newArr = [];
      res.data.forEach((element) => {
        if (
          window?.tronWeb?.address?.fromHex(element?.result[0]) ===
          userAccountAddress
        ) {
          newArr.push({
            chargeV1: element?.result[1] / 10000000000000000,
            token: element?.result[0],
            chargeV2: element?.result[2] / 10000000000000000,
            timeStamp: element?.block_timestamp,
          });
        }
      });
      setRows([...newArr]);
    } catch (error) {
      console.error(error);
    } finally {
      return result;
    }
  };
  const handleCloseStake = () => {
    setOpenStake(false);
  };

  const handleOpenStake = () => {
    setOpenStake(true);
  };
  const handleUpdateValues = () => {
    // BuyTokenFunction();
  };
  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item xs={12} sm={12} lg={12}>
        <Grid container>
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
                    className={classes.Dashboard_boxButton}
                    color="primary"
                    variant="outlined"
                    style={{
                      color: "#ffff",
                      padding: "5px 0px 5px 0px",
                    }}
                    fullWidth
                    onClick={handleOpenStake}
                  >
                    Swap
                  </Button>
                </Box>

                <Box textAlign="center" p={1}></Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Box className={classes.tableBox}>
          <div className={classes.top}>
            <h6 className="white">Recent Swaping Transactions</h6>
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
                    Token
                  </TableCell>
                  <TableCell
                    style={{ width: 160, color: "white" }}
                    align="left"
                  >
                    Charge v1
                  </TableCell>
                  <TableCell
                    style={{ width: 160, color: "white" }}
                    align="left"
                  >
                    Charge v2
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
                      {moment(row.timeStamp).format("MMM/DD/YYYY").toString()}
                    </TableCell>
                    <TableCell style={{ color: "white" }} scope="row">
                      {row.token.slice(0, 8) +
                        "..." +
                        row.token.slice(row.token.length - 8, row.token.length)}
                    </TableCell>

                    <TableCell style={{ color: "white" }} align="left">
                      {row.chargeV1}
                    </TableCell>
                    <TableCell style={{ color: "white" }} align="left">
                      {row.chargeV2}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    style={{ color: "white" }}
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={5}
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
      <SwipeModal
        handleUpdateValues={handleUpdateValues}
        open={openStake}
        handleClose={handleCloseStake}
      />
    </Grid>
  );
}

export default Swaping;

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
