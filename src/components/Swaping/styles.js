import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    paddingRight: "5px",
    width: "100%",
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
  Dashboard_boxButton: {
    // -webkit-appearance: "none",
    transition: "all 0.20s ease-in-out",
    backgroundColor: "#08d765",
    // backgroundImage: "linear-gradient(45deg, #93c34a 0%, #52af4c 100%)",
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
  card: {
    borderRadius: 0,
    backgroundSize: "cover",
    backgroundColor: "#222a31",
    // opacity: 0.8,
    width: "100%",
    padding: 10,
    height: "auto",
    display: "flex",
    flexDirection: "row",
  },
  paper: {
    backgroundColor: "transparent",
    border: 0,
  },
  left: {
    backgroundColor: "#08d765",
    height: 90,
    width: 90,
    borderRadius: 0,
  },
  right: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 20,
  },
  tableBox: {
    borderRadius: 20,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.03)",
    backgroundSize: "cover",
    backgroundColor: "#222a31",
    // padding: 25
  },
  btn: {
    backgroundColor: "#1282C2",
    borderRadius: 20,
    fontSize: 10,
    float: "right",
    color: "white",
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
    "&:hover": {
      backgroundColor: "#1282C2",
    },
  },
  top: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "2px solid #19B5CD",
    padding: 25,
  },
  table: {
    minWidth: 500,
  },
  tableTransparnet: {
    padding: 25,
    borderRadius: 20,
    // opacity: ".5",
    backgroundColor: "#222a31",
    backgroundSize: "cover",
    // backgroundColor: "#326BB1",
  },
  tableHeader: {
    backgroundColor: "#222a31",
  },
  tableBody: {},
}));
