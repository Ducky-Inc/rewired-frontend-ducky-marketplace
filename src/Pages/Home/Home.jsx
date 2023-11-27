import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center py-20 bg-gray-100">
        <h1 className="text-5xl font-bold">Welcome to Ducky Marketplace</h1>
        <p className="text-xl mt-4">
          Explore, create, and trade digital assets on the blockchain.
        </p>
        <Link
          to="/marketplace"
          className="mt-8 inline-block bg-blue-500 text-white py-3 px-6 rounded-full text-lg hover:bg-blue-700 transition duration-300"
        >
          Explore Marketplace
        </Link>
      </div>

      <div className="py-20">
        <h2 className="text-4xl font-bold text-center">
          Why Ducky Marketplace?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <h3 className="text-2xl font-semibold">Discover Unique Assets</h3>
            <p className="mt-4">
              Find one-of-a-kind digital items and collectibles.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold">Create and Mint</h3>
            <p className="mt-4">Easily create and list your digital assets.</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold">Secure Transactions</h3>
            <p className="mt-4">
              Trade with confidence on a secure blockchain platform.
            </p>
          </div>
        </div>
      </div>

      <div className="py-20 bg-gray-200">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold">About Ducky Marketplace</h2>
          <p className="mt-4 text-xl">
            Ducky Marketplace is a decentralized platform for buying, selling,
            and trading digital assets. Our mission is to empower creators and
            collectors in the digital economy.
          </p>
        </div>
      </div>

      <div className="py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Start Exploring Today!</h2>
          {/* <Link
            to="/sign-up"
            className="mt-8 inline-block bg-green-500 text-black py-3 px-6 rounded-full text-lg hover:bg-green-700 transition duration-300"
          >
            Sign Up
          </Link> */}
        </div>
      </div>

      <footer className="py-6 text-center text-sm bg-gray-800 text-black">
        <p>
          &copy; {new Date().getFullYear()} Ducky Marketplace. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
