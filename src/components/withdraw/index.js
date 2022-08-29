import { Grid, Paper, Typography, Box, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useStyles } from "./styles";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { contractAddress } from "../../utils/constants";
function WithDraw() {
  const classes = useStyles();
  const getReducer = useSelector((state) => state.UserReducer);

  const { metaMaskDecentralized, userAccountAddress, stakingDcentralized } =
    getReducer;

  const [withdrawRef, setWithdrawRef] = useState(0);
  const [totalReward, setTotalReward] = useState(0);
  const [totalWithdrawn, setTotalWithdrawn] = useState(0);

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
        let refusers = await contract.refusers(userAccountAddress).call();
        let userDiv = await contract
          .getUserDividends(userAccountAddress)
          .call();

        let UWithdraw = await contract
          .getUserTotalWithdrawn(userAccountAddress)
          .call();

        setTotalReward(userDiv?._hex / 1000000);
        setTotalWithdrawn(UWithdraw?._hex / 1000000);
        setWithdrawRef(refusers?.withdrawRef?._hex / 1000000);
        setBonusBalanceAndAvailableRefReward(res?._hex / 1000000);
      } catch (error) {
        toast.error(error);
      }
    }
  };
  //
  React.useEffect(() => {
    BuyTokenFunction();
  }, []);
  React.useEffect(() => {
    if (localStorage.getItem("reload")) {
      setTimeout(() => {
        BuyTokenFunction();
        localStorage.setItem("reload", false);
      }, 3000);
    }
  }, [localStorage.getItem("reload")]);
  React.useEffect(() => {
    BuyTokenFunction();
  }, [metaMaskDecentralized, userAccountAddress, stakingDcentralized]);

  const WithDrawStake = async () => {
    if (metaMaskDecentralized && userAccountAddress && stakingDcentralized) {
      try {
        let contracts = await window?.tronWeb?.contract().at(contractAddress);

        contracts
          .withdraw()
          .send({ shouldPollResponse: true })
          .then((output) => {
            BuyTokenFunction();
            toast.success("Your transaction has been confirmed");
            localStorage.setItem("reload", true);
          })
          .catch((e) => {
            BuyTokenFunction();
            toast.error(e.message);

            localStorage.setItem("reload", true);
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const WithdrawRefReward = async () => {
    if (metaMaskDecentralized && userAccountAddress && stakingDcentralized) {
      try {
        let contracts = await window?.tronWeb?.contract().at(contractAddress);

        contracts
          .withdrawRefferalReward()
          .send({ shouldPollResponse: true })
          .then((output) => {
            BuyTokenFunction();
            toast.success("Your transaction has been confirmed");
            localStorage.setItem("reload", true);
          })
          .catch((e) => {
            BuyTokenFunction();
            toast.error(e.message);
            localStorage.setItem("reload", true);
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12} sm={6} lg={6}>
          <Paper className={classes.card}>
            <div className={classes.left}></div>
            <div className={classes.right}>
              <p className="margin-none white">Available Rewards</p>
              <h6 className="white">
                {totalReward ? parseFloat(totalReward).toFixed(3) : 0} ChargeV2
              </h6>
              <p className="margin-none small-para white">
                Total Earned Rewards: {totalWithdrawn ? totalWithdrawn : 0}{" "}
                ChargeV2
              </p>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={6}>
          <Paper className={classes.card}>
            <div className={classes.left}></div>
            <div className={classes.right}>
              <p className="margin-none white">Available Commissions</p>
              <h5 className="white">
                {bonusBalanceAndAvailableRefReward
                  ? bonusBalanceAndAvailableRefReward
                  : 0}{" "}
                ChargeV2
              </h5>
              <p className="margin-none small-para white">
                Total Earned Commissions: {withdrawRef ? withdrawRef : 0}{" "}
                ChargeV2
              </p>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.tableBox}>
            <div className={classes.top}>
              <h6 className="white">Withdraw Stake Earnings</h6>
              <Button className={classes.btn}>Active</Button>
            </div>
            <Grid container spacing={3} className={classes.tableContainer}>
              <Grid item xs={12} lg={6}>
                <div className={classes.stackBox}>
                  <div>
                    <div style={{ marginTop: 10, marginBottom: 10 }}>
                      <Typography variant="span" style={{ fontSize: 20 }}>
                        Total Available to Withdrawn:{" "}
                        <b style={{ color: "white" }}>
                          {totalReward ? parseFloat(totalReward).toFixed(3) : 0}{" "}
                          ChargeV2
                        </b>
                      </Typography>
                    </div>
                    <div
                      style={{ fontSize: 20, marginTop: 10, marginBottom: 10 }}
                    >
                      <Typography variant="span">
                        Total Withdrawn:{" "}
                        <b style={{ color: "white" }}>
                          {totalWithdrawn ? totalWithdrawn : 0} ChargeV2
                        </b>
                      </Typography>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  width="100%"
                >
                  <Button
                    className={classes.withDrawBtn}
                    onClick={WithDrawStake}
                  >
                    WithDraw Stake Earning
                  </Button>
                </Box>
              </Grid>
              <Grid item lg={6}>
                <small className="white">
                  A Withdrawal fee of 1 ChargeV2 will be deducted.
                </small>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.tableBox}>
            <div className={classes.top}>
              <h6 className="white">Withdraw Referrals Rewards</h6>
              <Button className={classes.btn}>Active</Button>
            </div>
            <Grid container spacing={3} className={classes.tableContainer}>
              <Grid item xs={12} lg={6}>
                <div className={classes.stackBox}>
                  <div>
                    <div style={{ marginTop: 10, marginBottom: 10 }}>
                      <Typography variant="span" style={{ fontSize: 20 }}>
                        Total Available to Withdrawn:{" "}
                        <b style={{ color: "white" }}>
                          {bonusBalanceAndAvailableRefReward
                            ? bonusBalanceAndAvailableRefReward
                            : 0}
                          ChargeV2
                        </b>
                      </Typography>
                    </div>
                    <div
                      style={{ fontSize: 20, marginTop: 10, marginBottom: 10 }}
                    >
                      <Typography variant="span">
                        Total Withdrawn:{" "}
                        <b style={{ color: "white" }}>
                          {withdrawRef ? withdrawRef : 0} ChargeV2
                        </b>
                      </Typography>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Box display="flex" flexDirection="row" width="100%">
                  <Button
                    className={classes.withDrawBtn}
                    onClick={WithdrawRefReward}
                  >
                    WithDraw Referral Reward
                  </Button>
                </Box>
              </Grid>
              <Grid item lg={6}>
                <small className="white">
                  A Withdrawal fee of 1 ChargeV2 will be deducted.
                </small>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default WithDraw;
