import { AppBar, styled, Toolbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Component = styled(AppBar)`
  background: #393437;
  color: #fff;
`;
const Container = styled(Toolbar)`
  justify-content: center;
  & > a {
    padding: 20px;
    text-decoration: none;
    color: #fff;
  }
`;
const Header = () => {
  return (
    <Component>
      <Container>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Logout</Link>
      </Container>
    </Component>
  );
};

export default Header;
