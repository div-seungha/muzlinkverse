import { Link, useLocation } from "@remix-run/react";
import Logo from "~/svgs/Logo";

const Header = () => {
  const location = useLocation();
  if (location.pathname === "/sunrise") {
    return <></>;
  }
  return (
    <header>
      <div>
        <Link to="/" viewTransition>
          <Logo />
        </Link>
      </div>
    </header>
  );
};

export default Header;
