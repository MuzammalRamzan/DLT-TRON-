import { useState, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./pages/Home";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChestGame from "./pages/ChestGame";
import Whitepaper from "./pages/Whitepaper";
import Audit from "./pages/Audit";
import ReferralSection from "./pages/ReferralSection";
import SideBar from "./components/sideBar/SideBar";
import { Col, Row } from "react-bootstrap";
import { FaTelegram } from "react-icons/fa";
import logo from "./assets/images/Logo.png";
import Utils from "./utils";
import TronWeb from "tronweb";

function App({ location }) {
  const [show, setShow] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [entered, setEntered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tronWebConnect, settronWeb] = useState(false);
  useEffect(() => {
    setTronWeb(window.tronWeb);
  }, []);
  const FOUNDATION_ADDRESS = "TJBfmeQup1jbBaCHfBXb3eVzJfFTv4dt5y";

  useEffect(() => {
    async function update() {
      setLoading(true);
      await new Promise((resolve) => {
        const tronWebState = {
          installed: !!tronWebConnect,
          entered: tronWebConnect && tronWebConnect.ready,
        };
        if (tronWebState.installed) {
          setInstalled(tronWebState.installed);
          setEntered(tronWebState.entered);
          return resolve();
        }
        let tries = 0;
        const timer = setInterval(() => {
          if (tries >= 10) {
            const TRONGRID_API = "https://api.trongrid.io";
            tronWebConnect = new TronWeb(
              TRONGRID_API,
              TRONGRID_API,
              TRONGRID_API
            );

            setEntered(false);
            setInstalled(false);
            clearInterval(timer);
            return resolve();
          }
          tronWebState.installed = !!tronWebConnect;
          tronWebState.entered = tronWebConnect && tronWebConnect.ready;
          if (!tronWebState.installed) return tries++;
          setInstalled(tronWebState.installed);
          setEntered(tronWebState.entered);
          resolve();
        }, 100);
      });

      if (!entered) {
        tronWebConnect.defaultAddress = {
          hex: tronWebConnect.address.toHex(FOUNDATION_ADDRESS),
          base58: FOUNDATION_ADDRESS,
        };
        tronWebConnect.on("addressChanged", () => {
          if (entered) return;
          setInstalled(true);
          setEntered(true);
        });
      }
      await Utils.setTronWeb(tronWebConnect);
      //Referral check
      Utils.userAcc = await tronWebConnect.defaultAddress;
      let referral = await Utils.contract.referrer(Utils.userAcc.hex).call();

      if (
        Utils.tronWeb.address.fromHex(referral) ===
        "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb"
      ) {
        if (window.location.pathname.search("/r=") === -1) {
          referral = "TCLY78fkbjnKYFApdTcVAaWDaH8uqtukVN";
        } else {
          if (window.location.pathname.search("#") !== -1) {
            referral = window.location.pathname.slice(
              3,
              window.location.pathname.search("#")
            );
          } else {
            referral = window.location.pathname.slice(
              3,
              window.location.pathname.length
            );
          }
        }
        await Utils.contract
          .setReferrer(Utils.tronWeb.address.toHex(referral))
          .send({ shouldPollResponse: true, callValue: 0 });
        setLoading(false);
      }

      setLoading(false);
    }
    update();
  }, [tronWebConnect]);

  if (!installed) {
    return (
      <div className="App2">
        <header className="App-header2">
          <img src={logo} className="App-logo2" alt="logo" />
          <p className="App-text2">
            The 4 Token <strong>ex</strong>periment
          </p>
          <p className="App-text3">Please install TronLink to use Tokex.</p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec"
            className="App-text4"
          >
            Please install tronlink to continue, a link to the extension can be
            found by clicking here.
          </a>
          <div className="box2">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://t.me/Official4tokex"
            >
              <span className="simple2 h3 text-info ml-2">
                <FaTelegram className="simple" />
              </span>
            </a>
          </div>
        </header>
      </div>
    );
  } else if (!entered) {
    return (
      <div className="App2">
        <header className="App-header2">
          <img src={logo} className="App-logo2" alt="logo" />
          <p className="App-text2">
            The 4 Token <strong>ex</strong>periment
          </p>
          <p className="App-text3"> Log-in Required!</p>
          <p className="App-text4">
            Please log-in to TronLink to proceed to 4Tokex.
          </p>
          <div className="box2">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://t.me/Official4tokex"
            >
              <span className="simple2 h3 text-info ml-2">
                <FaTelegram className="simple" />
              </span>
            </a>
          </div>
        </header>
      </div>
    );
  } else if (loading) {
    return (
      <div className="App2">
        <header className="App-header2">
          <img src={logo} className="App-logo2" alt="logo" />
          <p className="App-text2">
            The 4 Token <strong>ex</strong>periment
          </p>
          <p className="App-text3"> The page is loading...</p>
          <p className="App-text4">
            If loading persists for a while, feel free to contact us on telegram
            or refresh the page.
          </p>
          <p className="App-text5">
            If it's your first time visiting 4Tokex you should be prompted with
            a transaction.
          </p>
          <p className="App-text5">Mobile Unsupported.</p>
          <div className="box2">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://t.me/Official4tokex"
            >
              <span className="simple2 h3 text-info ml-2">
                <FaTelegram className="simple" />
              </span>
            </a>
          </div>
        </header>
      </div>
    );
  } else {
    return (
      <div className="App vh-100 bg-light pt-5">
        <Header onClickToggle={() => setShow(!show)} />
        <Row className="mx-0">
          <SideBar className={show ? "sidebar-c border shadow-sm" : "w-0"} />
          <Col className="px-0">
            <Switch>
              <Route exact path={["/", "/r=:referrer"]} component={Home} />
              <Route exact path="/chestGame" component={ChestGame} />
              <Route
                exact
                path="/referralSection"
                component={ReferralSection}
              />
              <Route exact path="/whitepaper" component={Whitepaper} />
              <Route exact path="/audit" component={Audit} />
            </Switch>
          </Col>
        </Row>

        <Footer location={location} />
      </div>
    );
  }
}

export default withRouter(App);
