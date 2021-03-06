/*eslint-disable*/
import React, { useState, useEffect } from "react";
import axios from "axios";
// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

const useStyles = makeStyles(styles);

export default function ProductUpdateWarning(props) {
  const classes = useStyles();
  const [alert, setAlert] = React.useState(null);

  useEffect(() => {
    warningWithConfirmMessage();
  }, []);

  const warningWithConfirmMessage = () => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Are you sure?"
        onConfirm={() => successUpdate()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
        cancelBtnCssClass={classes.button + " " + classes.danger}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showCancel
      ></SweetAlert>
    );
  };

  const successUpdate = () => {
    props.productUpdateFlagFromModal(true);
    setAlert(null);
  };

  const hideAlert = () => {
    props.productUpdateFlagFromModal(false);
    setAlert(null);
  };

  return <div>{alert}</div>;
}
