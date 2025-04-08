import { styled, Tooltip, TooltipProps, tooltipClasses } from "@mui/material";
import { Link } from "@remix-run/react";
import { FaLink, FaExternalLinkAlt } from "react-icons/fa";
import { footerContainer, footerText } from "~/styles/layout.css";

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

const TrackFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={footerContainer}>
      <div>
        <Link to="/search">
          {/* <Tooltip
            title="새로운 음원 링크 생성하기"
            placement="top"
            style={{ zIndex: 100000 }}
          > */}
          <div style={{ margin: "20px 0" }}>
            <FaExternalLinkAlt color="#000" fontSize={16} />
          </div>
          {/* </Tooltip> */}
        </Link>
      </div>
      <span className={footerText}>
        &copy; {year} Published by{" "}
        <a className="footer-link" href="https://beonanotherplanet.com">
          {" "}
          beonanotherplanet
        </a>
        . All rights reserved
      </span>
    </footer>
  );
};

export default TrackFooter;
