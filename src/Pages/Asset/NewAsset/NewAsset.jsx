import React, { useState } from "react";
import { ethers } from "ethers";
import { useWalletProvider } from "../../../contexts/WalletProvider";
import { CONSTANTS } from "../../../constants";

//Deploys a new asset using our factory contract
export const NewAsset = () => {
  const {
    authRunning,
    walletAddress,
    logout,
    createMessage,
    connectWallet,
    signInWithEthereum,
    sendForVerification,
    authenticated,
    roles,
  } = useWalletProvider();
  const [formData, setFormData] = useState({
    assetName: "",
    description: "",
    imageUrl: "",
  });

  //Fetch the address of the factory contract from the backend or use the hardcoded address
  // const contractAddress = "YOUR_CONTRACT_ADDRESS";
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Factory contract ABI and address
      const factoryContractABI = [
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "assetAddress",
              type: "address",
            },
          ],
          name: "AssetCreated",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "string",
              name: "symbol",
              type: "string",
            },
            {
              internalType: "address",
              name: "traitController",
              type: "address",
            },
          ],
          name: "createDuckyAsset",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ]; // ABI for the DuckyAssetFactory
      const factoryContractAddress = CONSTANTS.DUCKY_FACTORY_ADDRESS;

      const factoryContract = new ethers.Contract(
        factoryContractAddress,
        factoryContractABI,
        signer
      );

      // backend of Ducky Marketplace
      let traitControler = CONSTANTS.DUCKY_MARKETPLACE_PUBKEY;
      // Call the createDuckyAsset function of the factory
      // You might need to adjust this call based on your factory method's signature
      const transaction = await factoryContract.createDuckyAsset(
        formData.assetName,
        formData.tokenSymbol,
        traitControler
      );

      await transaction.wait();

      // Redirect or handle post-mint logic here
      // history.push("/add-perk");
    } catch (error) {
      console.error("Error minting new asset:", error);
      alert("An error occurred while minting the new asset.");
    }
    // Here you can integrate with the backend or smart contract
    console.log("Form Data: ", formData);
    // You can call a factory contract function or prepare data for MetaMask here
    // Create a new asset using metadata

    // history.push("/add-perk"); // Adjust the path as per your route configuration
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-6">Mint a New Asset</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="assetName"
            className="block text-sm font-medium text-gray-700"
          >
            Asset Name
          </label>
          <input
            type="text"
            name="assetName"
            id="assetName"
            value={formData.assetName}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="assetName"
            className="block text-sm font-medium text-gray-700"
          >
            Token Symbol
          </label>
          <textarea
            name="tokenSymbol"
            id="tokenSymbol"
            rows="4"
            value={formData.tokenSymbol}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Mint Asset
        </button>
      </form>

      <footer className="py-6 text-center text-sm bg-gray-800 text-white mt-6">
        <p>
          &copy; {new Date().getFullYear()} Ducky Marketplace. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default NewAsset;
