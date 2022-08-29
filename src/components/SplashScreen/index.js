import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
// import side from "../../assets/sideLogo.png";

/**
 * @author
 * @function SplashScreen
 **/

const SplashScreen = (props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#222A31",
      }}
    >
      <img
        src="/logo.png"
        style={{ height: "30%" }}
        className="roatate-image"
      />
    </div>
  );
};

export default SplashScreen;
