import React from "react";
import { Link } from "react-router-dom";
import { GiDiamonds, GiPaintBrush, GiTreasureMap } from "react-icons/gi"; // Importing icons

export const MarketplaceSidebar = () => {
  return (
    <div className="bg-gray-800 text-gray-200 w-64 mt-3 min-h-[70vh] p-6">
      <ul className="space-y-6">
        <SidebarItem icon={GiDiamonds} title="Perk Types" to="/perk-types" />
        <SidebarItem icon={GiPaintBrush} title="Creators" to="/creators" />
        <SidebarItem
          icon={GiTreasureMap}
          title="Collections"
          to="/collections"
        />
      </ul>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, title, to }) => {
  return (
    <li className="flex items-center gap-4 hover:bg-gray-700 p-3 rounded-md">
      <Icon className="text-xl" />
      <div className="text-lg font-medium">{title}</div>
    </li>
  );
};

export default MarketplaceSidebar;
