import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  Box,
  Button,
  Typography,
  createMuiTheme,
  Input,
} from "@material-ui/core";
import {
  AiOutlineTwitter,
  AiFillFacebook,
  AiFillYoutube,
  AiFillCopy,
} from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BiBasket } from "react-icons/bi";
import FacebookIcon from "@material-ui/icons/Facebook";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import TelegramIcon from "@material-ui/icons/Telegram";
import AddIcon from "@material-ui/icons/Add";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import SellModal from "../SellModal/sellModal";
// import '../../App.css'
import "./Dashboard.css";
import BuyModal from "../buyModal/index";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import { contractAddress, refDefaultAddress } from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 10,
    // marginLeft: 30
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

  Dtt_box: {
    borderRadius: "100%",
  },

  Dtt_box: {
    borderRadius: "100%",
  },

  Dashboard_boxButton: {
    transition: "all 0.20s ease-in-out",
    backgroundColor: "#08d765",
    // backgroundImage: "linear-gradient(45deg, #93c34a 0%, #52af4c 100%)",
    // boxShadow: "0 3px 6px rgba(0, 0, 0, .3), inset 0 0 10px 3px rgba(0, 0, 0, .2), 0 3px 20px #88c04aad, 0 3px 35px rgba(103, 174, 74, 0.28)",
    border: "0",
    outline: "0",
    position: "relative",
    backgroundSize: "100% 100%",
    borderRadius: "100px",
    fontSize: "1.3rem",
    lineHeight: "1.6rem",
    // fontFamily: "Source Code Pro",
    fontWeight: 400,
    borderRadius: "2px solid blue",
  },

  box1: {
    backgroundColor: "#222a31",
    borderRadius: "0",
    /* opacity: 0.9; */
    /* background-position: cover; */
    backgroundSize: "cover",
    backgroundPosition: "bottom",
  },
}));

function Dashboard() {
  const getReducer = useSelector((state) => state.UserReducer);

  const {
    allRecentReferrals,
    userPersonalBalance,
    oneTokenPrice,
    totalReferralsCount,
    earnings,
    totalWithdrawn,
    availableWithdrawn,
    atStake,
    registeredDate,
    userWalletEthBalance,
    userAccountAddress,
    totalReward,
    waveCurrentPrice,
    metaMaskDecentralized,
    eatherInUsdt,
    stakingDcentralized,
  } = getReducer;

  const [open, setOpen] = React.useState(false);
  const [openbuy, setOpenbuy] = React.useState(false);
  const [ChargeV2Balance, setChargeV2Balance] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [reffrals, setReffrals] = useState(0);
  const [start, setStart] = useState(0);
  const [withdrawRef, setWithdrawRef] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);

  const [userAmountOfDeposits, setUserAmountOfDeposits] = useState(0);
  const [userDividends, setUserDividends] = useState(0);
  const [usdRate, setUsdRate] = useState(0);
  const [price, setPrice] = useState(0);
  const history = useHistory();
  useEffect(async () => {
    await axios
      .get(
        "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,TRX,IOT&tsyms=USD"
      )
      .then((res) => {
        const cryptos = res.data;
        setUsdRate(cryptos["TRX"].USD);
      });
  }, []);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBuyOpen = () => {
    setOpenbuy(true);
  };

  const handleCloseBuy = () => {
    setOpenbuy(false);
  };
  const classes = useStyles();

  const copyReferralLink = () => {
    let get = document.getElementById("refer").select();
    document.execCommand("copy");
    toast.success("Copied!");
  };
  const BuyTokenFunction = async () => {
    if (metaMaskDecentralized && userAccountAddress && stakingDcentralized) {
      try {
        let contract = await window?.tronWeb?.contract().at(contractAddress);

        let res = await contract.balanceOf(userAccountAddress).call();
        let resTotalRef = await contract
          .totalReferals(userAccountAddress)
          .call();
        let refusers = await contract.refusers(userAccountAddress).call();
        let UAmountOfDeposits = await contract
          .getUserTotalDeposits(userAccountAddress)
          .call();
        let uDividends = await contract
          .getUserDividends(userAccountAddress)
          .call();
        let tradeobj = await window?.tronWeb.trx.getAccount(userAccountAddress);
        let priceObj = await contract.price().call();

        setPrice(priceObj?._hex / 1000000);

        // balance
        setWalletBalance(tradeobj?.balance);
        setUserAmountOfDeposits(UAmountOfDeposits?._hex / 1000000);
        setUserDividends(uDividends?._hex / 1000000);
        setBonus(refusers?.bonus?._hex / 1000000);
        setReffrals(refusers?.reffrals?._hex / 1000000);
        setStart(refusers?.start?._hex);
        setWithdrawRef(refusers?.withdrawRef?._hex / 1000000);

        setChargeV2Balance(res?.balance?._hex / 1000000);
      } catch (error) {
        // User denied account access...
        toast.error(error);
      }
    }
  };
  useEffect(() => {
    if (localStorage.getItem("reload")) {
      setTimeout(() => {
        BuyTokenFunction();
        localStorage.setItem("reload", false);
      }, 3000);
    }
  }, [localStorage.getItem("reload")]);
  const handleReloadValues = () => {
    BuyTokenFunction();
  };
  React.useEffect(() => {
    BuyTokenFunction();
  }, [
    metaMaskDecentralized,
    userAccountAddress,
    stakingDcentralized,
    open,
    openbuy,
  ]);

  return (
    <div className={classes.root}>
      <Grid container alignItems="center">
        <Grid item lg={4} xs>
          <Box display="flex" className={classes.box1} m={1}>
            <Box
              width="200px"
              borderRadius="20px 0px 0px 20px"
              style={{}}
              p={1}
            >
              <Box
                m="10px"
                borderRadius="10px"
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
                ChargeV2 Balance
              </Typography>
              <Typography variant="h6" color="colorText.main !important">
                {ChargeV2Balance ? ChargeV2Balance : 0} ChargeV2
              </Typography>
              <Typography color="colorText.main !important">
                ChargeV2 Price: $
                {price ? parseFloat(price * usdRate).toFixed(5) : 0}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={4} xs>
          <Box display="flex" className={classes.box1} m={1}>
            <Box
              width="200px"
              borderRadius="20px 0px 0px 20px"
              style={{}}
              p={1}
            >
              <Box
                m="10px"
                borderRadius="10px"
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
                Total Referrals Count
              </Typography>
              <Typography variant="h6" color="colorText.main !important">
                {reffrals ? reffrals : 0}
              </Typography>
              <Typography color="colorText.main !important">
                Earnings: {bonus ? bonus : 0}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={4} xs>
          <Box display="flex" className={classes.box1} m={1}>
            <Box
              width="200px"
              borderRadius="20px 0px 0px 20px"
              style={{}}
              p={1}
            >
              <Box
                m="10px"
                borderRadius="10px"
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
                Total Earning
              </Typography>
              <Typography variant="h6" color="colorText.main !important">
                {userDividends ? parseFloat(userDividends).toFixed(3) : 0}
                ChargeV2
              </Typography>
              <Typography color="colorText.main !important">
                At Stake: {userAmountOfDeposits} ChargeV2
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container style={{ backgroundColor: "#222a31" }}>
        <Grid item xs>
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
                  borderRadius="10px"
                  height="70px"
                  className={classes.box_Ions}
                  style={{ backgroundColor: "#08d765" }}
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
                <Typography> Buy with TRX</Typography>
                <Typography variant="4">ChargeV2 Tokens</Typography>
                <Typography>Earn upto 3% daily staking reward</Typography>
              </Box>
            </Box>
            <Box m="30px" p={5}>
              <Button
                className={classes.Dashboard_boxButton}
                color="primary"
                variant="outlined"
                onClick={handleBuyOpen}
                style={{
                  color: "#ffff",
                  padding: "5px 0px 5px 0px",
                }}
                fullWidth
              >
                Buy
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs>
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
                  borderRadius="10px"
                  height="70px"
                  className={classes.box_Ions}
                  style={{ backgroundColor: "#08d765" }}
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
                <Typography> Withdraw to TRX</Typography>
                <Typography variant="5">ChargeV2 Tokens</Typography>
                <Typography>Earn upto 3% daily staking reward</Typography>
              </Box>
            </Box>
            <Box m="30px" p={5}>
              <Button
                p={1}
                className={classes.Dashboard_boxButton}
                onClick={handleOpen}
                color="primary"
                variant="outlined"
                style={{
                  color: "#ffff",
                  padding: "5px 0px 5px 0px",
                }}
                fullWidth
              >
                SELL
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container style={{ backgroundColor: "#222a31", marginTop: 8 }}>
        <Grid item xs maxWidth="md">
          <Box
            className={classes.box1}
            borderRadius="20px 20px 20px 20px"
            style={{}}
            m={1}
          >
            <Box>
              <Box
                className="Account_success"
                display="flex"
                p={2}
                style={{ color: "#ffff" }}
              >
                <Typography variant="h6"> Account Overview</Typography>
                <div className="succse_badges">success</div>
              </Box>
              <div className="success-space-line"></div>

              <Box m={4} style={{ color: "#ffff" }}>
                <p>Registered</p>
                <p>{start ? moment.unix(start).format("DD MMM YYYY") : 0}</p>
                <div className="success-page-space-line"></div>
              </Box>

              <Box m={4} style={{ color: "#ffff" }}>
                <p>Your TRX Balance</p>
                <p>
                  {walletBalance ? parseFloat(walletBalance / 1000000) : 0} TRX
                </p>
                <div className="success-page-space-line"></div>
              </Box>

              <Box m={4} style={{ color: "#ffff" }} paddingBottom={5}>
                <p>Refferal URL</p>

                <div></div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography pt="2">
                    <Input
                      style={{ color: "white" }}
                      type="text"
                      id="refer"
                      value={`${window.location.protocol}//${window.location.host}/login?ref=${userAccountAddress}`}
                      readonly
                    />
                  </Typography>
                  <AiFillCopy
                    style={{ fontSize: 20, cursor: "pointer" }}
                    onClick={copyReferralLink}
                  />
                </div>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs>
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
                  borderRadius="10px"
                  height="70px"
                  className={classes.box_Ions}
                  style={{ backgroundColor: "#08d765" }}
                >
                  <BiBasket fontSize="large" />
                </Box>
              </Box>

              <Box
                width="300px"
                height="auto"
                style={{ color: "#ffff" }}
                pt={2}
                alignItems="center"
              >
                <span>stake</span>
                <Typography variant="h6"> ChargeV2 Tokens</Typography>
                <span>Earn upto 3% daily staking reward</span>
              </Box>
            </Box>
            <Box m="30px"></Box>
            <Box textAlign="center" p={1}>
              <Typography
                variant="h6"
                style={{ color: "#B01F2C" }}
              ></Typography>
            </Box>
          </Box>

          <Box
            className={classes.box1}
            borderRadius="20px 20px 20px 20px"
            style={{}}
            m={1}
          >
            <Box
              className={classes.box1}
              borderRadius="20px 20px 20px 20px"
              style={{}}
              m={1}
            ></Box>
          </Box>
        </Grid>
      </Grid>
      <BuyModal
        handleReloadValues={handleReloadValues}
        open={openbuy}
        handleClose={handleCloseBuy}
      />
      <SellModal
        handleReloadValues={handleReloadValues}
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
}
export default Dashboard;
