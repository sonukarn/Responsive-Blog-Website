import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { API } from "../../service/api";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, "Name should not contain special characters")
    .min(3, "Name must be at least 3 characters long")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  message: Yup.string().required("Message is required"),
});

const Contact = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      // e.preventDefault();
      try {
        const res = await API.sendEmail(values);
        if (res.isSuccess) {
          setResponseMessage("Thank you for your message!");
          setResponseMessage("");
        }
      } catch (error) {
        setResponseMessage("Failed to send message");
      }
      resetForm();
    },
  });

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          backgroundColor: "#f7f7f7",
          borderRadius: 5,
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Typography
          variant="h4"
          style={{ color: "#424242", fontWeight: "bold" }}
          component="h1"
          gutterBottom
        >
          Contact Us
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            variant="standard"
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="standard"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.email)}
            helperText={formik.touched.name && formik.errors.email}
          />

          <TextField
            fullWidth
            id="message"
            name="message"
            label="Message"
            multiline
            role={4}
            variant="standard"
            margin="normal"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.message)}
            helperText={formik.touched.name && formik.errors.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Send Message
          </Button>
        </form>
        {responseMessage && (
          <Typography sx={{ mt: 2 }}>{responseMessage}</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Contact;

// const handleSubmit = async (e) => {
//
// };

{
  /* <Box
component="form"
sx={{
  display: "flex",
  flexDirection: "column",
  gap: 2,
  width: "100%",
  maxWidth: 400,
  margin: "0 auto",
  padding: 15,
  backgroundColor: "#f7f7f7",
  borderRadius: 5,
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.4)",

  "@media screen and (max-width: 600px)": {
    width: "100%",
    padding: 10,
  },
}}
onSubmit={handleSubmit}
>
<ContactText variant="h1">Contact Us</ContactText>
<Typography style={{ textAlign: "center", fontSize: "18px" }}>
  Feel Free to Contact Us
</Typography>
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

</Box> */
}
