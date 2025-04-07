import { useLocation } from "@remix-run/react";
import Logo from "~/svgs/Logo";

const Header = () => {
  const location = useLocation();
  console.log(location.pathname);
  if (location.pathname === "/sunrise") {
    return <></>;
  }
  return (
    <header>
      <div>
        <Logo />
      </div>
    </header>
  );
};

export default Header;
