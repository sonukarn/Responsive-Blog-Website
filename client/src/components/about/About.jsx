import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Avatar,
  useTheme,
  styled,
} from "@mui/material";
// Custom styling for the background image
const CustomAvtar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  margin: theme.spacing(2, "auto"),
}));
const BackgroundImage = styled(Box)(({ theme }) => ({
  backgroundImage: `url('https://source.unsplash.com/random')`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: theme.spacing(8, 0),
  // color: "#fff",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  minHeight: "400px",
  width: "100%",
}));
const About = () => {
  const theme = useTheme();
  return (
    <BackgroundImage>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          About Us
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
          We are passionate about delivering the best solutions for your
          business. Our team is dedicated to crafting high-quality digital
          experiences that leave a lasting impression.
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CustomAvtar src="https://via.placeholder.com/150" alt="Avatar" />
              <Typography variant="h5" sx={{ mt: 2 }}>
                Sonu Kumar
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                Frontend Developer
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                posuere, mauris nec ultricies commodo, mauris ipsum fermentum
                ex, vitae bibendum neque velit vitae velit.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CustomAvtar src="https://via.placeholder.com/150" alt="Avatar" />
              <Typography variant="h5" sx={{ mt: 2 }}>
                Rahul Shah
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                Frontend Developer
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                posuere, mauris nec ultricies commodo, mauris ipsum fermentum
                ex, vitae bibendum neque velit vitae velit.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CustomAvtar src="https://via.placeholder.com/150" alt="Avatar" />
              <Typography variant="h5" sx={{ mt: 2 }}>
                Rahul Shah
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                Frontend Developer
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                posuere, mauris nec ultricies commodo, mauris ipsum fermentum
                ex, vitae bibendum neque velit vitae velit.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </BackgroundImage>
  );
};

export default About;
