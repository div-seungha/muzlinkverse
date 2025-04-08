import { Link, useLocation } from "@remix-run/react";
import { headerContainer, headerContentWrapper } from "~/styles/layout.css";
import Logo from "~/svgs/Logo";

const Header = () => {
  const location = useLocation();
  if (location.pathname === "/sunrise") {
    return <></>;
  }

  if (location.pathname === "/") {
    return (
      <header>
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>
      </header>
    );
  }
  return (
    <header className={headerContainer}>
      <div className={headerContentWrapper}>
        <Link to="/">
          <Logo />
        </Link>
      </div>
    </header>
  );
};

export default Header;
