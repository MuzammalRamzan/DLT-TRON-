import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    paddingRight: "5px",
    width: "100%",
  },
  card: {
    borderRadius: 0,
    backgroundSize: "cover",
    backgroundColor: "#222a31",
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
    borderBottom: "2px solid #08d765",
    padding: 25,
  },
  table: {
    minWidth: 500,
  },
  tableTransparnet: {
    padding: 25,
    borderRadius: 20,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.03)",
    background: `linear-gradient(90deg, rgba(57,55,62,1) 26%, rgba(54,73,108,1) 53%, rgba(28,35,47,1) 84%)`,
    backgroundColor: "#00ffe954",
    backgroundSize: "cover",
    // backgroundColor: "#326BB1",
  },
  buyTokens: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    color: "#00ffe9",
    border: "1px solid #00ffe9",
    marginLeft: 20,
    fontWeight: "bold",
    padding: 1,
    "&:focus": {
      color: "black",
      border: "1px solid #00ffe9",
      outline: "none",
      boxShadow: "none",
    },
    "&:hover": {
      color: "black",
      border: "1px solid #00ffe9",
      outline: "none",
      boxShadow: "none",
      backgroundColor: "#00ffe9",
    },
  },
  stackBox: {
    backgroundColor: "#222a31",
    color: "#00FFD2",
    padding: 15,
    borderRadius: 15,
  },
  field: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#132660",
    border: "1px solid #00FFD2",
    width: "100%",
  },
  fieldLeft: {
    color: "white",
    paddingTop: 9,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 11,
    width: 150,
  },
  tableContainer: {
    padding: 40,
  },
  fieldRight: {
    width: "79.2%",
    backgroundColor: "#132660",
    borderLeft: "1px solid #00FFD2",
    color: "white",
    paddingLeft: 10,
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
  },
  bottomBox: {
    backgroundColor: "#17A2B8",
    color: "white",
    padding: "1px 8px",
    borderRadius: 5,
  },
  clearBtn: {
    backgroundColor: "#D33949",
    color: "white",
    borderRadius: 20,
    marginTop: 10,
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
    "&:hover": {
      backgroundColor: "#D33949",
    },
  },
  withDrawBtn: {
    // background: "linear-gradient(90deg, #132660 10%, #0062cc 90%)",
    backgroundSize: "200% 100%",
    width: "100%",
    padding: 15,
    color: "white",
    borderRadius: 0,
    backgroundColor: "#08d765",
    marginTop: 10,
    marginLeft: 10,
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
  },
}));
