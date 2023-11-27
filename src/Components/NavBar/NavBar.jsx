import { useState } from "react";
import { useWalletProvider } from "../../contexts/WalletProvider";
import LoginButton from "./LoginButton";
import AuthButton from "./AuthButton";
import MenuButton from "./MenuButton";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { CONSTANTS } from "../../constants";

export const NavBar = () => {
  const [isHidden, setIsHidden] = useState(true);
  const { walletAddress, roles } = useWalletProvider();

  return (
    <>
      <div className={styles.navBar}>
        <MenuButton setIsHidden={setIsHidden} isHidden={isHidden} />
        {walletAddress ? <AuthButton /> : <LoginButton />}
      </div>
      <MenuContainer isHidden={isHidden} roles={roles} />
    </>
  );
};

const MenuContainer = ({ isHidden, roles }) => {
  return (
    <div
      hidden={isHidden}
      className="bg-black text-white pb-3 relative  ease-in-out transition-skew duration-700"
    >
      <div className=" mx-10 sm:flex justify-between w-[70vw]  ">
        <div>
          <p className="text-base uppercase  mt-3 "></p>
          <ul
            className={`${styles.navigation} text-4xl text-md uppercase mt-1 tracking-[-0.05em] mr-2`}
          >
            <Link to="/">
              <li className=" hover:text-pink active:brightness-75 hover:skew-x-3">
                Home
              </li>
            </Link>
            <p className="text-base uppercase  mt-3 "></p>

            <Link to={CONSTANTS.ROUTES.CREATOR_DASHBOARD}>
              <li className=" hover:text-pink active:brightness-75 hover:skew-x-3">
                Creator Dashboard
              </li>
            </Link>
            <p className="text-base uppercase  mt-3 "></p>

            <Link to={CONSTANTS.ROUTES.MARKETPLACE}>
              <li className=" hover:text-pink active:brightness-75 hover:skew-x-3">
                Marketplace
              </li>
            </Link>
          </ul>
        </div>

        <div>
          <p className="text-base uppercase mt-6 sm:mt-3 "></p>
        </div>
        <div>
          <p className="text-base uppercase mt-6 sm:mt-3 "></p>
          <ul
            className={`${styles.navigation} text-4xl text-md uppercase  mt-1 tracking-[-0.05em]`}
          ></ul>
          <p className="text-base uppercase mt-6 sm:mt-3 "></p>
          <ul
            className={`${styles.navigation} text-4xl text-md uppercase  mt-1 tracking-[-0.05em]`}
          >
            <Link to={CONSTANTS.ROUTES.OWNED_ASSETS}>
              <li className=" hover:text-pink active:brightness-75 hover:skew-x-3">
                View Owned Assets
              </li>
            </Link>
          </ul>
          <ul
            className={`${styles.navigation} text-4xl text-md uppercase  mt-1 tracking-[-0.05em]`}
          >
            <p className="text-base uppercase  mt-3 "></p>

            <Link to={CONSTANTS.ROUTES.NEW_ASSET}>
              <li className=" hover:text-pink active:brightness-75 hover:skew-x-3">
                Mint a new Asset
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

// const MenuContainer = ({isHidden, roles}) => {
//   return (
//     <div
//       hidden={isHidden}
//       className="bg-black text-white pb-3 relative  ease-in-out transition-skew duration-700">
//       <div className=" mx-10 sm:flex justify-between w-[70vw] md:w-[30em] ">
//         <div>
//           {/* existing content */}
//         </div>
//         <div>
//           {/* existing content */}
//         </div>
//         {/* add two new divs here */}
//         <div>
//           <p className="text-base uppercase mt-6 sm:mt-3 ">Inquiries</p>
//           <ul
//             className={`${styles.navigation} text-4xl text-md uppercase  mt-1 tracking-[-0.05em]`}>
//             <Link to="/#">
//               <li className=" hover:text-pink active:brightness-75 hover:skew-x-3">Contact us</li>
//             </Link>
//             <Link to="/#">
//               <li className=" hover:text-pink active:brightness-75 hover:skew-x-3">Support</li>
//             </Link>
//           </ul>
//         </div>
//         <div>
//           <p className="text-base uppercase mt-6 sm:mt-3 ">Get Involved</p>
//           <ul
//             className={`${styles.navigation} text-4xl text-md uppercase  mt-1 tracking-[-0.05em]`}>
//             <Link to="/#">
//               <li className=" hover:text-pink active:brightness-75 hover:skew-x-3">Become a partner</li>
//             </Link>
//             <Link to="/#">
//               <li className=" hover:text-pink active:brightness-75 hover:skew-x-3">Join our team</li>
//             </Link>
//             <Link to="/#">
//               <li className=" hover:text-pink active:brightness-75 hover:skew-x-3">Contribute</li>
//             </Link>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };
