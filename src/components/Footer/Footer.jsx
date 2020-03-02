import React from "react";
import PropTypes from "prop-types";

import { Container, Row, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>

          <div className="copyright">
            © {new Date().getFullYear()} Powered by{" "}
            <a href="#">Brazil Code</a>{" "}
          </div>
        </Container>
      </footer>
    );
  }
}

export default Footer;