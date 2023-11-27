import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
//import ERC725 from "@erc725/erc725.js";
//import erc725schema from "@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json";

import { ethers } from "ethers";
import { SiweMessage } from "siwe";

//const RPC_ENDPOINT = "https://rpc.l16.lukso.network";
//const IPFS_GATEWAY = "https://2eff.lukso.dev/ipfs/";
const domain = window.location.host;
const origin = window.location.origin;
const BACKEND_ADDR = origin;

let provider = window.ethereum
  ? new ethers.providers.Web3Provider(window.ethereum)
  : null;
if (window.ethereum && window.ethereum.providers?.length) {
  //Sets provider to use metamask if there's more than one extention, can swap for up here in the future
  window.ethereum.providers.forEach(async (p) => {
    if (p.isMetaMask) provider = p;
  });
}
const signer = window.ethereum ? provider.getSigner() : null;
const walletContext = createContext();

export default function WalletProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [walletAddress, setWallet] = useState();
  const [roles, setRoles] = useState(["None"]);

  //const [profile, setProfile] = useState({});
  let messageRef = useRef();
  let signatureRef = useRef();
  let nonce = useRef();

  useEffect(() => {
    (async () => {
      try {
        setWallet(await signer.getAddress());
      } catch (err) {
        return;
      }
    })();
  }, []);

  let checkAuthRunning = useRef(false);
  const authRunning = checkAuthRunning.current;

  const checkAuth = async () => {
    if (checkAuthRunning.current === false) {
      checkAuthRunning.current = true;
      let response = await fetch(`${BACKEND_ADDR}/api/auth/checkauth`, {
        "Content-Type": "application/json",
        credentials: "include",
      });
      if (response.status === 200) {
        setAuthenticated(true);
        let res = await response.json();
        checkAuthRunning.current = false;
        return res.roles;
      } else {
        setAuthenticated(false);
        checkAuthRunning.current = false;
        return false;
      }
    }
  };

  useEffect(() => {
    try {
      checkAuth().then((res) => {
        if (res) {
          setRoles(res);
        } else {
          setRoles(["None"]);
        }
      });
    } catch (err) {
      setAuthenticated(false);
      console.log(err);
    }
  }, [walletAddress, authenticated]);

  const logout = useCallback(async () => {
    await fetch(`${BACKEND_ADDR}/api/auth/logout`, {
      "Content-Type": "application/json",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          setRoles(null);
          setAuthenticated(false);
          return true;
        } else {
          setRoles(null);
          setAuthenticated(false);
          return false;
        }
      })
      .catch((err) => {
        setRoles(null);
        setAuthenticated(false);
        return false;
      });
    signatureRef.current = undefined;
    return true;
  }, []);

  const connectWallet = useCallback(async () => {
    if (provider === null) {
      alert("No browser extention detected");
      return false;
    }
    provider
      .send("eth_requestAccounts", [])
      .then((res) => {
        signer.getAddress().then(() => {
          setWallet(res);
          return true;
        });
      })
      .catch((err) => console.log("user rejected request"));
    return true;
  }, []);

  const createMessage = useCallback(async (address, statement) => {
    await fetch(`${BACKEND_ADDR}/api/auth/nonce`, {
      "Content-Type": "application/json",
      credentials: "include",
    })
      .then((res) => res.text())
      .then((res) => {
        nonce.current = res;
        console.log(nonce.current);
      });
    // ETH compatable, switch chainID etc for lukso
    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: "1",
      chainId: "1",
      nonce: nonce.current,
    });

    messageRef.current = message.prepareMessage();
    return messageRef.current;
    //gg
  }, []);

  /*
      Note: Up browser extention doesn't support signMessage(), please use  provider.send("eth_sign", [upAddress, message])
      
      //let wallet = await signer.getAddress();
      //await provider.send("eth_sign", [wallet, message]); // works for UP
  */
  const signInWithEthereum = useCallback(async () => {
    try {
      messageRef.current = await createMessage(
        await signer.getAddress(),
        "Sign in with Ethereum to the app."
      );
      signatureRef.current = await signer.signMessage(messageRef.current); // works for metamask
    } catch (err) {
      console.log("Error: failed to fire signer.signMessage(message)");
      alert(
        "Failed to sign message, please verify you are using metamask and try again"
      );
    }
    //gg
  }, [createMessage]);

  const sendForVerification = useCallback(async () => {
    try {
      const message = messageRef.current;
      const signature = signatureRef.current;
      const res = await fetch(`${BACKEND_ADDR}/api/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, signature }),
        credentials: "include",
      });
      //console.log(res);

      setAuthenticated(true);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const values = useMemo(() => {
    return {
      authRunning,
      walletAddress,
      logout,
      createMessage,
      connectWallet,
      signInWithEthereum,
      sendForVerification,
      authenticated,
      roles,
    };
  }, [
    authRunning,
    walletAddress,
    logout,
    createMessage,
    connectWallet,
    signInWithEthereum,
    sendForVerification,
    authenticated,
    roles,
  ]);

  return (
    <walletContext.Provider value={values}>{children}</walletContext.Provider>
  );
}

export const useWalletProvider = () => useContext(walletContext);
