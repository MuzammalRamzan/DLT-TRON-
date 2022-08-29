import { Box } from "@material-ui/core";
import React from "react";
import BottomNavigationComponent from "../BottomNavigation";
import SubHeader from "../header/sub-header";
import { useHistory } from "react-router-dom";

function Layout(props) {
  const history = useHistory();
  return (
    <>
      <Box pb={10}>
        <SubHeader />
        {props.children}
      </Box>
      <BottomNavigationComponent />
    </>
  );
}

export default Layout;
