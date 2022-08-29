import React, { useState } from "react";
import {
  makeStyles,
  Modal,
  Backdrop,
  Fade,
  Grid,
  IconButton,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import clsx from "clsx";
import { SellToken } from "../../userDataFunctions";
import { useSelector } from "react-redux";
import { contractAddress } from "../../utils/constants";
import { toast } from "react-toastify";
// import {useStyles} from './styles';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#222A31",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3),
    maxHeight: 450,
    maxWidth: 900,
    borderRadius: 20,
    backgroundSize: "cover",
  },
  btn: {
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formField: {
    width: "100%",
    color: "#08d765",
    backgroundColor: "transparent",
    borderColor: "#08d765",
    "&:focus": {
      borderColor: "#08d765",
    },
    "& .MuiInputBase-input": {
      color: "#fff",
    },
    "& .MuiFormLabel-root": {
      color: "#fff !important",
    },
  },
  float: {},
  clearBtn: {
    backgroundColor: "#D33949",
    color: "white",
    borderRadius: 20,
    marginTop: 10,
    float: "right",
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
    "&:hover": {
      backgroundColor: "#D33949",
    },
  },
  withDrawBtn: {
    background: "linear-gradient(90deg, #08d765 10%, #08d765 90%)",
    backgroundSize: "200% 100%",
    width: 150,
    color: "white",
    borderRadius: 15,
    marginTop: 10,
    marginLeft: 10,
    paddingRight: 5,
    float: "right",
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
  },
}));

export default function SellPopup({ handleReloadValues, handleClose, open }) {
  const classes = useStyles();
  const [numberOfTokens, setNumberOfTokens] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [sellTokens, setSellTokens] = useState(0);
  const getReducer = useSelector((state) => state.UserReducer);

  const {
    metaMaskDecentralized,
    userAccountAddress,
    oneTokenPrice,
    eatherInUsdt,
    stakingDcentralized,
    supplyValue,
  } = getReducer;

  const closeTheModal = (isTrue) => {
    if (isTrue) {
      handleClose();
    }
  };

  const ManageLoader = (isFalse) => {
    setLoader(isFalse);
  };
  async function tronToToken() {
    let value, contract;
    contract = await window?.tronWeb.contract().at(contractAddress);
    return new Promise(async (resolve, reject) => {
      value = await contract.trontotoken(1000000).call();
      resolve(value);
    });
  }
  async function tronToTokens(v) {
    let value, contract;
    contract = await window?.tronWeb.contract().at(contractAddress);
    return new Promise(async (resolve, reject) => {
      value = await contract.trontotoken(v).call();
      resolve(value);
    });
  }
  const BuyTokenFunction = async () => {
    if (numberOfTokens === "") {
    } else {
      setLoader(true);
      if (metaMaskDecentralized && userAccountAddress && stakingDcentralized) {
        try {
          let value = numberOfTokens;
          let tronValue = await tronToToken();
          let contract = await window?.tronWeb.contract().at(contractAddress);

          contract
            .sellTokens(value * 1000000, value * tronValue)
            .send({
              feeLimit: 100000000,
              shouldPollResponse: true,
            })
            .then((output) => {
              localStorage.setItem("reload", true);
              setLoader(false);
              handleReloadValues();
              toast.success("Your transaction has been confirmed");
              handleClose();
            })
            .catch((e) => {
              toast.error(e.message);
              setLoader(false);
              handleReloadValues();
            });
        } catch (error) {
          localStorage.setItem("reload", true);
          handleReloadValues();
          // User denied account access...
          console.log("sss", error);
          toast.error(error);
          setLoader(false);
        }
      }
    }
  };
  const handleChangeValue = async (v) => {
    setNumberOfTokens(v);

    let a = await tronToTokens(v);
    setSellTokens(a);
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className={classes.header}>
              <div>
                <h5 className="white"> Sell ChargeV2 Tokens</h5>
                {/* <small className="white">Fields with <span className="red">*</span> are mendatory</small> */}
              </div>
              <IconButton className={classes.btn} onClick={handleClose}>
                <Close className="white" />
              </IconButton>
            </div>
            <Grid container spacing={3}>
              <Grid item xs={12} className={classes.marginTop}>
                <TextField
                  className={classes.formField}
                  value={numberOfTokens}
                  onChange={(e) => handleChangeValue(e.target.value)}
                  id="outlined-basic"
                  label="Enter number of tokens"
                  variant="outlined"
                  type="number"
                />
              </Grid>

              <Grid item xs={12} className={classes.marginTop}>
                <Typography
                  style={{ color: "#fff" }}
                >{`You get ${sellTokens} trx!`}</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                className={clsx(classes.marginTop, classes.float)}
              >
                {loader ? (
                  <Button className={classes.withDrawBtn} paddingRight="20px">
                    Loading...
                  </Button>
                ) : (
                  <Button
                    onClick={BuyTokenFunction}
                    className={classes.withDrawBtn}
                    paddingRight="20px"
                  >
                    Sell Tokens
                  </Button>
                )}
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
