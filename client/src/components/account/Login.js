import React, { useContext, useState } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import image from "../../assets/snamelogo.jpeg";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;
const Image = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});
const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const LoginButton = styled(Button)`
  // text-transform: none;
  // background: #fb641b;
  // color: #fff;
  // height: 40px;
  // border-radius: 2px;
  background-color: #9c27b0;
  border: 0;
  border-radius: 50px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: system-ui, -apple-system, system-ui, "Segoe UI", Roboto, Ubuntu,
    "Helvetica Neue", sans-serif;
  font-size: 18px;
  font-weight: 600;
  outline: 0;
  padding: 5px 10px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    box-shadow: rgba(255, 255, 255, 0.2) 0 3px 15px inset,
      rgba(0, 0, 0, 0.1) 0 3px 5px, rgba(0, 0, 0, 0.1) 0 10px 13px;
    transform: scale(1.05);
  }
  &:before {
    background-color: initial;
    background-image: linear-gradient(#fff 0, rgba(255, 255, 255, 0) 100%);
    border-radius: 120px;
    content: "";
    height: 40%;
    left: 4%;
    opacity: 0.5;
    position: absolute;
    top: 0;
    transition: all 0.3s;
    width: 90%;
  }
`;
const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874fe;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;
const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;
const Text = styled(Typography)`
  color: #878787;
`;

const loginIntialValue = {
  username: "",
  password: "",
};
const signUpIntialValue = {
  name: "",
  username: "",
  password: "",
};
const Login = ({ setisAuthenticated }) => {
  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signUpIntialValue);
  const [error, setError] = useState("");
  const [login, setLogin] = useState(loginIntialValue);
  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();
  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };
  const onChangeInput = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
    console.log(signup.password);
  };
  const SignupUser = async () => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      setError("");
      setSignup(signUpIntialValue);
      toggleSignup("login");
    } else {
      setError("Something went wrong! please try again later");
    }
  };
  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const loginUser = async () => {
    let response = await API.userLogin(login);
    if (response.isSuccess) {
      setError("");
      toggleAccount("login");
      setLogin(loginIntialValue);
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setAccount({
        username: response.data.username,
        name: response.data.name,
      });
      setisAuthenticated(true);
      navigate("/");
    } else {
      setError("Invalid Credentials");
    }
  };
  return (
    <Component>
      <Box>
        <Image src={image} alt="logo" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              value={login.username}
              name="username"
              onChange={(e) => onValueChange(e)}
              label="Enter Username"
            />
            <TextField
              variant="standard"
              value={login.password}
              name="password"
              onChange={(e) => onValueChange(e)}
              label="Enter Password"
            />
            <LoginButton variant="contained" onClick={() => loginUser()}>
              Login
            </LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton onClick={() => toggleSignup()}>
              Created an Account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              onChange={(e) => onChangeInput(e)}
              name="name"
              label="Enter Name"
            />
            <TextField
              variant="standard"
              onChange={(e) => onChangeInput(e)}
              name="username"
              label="Enter Username"
            />
            <TextField
              variant="standard"
              onChange={(e) => onChangeInput(e)}
              name="password"
              label="Enter Password"
            />
            {error && <Error>{error}</Error>}
            <SignupButton onClick={() => SignupUser()}>SignUp</SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton variant="contained" onClick={() => toggleSignup()}>
              Already have an Account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
