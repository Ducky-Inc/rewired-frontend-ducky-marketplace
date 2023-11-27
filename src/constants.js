export const CONSTANTS = {
  ROUTES: {
    HOME: "/",
    MARKETPLACE: "/marketplace",
    OWNED_ASSETS: "/profile/assets",
    NEW_ASSET: "/profile/assets/new",
    CREATOR_DASHBOARD: "/creator/dashboard",
  },
  NAVBAR: {
    NAVBAR_LINKS: [
      {
        name: "Home",
        path: "/",
      },
      {
        name: "Marketplace",
        path: "/marketplace",
      },
    ],
  },
  HOME: {
    CARDS: [
      {
        name: "Card 1",
        description: "This is card 1",
        price: "1",
      },
    ],
  },
  BACKEND_URL: process.env.REACT_APP_BACKEND_URL_PROD
    ? process.env.REACT_APP_BACKEND_URL_PROD
    : process.env.REACT_APP_BACKEND_URL_DEV,

  ENDPOINT: {
    GET_ALL_ASSETS: "/asset/all",
  },

  DUCKY_FACTORY_ADDRESS: "0x6028Bd7bA60e4B985698E22beD1D3E0aac77D9F0",
  DUCKY_MARKETPLACE_PUBKEY: "0x196C2ddACA4d57D0DC72B5de6b9A6F38E6A547e3",
};

console.log("process.env.NODE_ENV", process.env.REACT_APP_BACKEND_URL_PROD);
