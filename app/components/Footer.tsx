import { styled, Tooltip, TooltipProps, tooltipClasses } from "@mui/material";
import { Link } from "@remix-run/react";
import { FaLink, FaExternalLinkAlt } from "react-icons/fa";

// const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
//   <Tooltip {...props} arrow classes={{ popper: className }} />
// ))(({ theme }) => ({
//   [`& .${tooltipClasses.arrow}`]: {
//     color: theme.palette.common.black,
//   },
//   [`& .${tooltipClasses.tooltip}`]: {
//     backgroundColor: theme.palette.common.black,
//   },
// }));

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="container-footer">
      <div style={{ display: "inline", position: "relative" }}>
        <Link to="/search">
          <Tooltip
            title="새로운 음원 링크 생성하기"
            placement="top"
            style={{ zIndex: 100000 }}
          >
            <div className="footer-search-link text-center">
              <FaExternalLinkAlt fontSize={20} />
            </div>
          </Tooltip>
        </Link>
      </div>
      &copy; {year} Published by{" "}
      <a className="footer-link" href="https://beonanotherplanet.com">
        {" "}
        beonanotherplanet
      </a>
      . All rights reserved
    </footer>
  );
};

export default Footer;
