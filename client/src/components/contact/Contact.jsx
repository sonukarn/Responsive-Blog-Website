import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { API } from "../../service/api";
const Contact = () => {
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const handlechange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.sendEmail(FormData);
      if (res.isSuccess) {
        setResponseMessage("Thank you for your message!");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      setResponseMessage("Failed to send message");
    }
  };
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: 400,
        margin: "0 auto",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 5,
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
      }}
      onSubmit={handleSubmit}
    >
      <Typography>Contact Us</Typography>
      <TextField
        label="Name"
        name="name"
        value={FormData.name}
        onChange={handlechange}
        margin="normal"
        required
      />
      <TextField
        label="Email"
        name="email"
        value={FormData.email}
        type="email"
        onChange={handlechange}
        margin="normal"
        required
      />
      <TextField
        label="Message"
        name="message"
        value={FormData.message}
        multiline
        onChange={handlechange}
        margin="normal"
        required
      />
      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        Send Message
      </Button>
      {responseMessage && (
        <Typography sx={{ mt: 2 }}>{responseMessage}</Typography>
      )}
    </Box>
  );
};

export default Contact;
