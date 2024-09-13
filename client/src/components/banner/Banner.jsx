import { Box, styled, Typography } from "@mui/material";
import React from "react";
const Image = styled(Box)`
  background: url(https://images.pexels.com/photos/5068301/pexels-photo-5068301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)
    center/55% repeat-x #000;
  height: 50vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  transition: background-position 0.5s ease;
  &:hover {
    background-position: 100% 55%;
  }
  cursor: pointer;
  flex-direction: column;
  &:hover > * {
    opacity: 0.7;
  }
  @media (max-width: 600px) {
    height: 30vh;
  }
  @media (max-width: 400px) {
    height: 20vh;
  }
  @media (max-width: 300px) {
    height: 15vh;
  }
`;

const Banner = () => {
  return (
    <Image>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        style={{ color: "white" }}
      >
        Welcome to our Blog!
      </Typography>
      <Typography
        variant="body1"
        component="p"
        align="center"
        style={{ color: "white" }}
      >
        Explore our collection of beautiful landscapes and stunning wildlife.
      </Typography>
    </Image>
  );
};

export default Banner;
