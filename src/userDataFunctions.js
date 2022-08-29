// import { environment } from "./environment";
import store from "./redux/store";
import axios from "axios";
import { toast } from "react-toastify";
import Web3 from "web3";
import { environment } from "./environment";

const web3 = new Web3(Web3.givenProvider || "http://localhost8545");
let supplyVal = "";
export const getUserData = async (
  metaMastAcc,
  dcentralized,
  stakingDcentralized
) => {
  // console.log("here is the error=====>,",stakingDcentralized)
  //user wallet balance
  const userWalletBalance = 20;
  // await web3.eth.getBalance(metaMastAcc);

  //meta mask acc
  store.dispatch({
    type: "USER_METAMASK_ACCOUNT",
    payload: metaMastAcc,
  });

  //supply
  // await dcentralized.methods
  // .owner()
  // .call()
  // .then(async (val) => {
  //   await dcentralized.methods
  //     .getSupply()
  //     .call({ from: val })
  //     .then((value) => {
  //       let final = web3.utils.fromWei(value);
  //       supplyVal = web3.utils.fromWei(value);
  //       if (final >= 950000 && final <= 1000000) {
  //         store.dispatch({
  //           type: "SUPPLY_VALUE",
  //           payload: true,
  //         });
  //       } else {
  //         store.dispatch({
  //           type: "SUPPLY_VALUE",
  //           payload: false,
  //         });
  //       }
  //     });
  // });

  //token to tron value0.1
  // await dcentralized.methods
  //   .tokenToEthereum(JSON.stringify(Number(1 + "000000000")))
  //   .call()
  //   .then((val) => {
  //     // let finalVal = null;
  //     // if (supplyVal >= 950000 && supplyVal <= 1000000) {
  //     //   finalVal = JSON.stringify(Number(val + "0"));
  //     // } else {
  //     //   finalVal = val;
  //     // }

  //     store.dispatch({
  //       type: "ChargeV2_CURRENT_PRICE",
  //       payload: web3.utils.fromWei(val),
  //     });

  //     store.dispatch({
  //       type: "WITHOUT_ChargeV2_CURRENT_PRICE",
  //       payload: val,
  //     });
  //   });

  //user eth balance
  // store.dispatch({
  //   type: "USER_ETH_WALLET_BALANCE",
  //   payload: web3.utils.fromWei(userWalletBalance),
  // });

  //user all stakes
  let storeAllStakes = [];
  let counting = 0;

  // await stakingDcentralized.methods
  //   .getUserAmountOfDeposits(metaMastAcc)
  //   .call()
  //   .then(async (val) => {
  //     for (let i = 0; i < val; i++) {
  //       await stakingDcentralized.methods
  //         .getUserDepositInfo(metaMastAcc, i)
  //         .call()
  //         .then(async (value) => {
  //           // let basePercent = value[3];
  //           // console.log("here is the base percent",basePercent);
  //           // let amount = web3.utils.fromWei(value[0]);
  //           // counting += ((amount * basePercent) / 10000)/86400;
  //           // console.log("here is the counting===>", counting  );

  //           let obj = {
  //             amount: web3.utils.fromWei(value[0]),
  //             reward: value[1],
  //             startDate: value[2],
  //             dueDate: value[4],
  //             daysSelected: value[5],
  //           };
  //           // console.log("here is the object===>", obj);
  //           storeAllStakes.push(obj);
  //         });
  //     }
  //   });

  if (storeAllStakes.length) {
    // console.log("here are the total values===>", counting.toFixed(10));

    // console.log("here are the all stakes===>", storeAllStakes);
    store.dispatch({
      type: "STORE_ALL_STAKES",
      payload: storeAllStakes,
    });
  }

  //recent referrals
  // let storeRecentRefs = [];
  // await dcentralized.methods
  //   .totalReferals(metaMastAcc)
  //   .call()
  //   .then(async (val) => {
  //     for (let i = 0; i < val.length; i++) {
  //       await dcentralized.methods
  //         .refusers(val[i])
  //         .call()
  //         .then((value) => {
  //           let obj = {
  //             add: val[i],
  //             date: value.start,
  //           };
  //           storeRecentRefs.push(obj);
  //         });
  //     }
  //   });

  // if (storeRecentRefs.length) {
  //   store.dispatch({
  //     type: "RECENT_ALL_REFERRALS",
  //     payload: storeRecentRefs,
  //   });
  // }

  //calling price
  const price = await dcentralized.methods.price().call();
  store.dispatch({
    type: "ONE_TOKEN_PRICE",
    payload: web3.utils.fromWei(price),
  });

  //user personal balance
  const balance = await dcentralized.methods.balanceOf(metaMastAcc).call();
  store.dispatch({
    type: "USER_PERSONAL_BALANCE",
    payload: balance / 1000000000,
  });

  //ref users struct
  await dcentralized.methods
    .refusers(metaMastAcc)
    .call()
    .then((val) => {
      //total referrals count
      store.dispatch({
        type: "TOTAL_REFERRALS_COUNT",
        payload: val.reffrals,
      });

      //earnings
      store.dispatch({
        type: "EARNINGS",
        payload: val.bonus,
      });

      //registered date
      store.dispatch({
        type: "START_DATE",
        payload: val.start,
      });

      //total withdraw ref
      store.dispatch({
        type: "REFERRAL_TOTAL_WITHDRAWN",
        payload: web3.utils.fromWei(val.withdrawRef),
      });
    });

  //user total withdrawn
  await stakingDcentralized.methods
    .getUserTotalWithdrawn(metaMastAcc)
    .call()
    .then((val) => {
      store.dispatch({
        type: "USER_TOTAL_WITHDRAWN",
        payload: web3.utils.fromWei(val),
      });
    });

  //at stake
  await stakingDcentralized.methods
    .getUserTotalDeposits(metaMastAcc)
    .call()
    .then((val) => {
      store.dispatch({
        type: "AT_STAKE",
        payload: web3.utils.fromWei(val),
      });
    });
};

export const TotalRewardsFunction = async (
  metaMastAcc,
  stakingDcentralized,
  dcentralized
) => {};

// get available balance and withdrawn
// export const TotalAvailableAndTotalWithdrawn = async (
//   defaultAddress,
//   tronweb
// ) => {
//   if (defaultAddress) {
//     await tronweb
//       .contract()
//       .at(environment.contractAddress)
//       .then(async (contract) => {
//         //user total withdrawn
//         await contract
//           .getUserTotalWithdrawn(defaultAddress)
//           .call()
//           .then((val) => {
//             store.dispatch({
//               type: "USER_TOTAL_WITHDRAWN",
//               payload: tronweb.fromSun(val),
//             });
//           });

//         //available withdrwan
//         await contract
//           .getUserAvailable(defaultAddress)
//           .call()
//           .then((val) => {
//             store.dispatch({
//               type: "AVAILABLE_WITHDRAWN",
//               payload: tronweb.fromSun(val),
//             });
//           });
//       });
//   }
// };

//buy token
export const BuyToken = async (
  dCenter,
  numberOfTokens,
  userAccountAddress,
  closeTheModal,
  amount,
  stakingDcentralized,
  getVal,
  ManageLoader
) => {
  let getRefAddress = localStorage.getItem("_ChargeV2_REF_ADD");
  let getDirectFromUrl;

  let url = window.location.href;

  if (url.includes("?ref=")) {
    let getAddress = window.location.href.split("?ref=")[1];
    let final = getAddress.slice(0, 42);
    getDirectFromUrl = final;
  }

  // getVal,
  await dCenter.methods
    .buyTokens(
      (numberOfTokens * 1000000000).toString(),
      getDirectFromUrl
        ? getDirectFromUrl
        : getRefAddress
        ? getRefAddress
        : environment.defaultRefAddress
    )
    .send({
      from: userAccountAddress,
      value: amount,
      gas: 5000000,
      gasPrice: web3.utils.toWei("2", "gwei"),
    })
    .then(() => {
      toast.success("bought successfully!");
      if (closeTheModal) {
        closeTheModal(true);
      }
      if (ManageLoader) {
        ManageLoader(false);
      }
      getUserData(userAccountAddress, dCenter, stakingDcentralized);
    })
    .catch((err) => {
      ManageLoader(false);
      // console.log("here is the error", err);
    });
};

//sell token
export const SellToken = async (
  dCenter,
  numberOfTokens,
  userAccountAddress,
  closeTheModal,
  amount,
  stakingDcentralized,
  getVal,
  ManageLoader
) => {
  await dCenter.methods
    .sellTokens(
      JSON.stringify(numberOfTokens * 1000000000),
      amount
      // getVal
    )
    .send({
      from: userAccountAddress,
      gas: 5000000,
      gasPrice: web3.utils.toWei("2", "gwei"),
    })
    .then(() => {
      toast.success("sold successfully!");
      if (closeTheModal) {
        closeTheModal(true);
      }
      if (ManageLoader) {
        ManageLoader(false);
      }
      getUserData(userAccountAddress, dCenter, stakingDcentralized);
    })
    .catch((err) => {
      if (ManageLoader) {
        ManageLoader(false);
      }
      // console.log("here is the error", err);
    });
};

//stake tokens
export const StakeToken = async (
  dCenter,
  numberOfTokens,
  userAccountAddress,
  closeTheModal,
  getDate,
  stakingDcentralized,
  ManageLoader
) => {
  // console.log("here is the date===>", getDate, "=======>", numberOfTokens);
  await dCenter.methods
    .approve(environment.REACT_APP_STAKE_ADDRESS, numberOfTokens)
    .send({
      from: userAccountAddress,
      gas: 5000000,
      gasPrice: web3.utils.toWei("2", "gwei"),
    })
    .then(async () => {
      await stakingDcentralized.methods
        .invest(numberOfTokens, getDate)
        .send({
          from: userAccountAddress,
          gas: 5000000,
          gasPrice: web3.utils.toWei("2", "gwei"),
        })
        .then(() => {
          toast.success("staked successfully!");
          if (closeTheModal) {
            closeTheModal(true);
          }
          if (ManageLoader) {
            ManageLoader(false);
          }
          getUserData(userAccountAddress, dCenter, stakingDcentralized);
        })
        .catch((err) => {
          if (ManageLoader) {
            ManageLoader(false);
          }
          // console.log("here is the error", err);
        });
    })
    .catch((err) => {
      if (ManageLoader) {
        ManageLoader(false);
      }
    });
};

export const UstakeToken = async (contract, tronWeb) => {
  await contract
    .unstake()
    .send()
    .then(() => {
      getUserData(tronWeb.defaultAddress.base58, tronWeb);
    });
};

//withdraw stake earning
export const WithDrawStakeEarning = async (
  dCenter,
  userAccountAddress,
  stakingDcentralized
) => {
  await stakingDcentralized.methods
    .withdraw()
    .send({
      from: userAccountAddress,
      gas: 5000000,
      gasPrice: web3.utils.toWei("2", "gwei"),
    })
    .then(() => {
      getUserData(userAccountAddress, dCenter, stakingDcentralized);
    });
};

//withdraw referral reward
export const WithDrawReferralReward = async (
  dCenter,
  userAccountAddress,
  stakingDcentralized
) => {
  // console.log("here=====>", userAccountAddress);
  await dCenter.methods
    .withdrawRefferalReward()
    .send({
      from: userAccountAddress,
      gas: 5000000,
      gasPrice: web3.utils.toWei("2", "gwei"),
    })
    .then(() => {
      getUserData(userAccountAddress, dCenter, stakingDcentralized);
    });
};
