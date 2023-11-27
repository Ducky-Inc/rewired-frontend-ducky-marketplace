import React from "react";
import { Link } from "react-router-dom";

import MarketplaceSidebar from "../../Components/MarketplaceSidebar/MarketplaceSidebar";
import MarketplaceContent from "../../Components/MarketplaceContent/MarketplaceContent";

export const Marketplace = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4">
          <MarketplaceSidebar />
        </div>
        <div className="w-full md:w-3/4">
          <MarketplaceContent />
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

export default Marketplace;
