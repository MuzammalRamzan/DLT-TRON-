import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Modal,
  Backdrop,
  Fade,
  Grid,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Button,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import clsx from "clsx";
import TronHelper from "../../utils/TronHelper";
import { StakeToken } from "../../userDataFunctions";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import { useSelector } from "react-redux";
import {
  contractAddress,
  swapingAddress,
  approveSwapingAddress,
} from "../../utils/constants";
import { toast } from "react-toastify";

// import {useStyles} from './styles';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3),
    maxHeight: 450,
    maxWidth: 900,
    borderRadius: 20,
    backgroundSize: "cover",
    backgroundColor: "#222A31",
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
    color: "#1282C2",
    backgroundColor: "rgba(57,55,62,1)",
    borderColor: "#19C6C7",
    "&:focus": {
      borderColor: "#19C6C7",
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

export default function StakPopup({ handleUpdateValues, handleClose, open }) {
  const classes = useStyles();
  const [numberOfTokens, setNumberOfTokens] = React.useState("");
  const [getDate, setGetDate] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [loaderFor, setLoaderFor] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [allowance, setAllowance] = useState(0);
  const [toChargeV2, setToChargeV2] = useState(0);
  const getReducer = useSelector((state) => state.UserReducer);

  const {
    metaMaskDecentralized,
    userAccountAddress,
    oneTokenPrice,
    eatherInUsdt,
    stakingDcentralized,
  } = getReducer;

  const closeTheModal = (isTrue) => {
    if (isTrue) {
      handleClose();
    }
  };

  const ManageLoader = (isFalse) => {
    setLoader(isFalse);
  };
  // approveSwapingAddress
  const SwappingTokens = async () => {
    if (numberOfTokens === "") {
    } else {
      setLoader(true);
      setLoaderFor("swap");
      if (metaMaskDecentralized && stakingDcentralized && userAccountAddress) {
        let final = JSON.stringify(numberOfTokens * 1000000000);

        let contract = await window?.tronWeb?.contract().at(swapingAddress);
        try {
          contract
            ?.swapping(numberOfTokens * 100000000)
            ?.send({
              feeLimit: 100000000,
              shouldPollResponse: true,
            })
            .then((output) => {
              handleUpdateValues();
              localStorage.setItem("reload", true);
              setLoader(false);
              toast.success("Your transaction has been confirmed");
              handleClose();
              setLoaderFor("");
            })
            .catch((e) => {
              toast.error(e.message);

              handleUpdateValues();
              localStorage.setItem("reload", true);
              setLoader(false);
              setLoaderFor("");
            });
          console.log(getDate, numberOfTokens);
        } catch (e) {
          toast.error(e.message);

          handleUpdateValues();
        }
      }
    }
  };
  const ApproveTokens = async () => {
    if (numberOfTokens === "") {
    } else {
      setLoader(true);
      setLoaderFor("approve");
      if (metaMaskDecentralized && stakingDcentralized && userAccountAddress) {
        let contract = await window?.tronWeb
          ?.contract()
          .at(approveSwapingAddress);
        try {
          let res = await contract
            ?.allowance(userAccountAddress, swapingAddress)
            ?.call();
          let vRes = res?._hex / 100000000;
          let vRes2 = res?._hex / 1000000;
          if (vRes < numberOfTokens) {
            contract
              ?.approve(swapingAddress, numberOfTokens * 100000000)
              ?.send({
                feeLimit: 100000000,
                shouldPollResponse: true,
              })
              .then((output) => {
                handleUpdateValues();
                SwappingTokens();

                toast.success("Your Token has approved");
                // handleClose();
                setDisabled(false);
                setLoaderFor("");
                getAllowance();
              })
              .catch((e) => {
                toast.error(e.message);

                handleUpdateValues();
                localStorage.setItem("reload", true);
                setLoader(false);
                setLoaderFor("");
              });
          } else {
            SwappingTokens();
          }
        } catch (e) {
          toast.error(e.message);
          setLoaderFor("");
          setLoader(false);
          handleUpdateValues();
        }
      }
    }
  };
  const getAllowance = async () => {
    if (metaMaskDecentralized && stakingDcentralized && userAccountAddress) {
      let contract = await window?.tronWeb
        ?.contract()
        .at(approveSwapingAddress);
      try {
        let res = await contract
          ?.allowance(userAccountAddress, swapingAddress)
          ?.call();
        setAllowance(res / 100000000);
      } catch (e) {}
    }
  };
  useEffect(() => {
    getAllowance();
  }, []);
  useEffect(() => {
    if (allowance <= numberOfTokens) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [allowance, numberOfTokens]);
  const chargeV1ToChargeV2 = async (v) => {
    try {
      let contract = await window?.tronWeb?.contract().at(swapingAddress);
      let value = await contract?.ChargeV1ToChargeV2(v * 100000000)?.call();
      setToChargeV2(value?._hex / 1000000);
    } catch (error) {}
  };
  const changeInputValue = (e) => {
    setDisabled(true);
    setNumberOfTokens(e.target.value);
    chargeV1ToChargeV2(e.target.value);
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
                <h5 className="white" style={{ color: "green" }}>
                  Swap ChargeV2
                </h5>
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
                  onChange={(e) => changeInputValue(e)}
                  id="outlined-basic"
                  label="Enter number of tokens"
                  variant="outlined"
                  type="number"
                />
              </Grid>
              <Grid item xs={12} className={classes.marginTop}>
                <Typography
                  style={{ color: "#fff" }}
                >{`You get ${toChargeV2} trx!`}</Typography>
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
                    disabled={disabled}
                    onClick={ApproveTokens}
                    className={classes.withDrawBtn}
                    paddingRight="20px"
                  >
                    Swap
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
