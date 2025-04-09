import { Link, useLocation } from "@remix-run/react";
import { headerContainer, headerContentWrapper } from "~/styles/layout.css";
import { vars } from "~/styles/theme.css";
import Logo from "~/svgs/Logo";

const Header = () => {
  const location = useLocation();
  if (location.pathname === "/sunrise") {
    return <></>;
  }

  if (location.pathname === "/") {
    return (
      <header style={{ background: vars.color.background }}>
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
      <Link to="/">
        <Logo />
      </Link>
    </header>
  );
};

export default Header;
