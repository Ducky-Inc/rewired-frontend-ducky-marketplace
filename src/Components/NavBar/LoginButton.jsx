import {useEffect, useState} from "react";
import LoadingSpinner from "../Loading/LoadingSpinner";
import {useWalletProvider} from "../../contexts/WalletProvider";
import {useAlert} from "../../contexts/AlertProvider";

const style = {
  position: "absolute",
  color: "white",
  fontSize: "1.3em",
  height: "2.4em",
  padding: "0.3em 0.7em",
  backgroundColor: "rgb(65, 51, 196)",
  border: " 0.15em solid rgb(65, 51, 196)",
  borderRadius: "2em",
};

export default function LoginButton() {
  const {connectWallet} = useWalletProvider();
  const {updateMessage} = useAlert();

  const [loading, setLoading] = useState(false);

  useEffect(() => {});
  return (
    <button
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        await connectWallet().then(login => {
          if (!login) {
            updateMessage("Error connecting wallet...");
          }
          setLoading(false);
        });
      }}
      className=" sm:right-10 sm:top-10 invisible sm:visible hover:scale-105 active:brightness-75"
      style={style}>
      <p className="whitespace-nowrap  ">
        <LoadingSpinner hidden={!loading} />
        Connect Wallet
      </p>
    </button>
  );
}