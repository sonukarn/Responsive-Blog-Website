import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Avatar,
  useTheme,
  styled,
  Button,
  IconButton,
} from "@mui/material";
import aboutImg from "../../assets/about.jpg";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const About = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: "20px", minHeight: "100vh" }}>
      <Grid container spacing={2} alignItems="center" justifyContent={"center"}>
        {/* Image section */}
        <Grid item xs={12} md={6}>
          <Box
            component={"img"}
            src={aboutImg}
            alt="About Us"
            sx={{
              width: "100%",
              height: "400px",
              borderRadius: "8px",
              objectFit: "cover",
              color: "gray",
            }}
          />
        </Grid>
        {/* Text section */}
        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            About Us
          </Typography>
          <Typography variant="body1" paragraph gutterBottom>
            We are passionate about delivering the best solutions for your
            business. Our team is dedicated to crafting high-quality digital
            experiences that leave a lasting impression.
          </Typography>
          {/* Contact button */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            Contact Us
          </Button>
          {/* Social Media links */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton
              href="https://facebook.com"
              target="_blank"
              color="primary"
            >
              <FaFacebook />
            </IconButton>
            <IconButton
              href="https://instagram.com"
              target="_blank"
              color="primary"
            >
              <FaSquareInstagram />
            </IconButton>
            <IconButton
              href="https://linkedin.com"
              target="_blank"
              color="primary"
            >
              <FaLinkedin />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
