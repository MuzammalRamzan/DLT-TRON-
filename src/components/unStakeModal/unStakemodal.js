import React from "react";
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
  Button,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import clsx from "clsx";
// import {useStyles} from './styles';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3),
    maxHeight: 450,
    maxWidth: 900,
    borderRadius: 20,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.03)",
    background: `linear-gradient(90deg, rgba(57,55,62,1) 26%, rgba(54,73,108,1) 53%, rgba(28,35,47,1) 84%)`,
    backgroundSize: "cover",
    backgroundColor: "#326BB1",
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
    background: "linear-gradient(90deg, #132660 10%, #0062cc 90%)",
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

export default function UnStakeModal({ handleClose, open }) {
  const classes = useStyles();

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
                <h5 className="white"> UnStake Wave</h5>
                <small className="white">
                  Fields with <span className="red">*</span> are mendatory
                </small>
              </div>
              <IconButton className={classes.btn} onClick={handleClose}>
                <Close className="white" />
              </IconButton>
            </div>
            <Grid container spacing={3}>
              <Grid item lg={6} xs className={classes.marginTop}>
                <TextField
                  className={classes.formField}
                  id="outlined-basic"
                  label="Select Currency *"
                  variant="outlined"
                />
              </Grid>
              <Grid item lg={6} xs className={classes.marginTop}>
                <TextField
                  className={classes.formField}
                  id="outlined-basic"
                  label="Select Amount (wave)"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} className={classes.marginTop}>
                <TextField
                  className={classes.formField}
                  id="outlined-basic"
                  label=" Your Public address*"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} className={classes.marginTop}>
                <TextField
                  className={classes.formField}
                  id="outlined-basic"
                  label="Transaction Id"
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                xs={12}
                className={clsx(classes.marginTop, classes.float)}
              >
                <Button
                  m={15}
                  className={classes.clearBtn}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button className={classes.withDrawBtn} paddingRight="20px">
                  WithDraw Tokens
                </Button>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
