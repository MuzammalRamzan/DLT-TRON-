import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoutes = ({ component: Component, auth, ...rest }) => (
  <Route
    // path="/dashboard"
    {...rest}
    render={(props) =>
      !auth.isUserAuthenticated ? (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoutes.propTypes = {
  auth: PropTypes.object.isRequired,
};

// isUserAuthenticated
const mapStateToProps = (state) => ({
  auth: state.UserReducer.isUserAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoutes);
