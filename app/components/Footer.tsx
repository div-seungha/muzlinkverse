const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
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
