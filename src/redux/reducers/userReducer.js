let initState = {
  isUserAuthenticated: false,
  currentUserStatus: "",
  userAccountAddress: "",
  metaMaskDecentralized: {},
  oneTokenPrice: "",
  eatherInUsdt: "",
  userPersonalBalance: "",
  totalReferralsCount: "",
  earnings: "",
  totalWithdrawn: "",
  availableWithdrawn: "",
  atStake: "",
  registeredDate: "",
  userWalletEthBalance: "",
  bonusBalanceAndAvailableRefReward: "",
  withdrawRef: "",
  totalReward: "",
  allRecentReferrals: "",
  allRecentStake: "",
  waveCurrentPrice: "",
  stakingDcentralized: "",
  withoutwaveCurrentPrice: "",
  supplyValue: null,
};

export const UserReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SUPPLY_VALUE":
      return {
        ...state,
        supplyValue: payload,
      };
    case "METAMASK_STAKING_DCENTRALIZED":
      return {
        ...state,
        stakingDcentralized: payload,
      };
    case "ChargeV2_CURRENT_PRICE":
      return {
        ...state,
        waveCurrentPrice: payload,
      };

    case "WITHOUT_ChargeV2_CURRENT_PRICE":
      return {
        ...state,
        withoutwaveCurrentPrice: payload,
      };

    case "STORE_ALL_STAKES":
      return {
        ...state,
        allRecentStake: payload,
      };
    case "RECENT_ALL_REFERRALS":
      return {
        ...state,
        allRecentReferrals: payload,
      };
    case "TOTAL_REWARD":
      return {
        ...state,
        totalReward: payload,
      };
    case "REFERRAL_TOTAL_WITHDRAWN":
      return {
        ...state,
        withdrawRef: payload,
      };
    case "BONUS_BALANCE_AND_REFERRAL_WITHDRAW":
      return {
        ...state,
        bonusBalanceAndAvailableRefReward: payload,
      };
    case "USER_ETH_WALLET_BALANCE":
      return {
        ...state,
        userWalletEthBalance: payload,
      };
    case "START_DATE":
      return {
        ...state,
        registeredDate: payload,
      };
    case "AT_STAKE":
      return {
        ...state,
        atStake: payload,
      };
    case "USER_TOTAL_WITHDRAWN":
      return {
        ...state,
        totalWithdrawn: payload,
      };

    case "AVAILABLE_WITHDRAWN":
      return {
        ...state,
        availableWithdrawn: payload,
      };
    case "EARNINGS":
      return {
        ...state,
        earnings: payload,
      };
    case "TOTAL_REFERRALS_COUNT":
      return {
        ...state,
        totalReferralsCount: payload,
      };
    case "USER_PERSONAL_BALANCE":
      return {
        ...state,
        userPersonalBalance: payload,
      };
    case "EATHER_IN_USDT":
      return {
        ...state,
        eatherInUsdt: payload,
      };
    case "ONE_TOKEN_PRICE":
      return {
        ...state,
        oneTokenPrice: payload,
      };
    case "USER_METAMASK_ACCOUNT":
      return {
        ...state,
        userAccountAddress: payload,
      };
    case "METAMASK_DECENTRALIZED":
      return {
        ...state,
        metaMaskDecentralized: payload,
      };
    case "USER_AUTHENTICATED":
      return {
        ...state,
        isUserAuthenticated: true,
        currentUserStatus: "done",
      };
    case "AUTHENTICATED_FAILED":
      return {
        ...state,
        isUserAuthenticated: false,
        currentUserStatus: "not done",
      };

    case "LOGOUT":
      return {
        ...state,
        isUserAuthenticated: false,
        currentUserStatus: "not done",
      };
    default:
      return state;
  }
};
