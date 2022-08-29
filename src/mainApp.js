import React, { useState } from "react";
import { Route, Redirect, useParams } from "react-router-dom";
import DashboardRoutes from "./DashboardRoutes";
import { useSelector } from "react-redux";
import Login from "./components/Register/SignIn";
import store from "./redux/store";

/**
 * @author
 * @function MainApp
 **/

const AuthRoute = ({ component: Component, authUser, ...rest }) => {
  console.log(Component, authUser, rest);
  const parm = useParams();

  return (
    <Route
      {...rest}
      render={(props) =>
        !authUser ? (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const MainApp = (props) => {
  const getReducer = useSelector((state) => state.UserReducer);
  const { isUserAuthenticated, currentUserStatus } = getReducer;

  const [metaMastAcc, setMetaMaskAcc] = useState();
  const [dcentralized, setDcentralized] = useState();

  const contractAddress = "TRpndMFBy2Xn38PvYfRNmUfKxBZt4svSiH";

  async function Read() {
    let contract = await window?.tronWeb?.contract()?.at(contractAddress);
    let rewards = await contract?.methods?.turnover()?.call();
  }

  const getCurrentWallet = async () => {
    try {
      let getWalletAddress = await localStorage.getItem("_DTL_LOGIN_ADDRESS");
      if (dcentralized && metaMastAcc) {
        store.dispatch({
          type: "USER_AUTHENTICATED",
        });
      } else if (!getWalletAddress) {
        store.dispatch({
          type: "AUTHENTICATED_FAILED",
        });
      } else if (metaMastAcc && metaMastAcc != getWalletAddress) {
        store.dispatch({
          type: "AUTHENTICATED_FAILED",
        });
      }
    } catch (err) {
      store.dispatch({
        type: "AUTHENTICATED_FAILED",
      });
    }
  };

  React.useEffect(() => {
    getCurrentWallet();

    // eslint-disable-next-line
  }, [dcentralized, metaMastAcc]);

  return (
    <>
      <Route
        path="/login/:id"
        component={() =>
          isUserAuthenticated ? (
            <Redirect to="/" />
          ) : (
            <Login name={window.location.href} />
          )
        }
      />
      <Route
        path="/login"
        component={() =>
          isUserAuthenticated ? (
            <Redirect to="/" />
          ) : (
            <Login name={window.location.href} />
          )
        }
      />

      <AuthRoute
        // exact
        path="/"
        authUser={isUserAuthenticated}
        component={DashboardRoutes}
      />
    </>
  );
};

export default MainApp;
