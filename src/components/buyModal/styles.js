import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
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
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.03)",
    // background: `linear-gradient(90deg, rgba(57,55,62,1) 26%, rgba(54,73,108,1) 53%, rgba(28,35,47,1) 84%)`,
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
    float: "right",
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
  },
}));
