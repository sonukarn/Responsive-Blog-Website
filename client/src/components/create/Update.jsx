import {
  Box,
  Button,
  FormControl,
  InputBase,
  styled,
  TextareaAutosize,
} from "@mui/material";
import { FaFileCirclePlus } from "react-icons/fa6";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";

const Container = styled(Box)`
  margin: 80px 100px;
`;
const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
  backgroundRepeat: "no-repeat",
  borderRadius: "10px",
  transition: "0.3s",
  "&:hover": {
    transform: "scale(1.1)",
  },
  cursor: "pointer",
});
const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;
const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;
const TextArea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  font-size: 18px;
  border: none;
  &:focus-visible {
    outline: none;
  }
`;
const initialPostDetails = {
  title: "",
  description: "",
  picture: "",
  category: "",
  username: "",
  createdDate: new Date(),
};

const Update = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState(initialPostDetails);
  const [file, setFile] = useState("");
  const { account } = useContext(DataContext);
  const { id } = useParams();
  const url = post.picture
    ? post.picture
    : "https://images.pexels.com/photos/1181269/pexels-photo-1181269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  useEffect(() => {
    const fetchData = async () => {
      const response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        // api call for image upload
        const response = await API.uploadFile(data);
        post.picture = response.data;
      }
    };
    getImage();
    post.username = account.username;
    post.category = location.search?.split("=")[1] || "All";
  }, [file]);
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const updateBlogPost = async () => {
    await API.updatePost(post);
    navigate(`/details/${id}`);

    // setPost(initialPostDetails)
  };
  return (
    <Container>
      <Image src={url} alt="images" />
      <StyledFormControl>
        <label htmlFor="fileinput">
          <FaFileCirclePlus size={35} color="gray" />
        </label>
        <input
          type="file"
          id="fileinput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <InputTextField
          placeholder="Title"
          onChange={(e) => handleChange(e)}
          name="title"
          value={post.title}
        />
        <Button variant="contained" onClick={() => updateBlogPost()}>
          Update
        </Button>
      </StyledFormControl>
      <TextArea
        minRows={5}
        placeholder="Write Your Blog here..."
        onChange={(e) => handleChange(e)}
        name="description"
        value={post.description}
      />
    </Container>
  );
};

export default Update;
