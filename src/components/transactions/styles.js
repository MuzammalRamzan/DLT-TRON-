import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    paddingRight: "5px",
    width: "100%",
    // overflow: "hidden"
  },
  card: {
    backgroundColor: "transparent",
    borderRadius: 20,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.03)",
    backgroundSize: "cover",
    width: "100%",
    padding: 10,
    height: "auto",
    display: "flex",
    flexDirection: "row",
  },
  paper: {
    backgroundColor: "transparent",
    border: 0,
    background: "#14142b",
  },
  left: {
    backgroundColor: "#08d765",
    height: 90,
    width: 90,
    borderRadius: 10,
    position: "relative",
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
    // background: `linear-gradient(90deg, rgba(57,55,62,1) 26%, rgba(54,73,108,1) 53%, rgba(28,35,47,1) 84%)`,
    backgroundSize: "cover",
    backgroundColor: "#326BB1",
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
    backgroundColor: "#222a31",
    backgroundSize: "cover",
  },
  tableHeader: {
    backgroundColor: "#222a31",
  },
  tableBody: {},
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
  dropDown: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cirlceBox: {
    position: "relative",
  },
  cirlceIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50, -50%)",
    color: "white",
  },
  icon: {
    fontSize: 60,
  },
  notFound: {
    marginRight: 20,
  },
  selectBox: {
    width: "100%",
  },
  searchBtn: {
    borderRadius: 20,
    background: "linear-gradient(90deg, #132660 10%, #0062cc 90%)",
    backgroundSize: "200% 100%",
    width: 150,
    color: "white",
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
  },
  buyIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    fontSize: "30px",
    // backgroundColor:"#326BB1"
  },
  outlineBtn: {
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
  },
}));
