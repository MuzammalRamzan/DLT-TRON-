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
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  LastPage,
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import BuyPopup from "../buyModal";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStyles } from "./styles";
import { useSelector } from "react-redux";
import { contractAddress } from "../../utils/constants";
import TronGrid from "trongrid";

const useStyles2 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  table: {
    minWidth: 500,
  },
}));

function Transactions() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [eventName, setEventName] = React.useState("Sell");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setEventName(event.target.value);
  };

  const getReducer = useSelector((state) => state.UserReducer);
  const { userPersonalBalance, userAccountAddress } = getReducer;
  useEffect(() => {
    setInterval(() => {
      getContractTransferEventsByUser(eventName);
    }, 300000);
  }, []);
  useEffect(() => {
    getContractTransferEventsByUser(eventName);
  }, [eventName]);
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
        filters: {
          block_number: "11671083",
        },
      });
      let newArr = [];
      res &&
        res.data &&
        res.data.forEach((element) => {
          if (
            window?.tronWeb?.address?.fromHex(element?.result[1]) ===
            userAccountAddress
          ) {
            newArr.push({
              transaction_id: element?.transaction_id,
              token: element?.result[0],
              source: window?.tronWeb?.address?.fromHex(element?.result[1]),
            });
          }
        });
      setRows([...newArr]);
    } catch (error) {
      console.log(error);
    } finally {
      return result;
    }
  };
  const handleChangePage = (e, page) => {
    setPage(page);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
  };
  return (
    <>
      <Grid
        container
        className={classes.root}
        spacing={3}
        style={{ width: "100%" }}
      >
        <Grid item xs={12} sm={6} lg={6}>
          <Paper className={classes.card}>
            <div className={classes.left}>
              <div className={classes.buyIcon}>
                <IconButton className={classes.outlineBtn} onClick={handleOpen}>
                  <ShoppingBasketIcon className="white" />
                </IconButton>
              </div>
            </div>
            <div className={classes.right}>
              <p className="margin-none white">Total ChargeV2 Balance</p>
              <h6 className="white">
                {userPersonalBalance ? userPersonalBalance : 0} ChargeV2
              </h6>
              <p className="margin-none small-para white">
                Selling Fast, Buy Now
              </p>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <Paper className={classes.card}>
            <div className={classes.left}>
              <div className={classes.buyIcon}>
                <IconButton className={classes.outlineBtn} onClick={handleOpen}>
                  <ShoppingBasketIcon className="white" />
                </IconButton>
              </div>
            </div>
            <div className={classes.right}>
              <p className="margin-none white">Buy</p>
              <div className={classes.buyTokens}>
                <h5 className="white">ChargeV2 Tokens</h5>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.dropDown}>
            <FormControl className={classes.selectBox}>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={eventName}
                onChange={handleChange}
              >
                <MenuItem value="Sell">Sell Tokens</MenuItem>
                <MenuItem value="Buy">Buy Tokens</MenuItem>
                <MenuItem value="Withdrawan">Withdraw Tokens</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.tableBox}>
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
                    <TableCell style={{ color: "white" }}>
                      Transaction ID
                    </TableCell>
                    <TableCell style={{ color: "white" }}>Source</TableCell>
                    <TableCell style={{ color: "white" }}>Token</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={classes.tableBody}>
                  {rows &&
                    rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <TableRow key={row.transaction_id}>
                          <TableCell style={{ color: "white" }} scope="row">
                            {row.transaction_id.slice(0, 8) +
                              "..." +
                              row.transaction_id.slice(56, 64)}
                          </TableCell>
                          <TableCell style={{ color: "white" }} align="left">
                            {row.source}
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
                      colSpan={3}
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: { "aria-label": "rows per page" },
                        native: true,
                      }}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
      <BuyPopup open={open} handleClose={handleClose} />
    </>
  );
}

export default Transactions;

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

function createData(name, calories, fat) {
  return { name, calories, fat };
}
