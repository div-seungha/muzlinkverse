import { Link } from "@remix-run/react";
import { LuSearch } from "react-icons/lu";
import { BiMessageRoundedError } from "react-icons/bi";
import { PiBrowsers } from "react-icons/pi";
import { BsPersonVideo3 } from "react-icons/bs";
import {
  nav,
  navContainer,
  navItem,
  navItemWrapper,
  navMobileContainer,
  navMobileItem,
  navMobileItemWrapper,
  speedDialButton,
} from "~/styles/layout.css";
import { vars } from "~/styles/theme.css";
import Logo from "~/svgs/Logo";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";

const Nav = () => {
  return (
    <>
      <div className={navContainer}>
        <nav className={nav}>
          <ul className={navItemWrapper}>
            <li>
              <Link className={navItem} to="/search">
                <LuSearch fontSize={24} color={vars.color.grey2} />
              </Link>
            </li>
            <li>
              <Link className={navItem} to="/info-mismatch">
                <BiMessageRoundedError fontSize={24} color={vars.color.grey2} />
              </Link>
            </li>
            <li>
              <Link className={navItem} to="/">
                <PiBrowsers fontSize={24} color={vars.color.grey2} />
              </Link>
            </li>
            {/*<li>
              <Link className={navItem} to="/hello">
                <BsPersonVideo3 fontSize={24} color={vars.color.grey2} />
              </Link>}
            </li>*/}
          </ul>
        </nav>
        <div
          style={{
            transform: "rotate(90deg)",
            position: "fixed",
            top: 60,
            left: 4,
            display: "inline-block",
          }}
        >
          <Logo />
        </div>
      </div>
      <div className={navMobileContainer}>
        <nav>
          <ul className={navMobileItemWrapper}>
            <li>
              <Link className={navMobileItem} to="/search">
                <LuSearch fontSize={18} color={vars.color.grey2} />
              </Link>
            </li>
            <li>
              <Link className={navMobileItem} to="/info-mismatch">
                <BiMessageRoundedError fontSize={18} color={vars.color.grey2} />
              </Link>
            </li>
            <li>
              <Link className={navMobileItem} to="/">
                <PiBrowsers fontSize={18} color={vars.color.grey2} />
              </Link>
            </li>
            {/*<li>
              <Link className={navMobileItem} to="/hello">
                <BsPersonVideo3 fontSize={18} color={vars.color.grey2} />
              </Link>
            </li>*/}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Nav;
