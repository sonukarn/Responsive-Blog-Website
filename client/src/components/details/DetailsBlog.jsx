import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, styled } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../service/api";
import { MdRebaseEdit } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { DataContext } from "../../context/DataProvider";
import Comments from "./comments/Comments";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
  borderRadius: "10px",
  margin: "10px 0",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
});
const Heading = styled(Typography)`
  font-size: 40px;
  font-weight: bold;
  margin: 30px 0 10px 0;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #333;
  transition: color 0.3s ease-in-out;
  word-break: break-word;
`;

const EditBtns = styled(Box)`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
  transition: color 0.3s ease-in-out;
  &:last-child {
    margin-right: 0;
  }
`;

const EdtBtn = styled(MdRebaseEdit)`
  cursor: pointer;
  border: 1px solid gray;
  border-radius: 8px;
  padding: 2px;
  &:hover {
    background-color: gray;
    color: white;
  }
`;

const DelBtn = styled(MdDeleteSweep)`
  cursor: pointer;
  border: 1px solid gray;
  border-radius: 8px;
  padding: 2px;
  &:hover {
    background-color: gray;
    color: white;
  }
`;
const Author = styled(Box)`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  transition: color 0.3s ease-in-out;
`;
const Description = styled(Typography)`
  word-break: break-word;
`;
const DetailsBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({});
  const { account } = useContext(DataContext);
  const url = post.picture
    ? post.picture
    : "https://images.pexels.com/photos/1181269/pexels-photo-1181269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.getPostById(id);
        if (res.isSuccess) {
          setPost(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const deleteBlog = async () => {
    let response = await API.deletePost(post._id);
    if (response.isSuccess) {
      navigate("/");
    }
  };
  return (
    <Container>
      <Image src={url} alt="BlogPost" />
      <EditBtns>
        {account && account.username === post.username && (
          <>
            <Link to={`/update/${post._id}`}>
              <EdtBtn size="28" color="#3f51b5" />
            </Link>
            <DelBtn size="28" color="#f44336" onClick={() => deleteBlog()} />
          </>
        )}
      </EditBtns>
      <Heading variant="h4">{post.title}</Heading>
      <Author>
        <Typography variant="caption">
          Author:
          <Box component={"span"} style={{ fontWeight: 600 }}>
            {post.username}
          </Box>
        </Typography>
        <Typography variant="caption" style={{ marginLeft: "auto" }}>
          Created At: {new Date(post.createdDate).toDateString()}
        </Typography>
      </Author>
      <Description variant="body1">{post.description}</Description>
      <Comments post={post} />
    </Container>
  );
};

export default DetailsBlog;
