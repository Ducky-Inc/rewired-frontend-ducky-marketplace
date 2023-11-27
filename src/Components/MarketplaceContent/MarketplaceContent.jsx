import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CONSTANTS } from "../../constants";

import { Label } from "../../Components/Label/Label";

export const MarketplaceContent = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    fetch(CONSTANTS.BACKEND_URL + CONSTANTS.ENDPOINT.GET_ALL_ASSETS, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of assets
        setAssets(data);
      })
      .catch((error) => {
        console.error("Error fetching assets:", error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 mt-3 min-h-[79vh]">
      <h1 className="text-4xl font-bold pb-6">Collections</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {assets.map((asset, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white">
              {asset.name || "Unnamed Asset"}
            </h3>
            <p className="text-gray-400 mb-2">
              Description: {asset.description || "No description available"}
            </p>

            <p className="text-gray-400  mt-6">Perks:</p>
            {asset.perks &&
              asset.perks
                .filter((perk, i) => {
                  // we don't want duplicates of the same name
                  return (
                    asset.perks.findIndex(
                      (p) => p.perkName === perk.perkName
                    ) === i
                  );
                })
                .map((perk) => (
                  <Label title={`${perk.perkName || "Unnamed Perk"}`} />
                ))}
            <p className="text-gray-400 mb-2 mt-6">
              Creator: {asset.creator || "Unknown"}
            </p>
            <Link
              to={`/assets/${asset.address}`}
              className="text-blue-500 hover:text-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceContent;
