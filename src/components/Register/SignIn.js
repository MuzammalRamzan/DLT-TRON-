import React from "react";

import Box from "@material-ui/core/Box";
import store from "../../redux/store";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import "./index.css";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  SignUpColor: {
    background: "#636057",
    boxShadow: "2",
    borderRadius: "6",
    color: "#eae8e7",
    textAlign: "center",
    padding: "4rem",
    mt: "3rem",
    borderRadius: "20px",
  },
  SignUp_boxButton: {
    transition: "all 0.20s ease-in-out",
    backgroundColor: "#08d765 !important",
    // backgroundImage: "linear-gradient(45deg,#08d765 0%, #08d765 100%)",
    // boxShadow:
    //   "0 3px 6px rgba(0, 0, 0, .3), inset 0 0 10px 3px rgba(0, 0, 0, .2), 0 3px 20px #f6597282, 0 3px 35px rgba(250, 95, 59, 0.48)",
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

export default function SignIn(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [loader, setLoader] = React.useState(false);
  const getReducer = useSelector((state) => state.UserReducer);
  const { isUserAuthenticated, metaMaskDecentralized, userAccountAddress } =
    getReducer;

  React.useEffect(() => {
    if (isUserAuthenticated) {
      history.push(`/`);
    }
  }, [isUserAuthenticated]);
  const contractAddress = "TRpndMFBy2Xn38PvYfRNmUfKxBZt4svSiH";
  async function Ethereum() {
    let mainAccount = "";

    if (
      window.tronWeb &&
      window.tronWeb.defaultAddress.base58 === "undefined"
    ) {
    } else {
    }
    mainAccount = await window?.tronWeb?.defaultAddress?.base58;

    if (mainAccount) {
      history.push("/");
      setLoader(false);
      localStorage.setItem("_DTL_LOGIN_ADDRESS", mainAccount);
      store.dispatch({
        type: "USER_AUTHENTICATED",
      });
      store.dispatch({
        type: "USER_METAMASK_ACCOUNT",
        payload: mainAccount,
      });
      store.dispatch({
        type: "METAMASK_STAKING_DCENTRALIZED",
        payload: mainAccount,
      });
      store.dispatch({
        type: "METAMASK_DECENTRALIZED",
        payload: mainAccount,
      });
    } else {
      toast.warning("Please login or install tron wallet!");
      setLoader(false);
    }
  }

  const LoginFunction = async () => {
    setLoader(true);
    await Ethereum();
  };
  React.useEffect(() => {
    const url = new URL(props?.name);
    let params = new URLSearchParams(url?.search);
    let q = params.get("ref");
    console.log("ref url", q);
    if (q) {
      localStorage.setItem("ref", q);
    }
  }, []);
  return (
    <div style={{ backgroundColor: "#222a31", height: "50rem" }}>
      <Container lg={12} maxWidth="md">
        <Box textAlign="center" padding="2rem">
          <img
            src="/logo-2.png"
            className="register-logo"
            style={{ backgroundColor: "#fff" }}
          />
        </Box>

        <Box className={classes.SignUpColor} mt="2rem">
          <Typography variant="h3" component="h4">
            Sign In to Enter
          </Typography>
          <Typography>Connect to Tron Wallet</Typography>
          <div className="login-space-line"></div>

          <div className="Wallet_Button">
            {loader ? (
              <button className={classes.SignUp_boxButton}>
                <Typography
                  variant="h5"
                  component="h5"
                  style={{ fontSize: "1rem" }}
                >
                  Loading...
                </Typography>
              </button>
            ) : (
              <button
                className={classes.SignUp_boxButton}
                onClick={LoginFunction}
              >
                <Typography
                  variant="h5"
                  component="h5"
                  style={{ fontSize: "1rem" }}
                >
                  Connect to the wallet
                </Typography>
              </button>
            )}
          </div>

          <div className="login-space-line"></div>

          <Box>
            <Typography
              variant="h5"
              component="h5"
              style={{ fontSize: "1rem" }}
            >
              {" "}
              Connect to Your wallet to enter the dashboard.{" "}
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
