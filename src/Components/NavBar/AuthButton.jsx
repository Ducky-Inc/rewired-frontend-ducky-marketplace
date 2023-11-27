import {useState, useTimeout} from "react";
import {useWalletProvider} from "../../contexts/WalletProvider";
import {useAlert} from "../../contexts/AlertProvider";

import LoadingSpinner from "../Loading/LoadingSpinner";

export const AuthButton = () => {
  const {signInWithEthereum, sendForVerification, authenticated, logout, authRunning} =
    useWalletProvider();
  const {updateMessage} = useAlert();

  const [loading, setLoading] = useState(false);

  const style = {
    position: "absolute",
    color: "white",
    fontSize: "1.3em",
    height: "2.4em",
    minWidth: "9.7em",
    padding: "0.3em 0.7em",
    backgroundColor: "rgb(65, 51, 196)",
    border: " 0.15em solid rgb(65, 51, 196)",
    borderRadius: "2em",
  };

  return (
    <button
      disabled={loading}
      style={style}
      onClick={async () => {
        setLoading(true);
        if (!authenticated) {
          await signInWithEthereum();
          await sendForVerification();
          updateMessage("Login succeeded!");
          setLoading(false);
        } else {
          await logout().then(res => {
            console.log(res);
            if (res) {
              updateMessage("Logged out!");
            } else {
              updateMessage("Error logging out, please try again.");
            }
            setLoading(false);
          });
        }
      }}
      className=" sm:right-10 sm:top-10 invisible sm:visible hover:scale-105 active:brightness-75">
      <p className="whitespace-nowrap">
        {authRunning ? <LoadingSpinner /> : <LoadingSpinner hidden={!loading} />}
        {!authenticated ? " Login" : " Logout"}
      </p>
    </button>
  );
};
export default AuthButton;